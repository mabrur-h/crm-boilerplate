import { describe, expect, it } from "vitest";
import { buildFollowUpPrompt } from "@/features/clients/ai-prompt";
import type { Client } from "@/features/clients/queries";

function makeClient(overrides: Partial<Client> = {}): Client {
  return {
    id: "client-1",
    name: "Aziz Karimov",
    phone: "+998 90 000 00 01",
    company: "ABC Tech",
    note: "Birinchi uchrashuv o‘tkazildi",
    stage: "new",
    nextContactDate: "2026-09-12",
    createdBy: "user-1",
    createdAt: new Date("2026-09-01T00:00:00Z"),
    updatedAt: new Date("2026-09-01T00:00:00Z"),
    ...overrides,
  };
}

describe("buildFollowUpPrompt", () => {
  it("includes every non-null field with its label", () => {
    const { prompt } = buildFollowUpPrompt(makeClient());

    expect(prompt).toContain("Ism: Aziz Karimov");
    expect(prompt).toContain("Kompaniya: ABC Tech");
    expect(prompt).toContain("Bosqich: Yangi");
    expect(prompt).toContain("Izoh: Birinchi uchrashuv o‘tkazildi");
    expect(prompt).toContain("Keyingi aloqa sanasi: 12-sentabr, 2026");
  });

  it("uses the Uzbek stage label, not the raw stage value", () => {
    const { prompt } = buildFollowUpPrompt(makeClient({ stage: "won" }));
    expect(prompt).toContain("Bosqich: Mijoz");
    expect(prompt).not.toContain("Bosqich: won");
  });

  it("omits null fields entirely", () => {
    const { prompt } = buildFollowUpPrompt(
      makeClient({ company: null, note: null, nextContactDate: null }),
    );

    expect(prompt).not.toContain("Kompaniya:");
    expect(prompt).not.toContain("Izoh:");
    expect(prompt).not.toContain("Keyingi aloqa sanasi:");
    expect(prompt).toContain("Ism: Aziz Karimov");
  });

  it("always includes name and stage even when everything else is null", () => {
    const { prompt } = buildFollowUpPrompt(
      makeClient({
        company: null,
        note: null,
        nextContactDate: null,
        stage: "lost",
      }),
    );

    expect(prompt).toContain("Ism: Aziz Karimov");
    expect(prompt).toContain("Bosqich: Yo‘qotildi");
  });

  it("system prompt requires Uzbek Latin only and forbids placeholders", () => {
    const { system } = buildFollowUpPrompt(makeClient());

    expect(system).toContain("FAQAT o‘zbek tilida, lotin alifbosida");
    expect(system).toContain("[Ism]");
  });
});
