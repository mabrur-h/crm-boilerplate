// Builds the system/prompt pair sent to Workers AI for a client follow-up
// draft. Pure — no I/O, no Cloudflare context — so it's unit tested
// directly in `ai-prompt.test.ts`.
import { formatUzDate } from "@/lib/dates";
import { stageLabel, type ClientStage } from "@/features/clients/constants";
import type { Client } from "@/features/clients/queries";

export type FollowUpPrompt = {
  system: string;
  prompt: string;
};

const SYSTEM_PROMPT =
  "Siz O‘zbekistondagi kichik biznes menejeriga mijozlar bilan muloqotda " +
  "yordam beruvchi yordamchisiz. Vazifangiz — mijozga yuborish uchun qisqa, " +
  "muloyim follow-up (keyingi aloqa) xabarining qoralamasini yozib berish. " +
  "FAQAT o‘zbek tilida, lotin alifbosida yozing. Xabar 3–5 gapdan iborat " +
  "bo‘lsin. Hech qanday fakt, narx yoki va’dani o‘zingizdan qo‘shmang — " +
  "faqat quyida berilgan ma’lumotlardan foydalaning. \"[Ism]\" kabi " +
  "salomlashuv o‘rniga qo‘yiladigan joy egallovchilardan foydalanmang.";

/**
 * Builds the `{ system, prompt }` pair for `generateText`. Only non-null
 * client fields are included in the prompt — the model is told not to
 * invent anything the CRM doesn't actually know.
 */
export function buildFollowUpPrompt(client: Client): FollowUpPrompt {
  const lines: string[] = [`Ism: ${client.name}`];

  if (client.company) {
    lines.push(`Kompaniya: ${client.company}`);
  }

  lines.push(`Bosqich: ${stageLabel(client.stage as ClientStage)}`);

  if (client.note) {
    lines.push(`Izoh: ${client.note}`);
  }

  if (client.nextContactDate) {
    lines.push(`Keyingi aloqa sanasi: ${formatUzDate(client.nextContactDate)}`);
  }

  const prompt = [
    "Mijoz ma’lumotlari:",
    ...lines,
    "",
    "Yuqoridagi ma’lumotlarga asoslanib, ushbu mijozga yuboriladigan qisqa follow-up xabarini yozing.",
  ].join("\n");

  return { system: SYSTEM_PROMPT, prompt };
}
