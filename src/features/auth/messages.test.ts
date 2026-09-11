import { describe, expect, it } from "vitest";
import { authErrorMessage } from "@/features/auth/messages";

describe("authErrorMessage", () => {
  it("maps INVALID_EMAIL_OR_PASSWORD", () => {
    expect(authErrorMessage("INVALID_EMAIL_OR_PASSWORD")).toBe(
      "Email yoki parol noto‘g‘ri",
    );
  });

  it("maps USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL", () => {
    expect(authErrorMessage("USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL")).toBe(
      "Bu email bilan hisob allaqachon mavjud",
    );
  });

  it("maps EMAIL_PASSWORD_SIGN_UP_DISABLED", () => {
    expect(authErrorMessage("EMAIL_PASSWORD_SIGN_UP_DISABLED")).toBe(
      "Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning.",
    );
  });

  it("falls back for an unknown code", () => {
    expect(authErrorMessage("SOME_UNKNOWN_CODE")).toBe(
      "Xatolik yuz berdi. Qaytadan urinib ko‘ring.",
    );
  });

  it("falls back for undefined", () => {
    expect(authErrorMessage(undefined)).toBe(
      "Xatolik yuz berdi. Qaytadan urinib ko‘ring.",
    );
  });
});
