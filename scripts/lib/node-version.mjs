// Pure parsing/decision logic for the Node.js version check shared by
// `setup.mjs` and `doctor.mjs`.

const NODE_DOWNLOAD_HINT = "https://nodejs.org saytidan Node.js 24 (LTS) versiyasini o‘rnating.";

/** @param {string} versionString e.g. "v22.23.1" or "22.23.1" */
export function parseNodeVersion(versionString) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(versionString).trim());
  if (!match) {
    throw new Error(`Node.js versiyasini aniqlab bo‘lmadi: "${versionString}"`);
  }
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

/**
 * @param {string} versionString `process.version`-shaped string.
 * @returns {{ level: "ok"|"warn"|"fail", message: string, hint?: string }}
 */
export function checkNodeVersion(versionString) {
  const { major } = parseNodeVersion(versionString);

  if (major < 22) {
    return {
      level: "fail",
      message: `Node.js versiyasi juda eski (${versionString}) — kamida 22 kerak.`,
      hint: NODE_DOWNLOAD_HINT,
    };
  }

  if (major !== 24) {
    return {
      level: "warn",
      message: `Node.js ${versionString} ishlatilmoqda — tavsiya etilgan versiya 24 (LTS).`,
      hint: NODE_DOWNLOAD_HINT,
    };
  }

  return {
    level: "ok",
    message: `Node.js versiyasi mos (${versionString}).`,
  };
}
