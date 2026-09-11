// Pure merge logic for `.dev.vars`: create it from `.dev.vars.example` when
// missing, fill an empty BETTER_AUTH_SECRET, and never touch anything else.
// File I/O stays in the entry script (`setup.mjs`) so this stays unit-testable.

export const BETTER_AUTH_SECRET_KEY = "BETTER_AUTH_SECRET";

function parseAssignment(line) {
  const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
  if (!match) return null;
  return { key: match[1], value: match[2] };
}

/**
 * @param {object} params
 * @param {string} params.exampleContent Contents of `.dev.vars.example`.
 * @param {string|undefined} params.existingContent Contents of `.dev.vars` if it already exists, otherwise undefined.
 * @param {() => string} params.generateSecret Called only when a new secret value is needed.
 * @returns {{ content: string, changed: boolean, created: boolean }}
 */
export function mergeDevVars({ exampleContent, existingContent, generateSecret }) {
  const created = existingContent === undefined || existingContent === null;
  const baseContent = created ? exampleContent : existingContent;

  const endsWithNewline = /\r?\n$/.test(baseContent);
  const lines = baseContent.split(/\r?\n/);
  // split() on a trailing newline leaves one empty trailing element; drop it
  // so we don't duplicate blank lines when we join back up.
  if (endsWithNewline && lines[lines.length - 1] === "") {
    lines.pop();
  }

  let changed = created;
  let sawSecretKey = false;

  const resultLines = lines.map((line) => {
    const assignment = parseAssignment(line);
    if (!assignment) return line;
    if (assignment.key === BETTER_AUTH_SECRET_KEY) {
      sawSecretKey = true;
      if (assignment.value.trim() === "") {
        changed = true;
        return `${BETTER_AUTH_SECRET_KEY}=${generateSecret()}`;
      }
    }
    return line;
  });

  if (!sawSecretKey) {
    resultLines.push(`${BETTER_AUTH_SECRET_KEY}=${generateSecret()}`);
    changed = true;
  }

  const content = resultLines.join("\n") + (endsWithNewline ? "\n" : "");

  return { content, changed, created };
}
