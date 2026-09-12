// Thin wrapper around the `AI` (Workers AI) binding for free-text
// generation. Kept separate from `src/features/clients/ai-actions.ts` so
// any future feature can reuse `generateText` without duplicating the
// binding call or its response-shape normalization.
import { getEnv } from "@/lib/cloudflare";

// Models tried for the Uzbek follow-up draft, compared on Uzbek output
// quality and Workers AI neuron cost per request:
//   - "@cf/openai/gpt-oss-120b"              — good Uzbek, but leaked an
//     "[Ismingiz]" placeholder and cost ~28 neurons/request.
//   - "@cf/openai/gpt-oss-20b"                — clean Uzbek, no
//     placeholders, cheapest (~16 neurons/request) and fastest. CHOSEN.
//   - "@cf/meta/llama-3.3-70b-instruct-fp8-fast" — clean Uzbek but one
//     awkward sentence, and the most expensive (~39 neurons/request).
// To switch models, change the constant below — `generateText`'s
// normalization already handles the OpenAI-style `choices[0].message`
// shape returned by every text-generation model on Workers AI.
export const AI_MODEL = "@cf/openai/gpt-oss-20b";

export class AiUnavailableError extends Error {
  constructor(message = "AI binding unavailable") {
    super(message);
    this.name = "AiUnavailableError";
  }
}

type GenerateTextInput = {
  system: string;
  prompt: string;
  maxTokens?: number;
};

/**
 * Runs the configured text-generation model and returns the plain-text
 * response. Throws `AiUnavailableError` when the binding call fails or
 * returns no usable text (e.g. a reasoning model that used its whole token
 * budget on internal reasoning and produced no final answer).
 */
export async function generateText({
  system,
  prompt,
  maxTokens = 400,
}: GenerateTextInput): Promise<string> {
  let result: unknown;
  try {
    result = await getEnv().AI.run(AI_MODEL, {
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      max_tokens: maxTokens,
    });
  } catch (error) {
    throw new AiUnavailableError(
      error instanceof Error ? error.message : "AI request failed",
    );
  }

  const text = extractText(result);
  if (!text) {
    throw new AiUnavailableError("AI returned no text");
  }
  return text;
}

// Normalizes the handful of response shapes Workers AI text-generation
// models return: the OpenAI-compatible chat-completion shape
// (`choices[0].message.content`, used by `@cf/openai/*` and
// `@cf/meta/llama-3.3-*`) and the older flat `{ response }` shape some
// models still return alongside it.
function extractText(result: unknown): string {
  if (result && typeof result === "object") {
    const record = result as Record<string, unknown>;

    const choices = record.choices;
    if (Array.isArray(choices) && choices.length > 0) {
      const message = (choices[0] as Record<string, unknown>)?.message as
        | Record<string, unknown>
        | undefined;
      const content = message?.content;
      if (typeof content === "string" && content.trim()) {
        return content.trim();
      }
    }

    const response = record.response;
    if (typeof response === "string" && response.trim()) {
      return response.trim();
    }
  }
  return "";
}
