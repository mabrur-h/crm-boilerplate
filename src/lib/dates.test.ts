import { describe, expect, it } from "vitest";
import { formatUzDate, isDueOrOverdue, todayInTashkent } from "@/lib/dates";

describe("todayInTashkent", () => {
  it("rolls over to the next day before UTC midnight (Tashkent is UTC+5)", () => {
    // 20:30 UTC on the 11th is already 01:30 on the 12th in Tashkent.
    const result = todayInTashkent(new Date("2026-09-11T20:30:00Z"));
    expect(result).toBe("2026-09-12");
  });

  it("stays on the same day well before the boundary", () => {
    const result = todayInTashkent(new Date("2026-09-11T04:00:00Z"));
    expect(result).toBe("2026-09-11");
  });
});

describe("formatUzDate", () => {
  it("formats a calendar date as Uzbek prose", () => {
    expect(formatUzDate("2026-09-12")).toBe("12-sentabr, 2026");
  });

  it("formats every month name correctly", () => {
    expect(formatUzDate("2026-01-01")).toBe("1-yanvar, 2026");
    expect(formatUzDate("2026-12-31")).toBe("31-dekabr, 2026");
  });
});

describe("isDueOrOverdue", () => {
  it("is true when the date is before today", () => {
    expect(isDueOrOverdue("2026-09-10", "2026-09-11")).toBe(true);
  });

  it("is true when the date is today", () => {
    expect(isDueOrOverdue("2026-09-11", "2026-09-11")).toBe(true);
  });

  it("is false when the date is in the future", () => {
    expect(isDueOrOverdue("2026-09-12", "2026-09-11")).toBe(false);
  });
});
