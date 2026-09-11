// Maps Better Auth 1.7.4 error codes to Uzbek copy. Codes were verified
// against the installed package, not guessed:
// - "INVALID_EMAIL_OR_PASSWORD": node_modules/better-auth/dist/api/routes/sign-in.mjs
//   (thrown via `BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD`, whose `.code`
//   resolves to this literal key — see @better-auth/core/dist/utils/error-codes.mjs)
// - "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": node_modules/better-auth/dist/api/routes/sign-up.mjs
//   (thrown when a signup email is already taken)
// - "EMAIL_PASSWORD_SIGN_UP_DISABLED": node_modules/better-auth/dist/api/routes/sign-up.mjs
//   (thrown when `emailAndPassword.disableSignUp` is true)
// All three were also reproduced against the running dev server (see
// task-2-report.md) to confirm the client actually receives them.
const FALLBACK_MESSAGE = "Xatolik yuz berdi. Qaytadan urinib ko‘ring.";

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Email yoki parol noto‘g‘ri",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "Bu email bilan hisob allaqachon mavjud",
  EMAIL_PASSWORD_SIGN_UP_DISABLED:
    "Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning.",
};

export function authErrorMessage(code: string | undefined): string {
  if (!code) {
    return FALLBACK_MESSAGE;
  }

  return ERROR_MESSAGES[code] ?? FALLBACK_MESSAGE;
}
