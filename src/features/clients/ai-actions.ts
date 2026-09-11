// Server action for generating an AI follow-up draft. `requireUser()`
// first, matching every other mutation in this app — see the note in
// `actions.ts`.
"use server";

import { requireUser } from "@/lib/session";
import { generateText } from "@/lib/ai";
import { getClient } from "@/features/clients/queries";
import { buildFollowUpPrompt } from "@/features/clients/ai-prompt";

export type DraftFollowUpResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

const AI_ERROR_MESSAGE = "AI hozir ishlamayapti. Keyinroq urinib ko‘ring.";

export async function draftFollowUpMessage(
  clientId: string,
): Promise<DraftFollowUpResult> {
  await requireUser();

  const client = await getClient(clientId);
  if (!client) {
    return { ok: false, error: AI_ERROR_MESSAGE };
  }

  const { system, prompt } = buildFollowUpPrompt(client);

  try {
    const text = await generateText({ system, prompt });
    return { ok: true, text };
  } catch {
    // `generateText` only throws `AiUnavailableError`, but a generic Uzbek
    // message is returned either way — the user never sees a stack trace.
    return { ok: false, error: AI_ERROR_MESSAGE };
  }
}
