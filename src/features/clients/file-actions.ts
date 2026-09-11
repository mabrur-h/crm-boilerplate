// Server actions for uploading/deleting a client's files. `requireUser()`
// first, matching every other mutation in this app — see the note in
// `actions.ts`.
"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { clientFiles } from "@/lib/db/schema";
import { requireUser } from "@/lib/session";
import { buildObjectKey, deleteObject, putObject, validateUpload } from "@/lib/files";
import { getClientFile } from "@/features/clients/queries";

export type FileActionState = {
  ok: boolean;
  error?: string;
};

const SAVE_FAILED_MESSAGE =
  "Faylni saqlab bo‘lmadi. R2 yoqilganini tekshiring (docs/guides/04-cloudflare.md).";
const GENERIC_FAILED_MESSAGE = "Saqlab bo‘lmadi. Qaytadan urinib ko‘ring.";

export async function uploadClientFile(
  clientId: string,
  _prev: FileActionState,
  formData: FormData,
): Promise<FileActionState> {
  const user = await requireUser();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "Fayl tanlanmagan" };
  }

  const validationError = validateUpload({ size: file.size, type: file.type });
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const fileId = crypto.randomUUID();
  const key = buildObjectKey(clientId, fileId, file.name);

  try {
    await putObject(key, file, { contentType: file.type });
  } catch {
    return { ok: false, error: SAVE_FAILED_MESSAGE };
  }

  try {
    const db = getDb();
    await db.insert(clientFiles).values({
      id: fileId,
      clientId,
      key,
      name: file.name,
      size: file.size,
      contentType: file.type,
      uploadedBy: user.id,
      createdAt: new Date(),
    });
  } catch {
    // Never leave an orphaned R2 object behind when the DB write fails.
    try {
      await deleteObject(key);
    } catch {
      // Best-effort cleanup; the DB failure is what we report either way.
    }
    return { ok: false, error: GENERIC_FAILED_MESSAGE };
  }

  revalidatePath(`/clients/${clientId}`);
  return { ok: true };
}

export async function deleteClientFile(fileId: string): Promise<FileActionState> {
  await requireUser();

  const file = await getClientFile(fileId);
  if (!file) {
    return { ok: false, error: GENERIC_FAILED_MESSAGE };
  }

  try {
    await deleteObject(file.key);
  } catch {
    // If the object is already gone (or R2 is briefly unavailable), still
    // remove the row below — a dangling DB row pointing at nothing is worse
    // than a rare orphaned object.
  }

  const db = getDb();
  await db.delete(clientFiles).where(eq(clientFiles.id, fileId));

  revalidatePath(`/clients/${file.clientId}`);
  return { ok: true };
}
