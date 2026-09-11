import { describe, expect, it } from "vitest";
import { clientFormSchema } from "@/features/clients/schema";

const validInput = {
  name: "Aziz Karimov",
  phone: "+998 90 123 45 67",
  company: "Tech LLC",
  stage: "new",
  note: "Muhim mijoz",
  nextContactDate: "2026-09-20",
};

describe("clientFormSchema", () => {
  it("accepts a fully valid client", () => {
    const result = clientFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts a minimal client with only name and stage", () => {
    const result = clientFormSchema.safeParse({
      name: "Aziz",
      phone: null,
      company: null,
      stage: "new",
      note: null,
      nextContactDate: null,
    });
    expect(result.success).toBe(true);
  });

  it("normalizes empty strings to null for optional fields", () => {
    const result = clientFormSchema.safeParse({
      ...validInput,
      phone: "",
      company: "  ",
      note: "",
      nextContactDate: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeNull();
      expect(result.data.company).toBeNull();
      expect(result.data.note).toBeNull();
      expect(result.data.nextContactDate).toBeNull();
    }
  });

  it("trims the name", () => {
    const result = clientFormSchema.safeParse({ ...validInput, name: "  Aziz  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Aziz");
    }
  });

  it("rejects an empty name", () => {
    const result = clientFormSchema.safeParse({ ...validInput, name: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Mijoz ismini kiriting");
  });

  it("rejects a name longer than 120 characters", () => {
    const result = clientFormSchema.safeParse({
      ...validInput,
      name: "a".repeat(121),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Ism 120 belgidan oshmasin");
  });

  it("rejects a malformed phone number", () => {
    const result = clientFormSchema.safeParse({ ...validInput, phone: "abc" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Telefon raqami noto‘g‘ri");
  });

  it("rejects a phone number shorter than 7 characters", () => {
    const result = clientFormSchema.safeParse({ ...validInput, phone: "12345" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Telefon raqami noto‘g‘ri");
  });

  it("rejects a company name longer than 120 characters", () => {
    const result = clientFormSchema.safeParse({
      ...validInput,
      company: "a".repeat(121),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Kompaniya nomi 120 belgidan oshmasin",
    );
  });

  it("rejects an unknown stage", () => {
    const result = clientFormSchema.safeParse({ ...validInput, stage: "unknown" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Bosqichni tanlang");
  });

  it("rejects a note longer than 2000 characters", () => {
    const result = clientFormSchema.safeParse({
      ...validInput,
      note: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Izoh 2000 belgidan oshmasin");
  });

  it("rejects a malformed nextContactDate", () => {
    const result = clientFormSchema.safeParse({
      ...validInput,
      nextContactDate: "2026/09/20",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Sana noto‘g‘ri");
  });

  it("rejects a nextContactDate that isn't a real calendar day", () => {
    const result = clientFormSchema.safeParse({
      ...validInput,
      nextContactDate: "2026-02-30",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Sana noto‘g‘ri");
  });
});
