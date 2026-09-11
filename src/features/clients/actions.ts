// Server actions for creating, updating, and deleting clients. Every export
// starts with `await requireUser()` — this app has no middleware.ts, so
// actions are the auth guard for mutations.
"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { requireUser } from "@/lib/session";
import { deleteObject } from "@/lib/files";
import { clientFormSchema } from "@/features/clients/schema";
import { listClientFiles } from "@/features/clients/queries";

export type ClientFormValues = {
  name: string;
  phone: string;
  company: string;
  stage: string;
  note: string;
  nextContactDate: string;
};

export type ClientActionState = {
  ok: boolean;
  fieldErrors?: Partial<Record<keyof ClientFormValues, string>>;
  formError?: string;
  values?: ClientFormValues;
};

// Note: no runtime constants live in this file below this point — a
// `"use server"` file may only export async functions (plus types, which
// are erased before runtime). The `useActionState` initial value lives in
// `client-form.tsx` instead.

function readFormValues(formData: FormData): ClientFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    company: String(formData.get("company") ?? ""),
    stage: String(formData.get("stage") ?? "new"),
    note: String(formData.get("note") ?? ""),
    nextContactDate: String(formData.get("nextContactDate") ?? ""),
  };
}

function parseFormData(formData: FormData) {
  return clientFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    stage: formData.get("stage"),
    note: formData.get("note"),
    nextContactDate: formData.get("nextContactDate"),
  });
}

function fieldErrorsFromResult(
  result: ReturnType<typeof clientFormSchema.safeParse>,
): Partial<Record<keyof ClientFormValues, string>> {
  if (result.success) {
    return {};
  }
  const flat = result.error.flatten().fieldErrors;
  const errors: Partial<Record<keyof ClientFormValues, string>> = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (messages && messages.length > 0) {
      errors[key as keyof ClientFormValues] = messages[0];
    }
  }
  return errors;
}

const SAVE_FAILED_MESSAGE = "Saqlab bo‘lmadi. Qaytadan urinib ko‘ring.";

export async function createClient(
  _prev: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const user = await requireUser();

  const values = readFormValues(formData);
  const result = parseFormData(formData);

  if (!result.success) {
    return { ok: false, fieldErrors: fieldErrorsFromResult(result), values };
  }

  const id = crypto.randomUUID();
  const now = new Date();

  try {
    const db = getDb();
    await db.insert(clients).values({
      id,
      name: result.data.name,
      phone: result.data.phone,
      company: result.data.company,
      stage: result.data.stage,
      note: result.data.note,
      nextContactDate: result.data.nextContactDate,
      createdBy: user.id,
      createdAt: now,
      updatedAt: now,
    });
  } catch {
    // Never report success on a DB failure — the user keeps their typed
    // values and sees a generic Uzbek error, no stack trace.
    return { ok: false, formError: SAVE_FAILED_MESSAGE, values };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
  redirect(`/clients/${id}?saved=1`);
}

export async function updateClient(
  id: string,
  _prev: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  await requireUser();

  const values = readFormValues(formData);
  const result = parseFormData(formData);

  if (!result.success) {
    return { ok: false, fieldErrors: fieldErrorsFromResult(result), values };
  }

  try {
    const db = getDb();
    await db
      .update(clients)
      .set({
        name: result.data.name,
        phone: result.data.phone,
        company: result.data.company,
        stage: result.data.stage,
        note: result.data.note,
        nextContactDate: result.data.nextContactDate,
        updatedAt: new Date(),
      })
      .where(eq(clients.id, id));
  } catch {
    return { ok: false, formError: SAVE_FAILED_MESSAGE, values };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
  redirect(`/clients/${id}?saved=1`);
}

export async function deleteClient(id: string): Promise<void> {
  await requireUser();

  // Delete the client's R2 objects before the row itself: the DB's
  // cascading delete removes the `client_files` rows for free, but nothing
  // deletes the R2 objects they point to. Best-effort per file — an object
  // that's already gone (or fails to delete) never blocks the client
  // deletion; it would otherwise leave the client stuck and undeletable.
  const files = await listClientFiles(id);
  for (const file of files) {
    try {
      await deleteObject(file.key);
    } catch {
      // Ignore: an orphaned R2 object is preferable to a client that can
      // never be deleted.
    }
  }

  const db = getDb();
  await db.delete(clients).where(eq(clients.id, id));

  revalidatePath("/clients");
  redirect("/clients?deleted=1");
}
