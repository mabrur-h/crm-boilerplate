// Pure text-based editor for `wrangler.jsonc`. `wrangler.jsonc` has `//`
// comments, so it cannot go through JSON.parse/stringify without losing
// them — this module locates the exact binding entry with brace/bracket
// matching and edits only the minimum span of text needed, byte-for-byte
// preserving everything else (comments, spacing, key order).
//
// Every function here fails loudly (throws) rather than guessing when the
// file doesn't look like what it expects, per the task brief: "must fail
// loudly rather than corrupt the file".

function findMatchingBracket(text, openIndex, openChar, closeChar) {
  let depth = 0;
  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i];
    if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findArraySpan(text, arrayKey) {
  const keyMatch = new RegExp(`"${arrayKey}"\\s*:\\s*\\[`).exec(text);
  if (!keyMatch) {
    throw new Error(
      `wrangler.jsonc ichida "${arrayKey}" massivi topilmadi — fayl kutilmagan shaklda.`,
    );
  }
  const openIndex = keyMatch.index + keyMatch[0].length - 1;
  const closeIndex = findMatchingBracket(text, openIndex, "[", "]");
  if (closeIndex === -1) {
    throw new Error(
      `wrangler.jsonc ichidagi "${arrayKey}" massivi yopilmagan — fayl kutilmagan shaklda.`,
    );
  }
  return { openIndex, closeIndex };
}

function findObjectSpansInRange(text, start, end) {
  const spans = [];
  let i = start;
  while (i < end) {
    if (text[i] === "{") {
      const close = findMatchingBracket(text, i, "{", "}");
      if (close === -1 || close > end) {
        throw new Error(
          "wrangler.jsonc ichida yopilmagan { } topildi — fayl kutilmagan shaklda.",
        );
      }
      spans.push({ start: i, end: close });
      i = close + 1;
    } else {
      i++;
    }
  }
  return spans;
}

function findBindingObjectSpan(text, arrayKey, binding) {
  const { openIndex, closeIndex } = findArraySpan(text, arrayKey);
  const objectSpans = findObjectSpansInRange(text, openIndex + 1, closeIndex);

  const matches = objectSpans.filter((span) => {
    const objectText = text.slice(span.start, span.end + 1);
    const bindingMatch = /"binding"\s*:\s*"([^"]*)"/.exec(objectText);
    return bindingMatch !== null && bindingMatch[1] === binding;
  });

  if (matches.length === 0) {
    throw new Error(
      `wrangler.jsonc ichidagi "${arrayKey}" massivida "${binding}" nomli binding topilmadi.`,
    );
  }
  if (matches.length > 1) {
    throw new Error(
      `wrangler.jsonc ichidagi "${arrayKey}" massivida "${binding}" nomli bir nechta binding topildi — fayl kutilmagan shaklda.`,
    );
  }
  return matches[0];
}

function setStringField(objectText, fieldName, value) {
  const fieldMatch = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]*)"`).exec(objectText);

  if (fieldMatch) {
    return (
      objectText.slice(0, fieldMatch.index) +
      `"${fieldName}": "${value}"` +
      objectText.slice(fieldMatch.index + fieldMatch[0].length)
    );
  }

  const anchorMatch =
    /"database_name"\s*:\s*"[^"]*"\s*,?/.exec(objectText) ??
    /"binding"\s*:\s*"[^"]*"\s*,?/.exec(objectText);
  if (!anchorMatch) {
    throw new Error(
      `wrangler.jsonc ichidagi obyekt kutilmagan shaklda — "${fieldName}" qo‘shib bo‘lmadi.`,
    );
  }

  const insertAt = anchorMatch.index + anchorMatch[0].length;
  const beforeAnchor = objectText.slice(0, anchorMatch.index);
  const lineStart = beforeAnchor.lastIndexOf("\n") + 1;
  const indent = /^[ \t]*/.exec(beforeAnchor.slice(lineStart))[0];
  const hasTrailingComma = anchorMatch[0].trimEnd().endsWith(",");
  const afterInsert = objectText.slice(insertAt);
  const isLastProperty = /^\s*$/.test(afterInsert);

  const insertion =
    (hasTrailingComma ? "" : ",") +
    `\n${indent}"${fieldName}": "${value}"` +
    (isLastProperty ? "" : ",");

  return objectText.slice(0, insertAt) + insertion + objectText.slice(insertAt);
}

/**
 * Inserts or updates `"database_id": "<id>"` inside the `d1_databases` entry
 * with the given binding name (default `"DB"`), preserving every comment
 * and byte of formatting elsewhere in the file. Idempotent: calling it again
 * with the same id returns byte-identical text.
 *
 * @param {string} sourceText Full text of `wrangler.jsonc`.
 * @param {{ binding?: string, databaseId: string }} options
 * @returns {string} The updated file text.
 */
export function setD1DatabaseId(sourceText, { binding = "DB", databaseId } = {}) {
  if (typeof databaseId !== "string" || databaseId.trim() === "") {
    throw new Error("databaseId bo‘sh bo‘lmagan satr bo‘lishi kerak.");
  }

  const objectSpan = findBindingObjectSpan(sourceText, "d1_databases", binding);
  const objectText = sourceText.slice(objectSpan.start, objectSpan.end + 1);
  const newObjectText = setStringField(objectText, "database_id", databaseId);

  return (
    sourceText.slice(0, objectSpan.start) +
    newObjectText +
    sourceText.slice(objectSpan.end + 1)
  );
}

/**
 * Reads the current `database_id` (if any) for the given D1 binding,
 * without modifying anything. Returns `null` if the field isn't set yet.
 * Throws the same way `setD1DatabaseId` does if the shape is unexpected.
 */
export function getD1DatabaseId(sourceText, { binding = "DB" } = {}) {
  const objectSpan = findBindingObjectSpan(sourceText, "d1_databases", binding);
  const objectText = sourceText.slice(objectSpan.start, objectSpan.end + 1);
  const match = /"database_id"\s*:\s*"([^"]*)"/.exec(objectText);
  return match ? match[1] : null;
}
