import { describe, expect, it } from "vitest";
import { loginSchema, signupSchema } from "@/features/auth/schema";

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email with the Uzbek message", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("To‘g‘ri email kiriting");
  });

  it("rejects a too-short password with the Uzbek message", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "short",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Parol kamida 8 ta belgidan iborat bo‘lsin",
    );
  });
});

describe("signupSchema", () => {
  const validInput = {
    name: "Aziz",
    email: "aziz@example.com",
    password: "password123",
  };

  it("accepts a valid name, email, and password", () => {
    const result = signupSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects an empty name with the Uzbek message", () => {
    const result = signupSchema.safeParse({ ...validInput, name: "" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Ismingizni kiriting");
  });

  it("rejects an invalid email with the Uzbek message", () => {
    const result = signupSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("To‘g‘ri email kiriting");
  });

  it("rejects a too-short password with the Uzbek message", () => {
    const result = signupSchema.safeParse({ ...validInput, password: "short" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Parol kamida 8 ta belgidan iborat bo‘lsin",
    );
  });
});
