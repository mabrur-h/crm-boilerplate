// Shared Uzbek-language console reporter for the DX scripts (setup, doctor,
// cf-setup, r2-check). One line per check, prefixed with an icon; every
// ⚠️/❌ line is followed by an indented "→ Nima qilish kerak: …" hint line.
// Pure/testable: `createReporter()` only builds an array of strings, it
// never touches process.stdout or process.exitCode itself — the entry
// scripts decide when to print and how to exit.

const ICON = {
  ok: "✅",
  warn: "⚠️",
  fail: "❌",
};

// Lines print immediately (not buffered to the end) so they interleave in
// the right order with any other console output an entry script produces
// in between checks (e.g. cf-setup.mjs's "command that would run" lines).
export function createReporter({ log = console.log } = {}) {
  const lines = [];
  let hasFailure = false;

  function record(icon, message, hint) {
    const line = `${icon} ${message}`;
    lines.push(line);
    log(line);
    if (hint) {
      const hintLine = `   → Nima qilish kerak: ${hint}`;
      lines.push(hintLine);
      log(hintLine);
    }
  }

  return {
    ok(message) {
      record(ICON.ok, message);
    },
    warn(message, hint) {
      record(ICON.warn, message, hint);
    },
    fail(message, hint) {
      hasFailure = true;
      record(ICON.fail, message, hint);
    },
    /** Kept for callers that want an explicit no-op flush point; lines are already printed as recorded. */
    print() {},
    get failed() {
      return hasFailure;
    },
    get lines() {
      return [...lines];
    },
  };
}
