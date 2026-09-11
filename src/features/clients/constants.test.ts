import { describe, expect, it } from "vitest";
import { ACTIVE_STAGES, CLIENT_STAGES, stageLabel } from "@/features/clients/constants";

describe("CLIENT_STAGES", () => {
  it("has the exact Uzbek labels in order", () => {
    expect(CLIENT_STAGES).toEqual([
      { value: "new", label: "Yangi" },
      { value: "in_progress", label: "Jarayonda" },
      { value: "won", label: "Mijoz" },
      { value: "lost", label: "Yo‘qotildi" },
    ]);
  });
});

describe("stageLabel", () => {
  it("returns the Uzbek label for each known stage", () => {
    expect(stageLabel("new")).toBe("Yangi");
    expect(stageLabel("in_progress")).toBe("Jarayonda");
    expect(stageLabel("won")).toBe("Mijoz");
    expect(stageLabel("lost")).toBe("Yo‘qotildi");
  });
});

describe("ACTIVE_STAGES", () => {
  it("only contains the stages still needing follow-up", () => {
    expect(ACTIVE_STAGES).toEqual(["new", "in_progress"]);
  });
});
