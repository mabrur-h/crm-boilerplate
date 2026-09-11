// Pure helpers shared by scripts/update-skills.mjs, scripts/sync-skills.mjs
// and scripts/check-skills.mjs. Kept side-effect-free (no fs, no
// child_process) so they can be unit tested directly — see skills.test.mjs.
// File-system-touching helpers live at the bottom of this module, clearly
// separated, and are exercised indirectly through the scripts.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const SKILL_NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Extracts the top-level `name` and `description` scalar fields from a
 * SKILL.md file's YAML frontmatter. Every SKILL.md in this repo (project and
 * vendored) uses plain single-line scalars for both fields, so a small
 * line-based parser is enough — no YAML dependency needed. Returns `null`
 * when the file has no frontmatter block at all.
 */
export function parseFrontmatter(content) {
  if (typeof content !== "string" || !content.startsWith("---")) {
    return null;
  }

  const firstBreak = content.indexOf("\n");
  if (firstBreak === -1) {
    return null;
  }

  const closingIndex = content.indexOf("\n---", firstBreak);
  if (closingIndex === -1) {
    return null;
  }

  const block = content.slice(firstBreak + 1, closingIndex);
  const fields = {};

  for (const line of block.split("\n")) {
    // Only read top-level (non-indented) `key: value` pairs; nested blocks
    // such as `metadata:` sub-keys are irrelevant to the checks we run.
    const match = /^([A-Za-z0-9_-]+):[ \t]?(.*)$/.exec(line);
    if (!match) {
      continue;
    }
    const [, key, rawValue] = match;
    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fields[key] = value;
  }

  return fields;
}

/**
 * Validates a SKILL.md's frontmatter against the agentskills.io
 * specification plus this project's own rule that `name` must equal the
 * folder it lives in. Returns `{ valid, errors }`.
 */
export function validateFrontmatter(fields, folderName) {
  const errors = [];

  if (!fields) {
    return { valid: false, errors: ["frontmatter topilmadi (YAML block yo‘q)"] };
  }

  const { name, description } = fields;

  if (!name) {
    errors.push("`name` maydoni yo‘q");
  } else {
    if (name.length > 64) {
      errors.push("`name` 64 belgidan uzun");
    }
    if (!SKILL_NAME_PATTERN.test(name)) {
      errors.push(`\`name\` "${name}" naqsh (lowercase-hyphen) talabiga mos emas`);
    }
    if (name !== folderName) {
      errors.push(`\`name\` ("${name}") papka nomiga ("${folderName}") teng emas`);
    }
  }

  if (!description) {
    errors.push("`description` maydoni yo‘q");
  } else if (description.length < 1 || description.length > 1024) {
    errors.push("`description` 1-1024 belgi oralig‘ida bo‘lishi kerak");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Compares two `relativePath -> hash` maps (e.g. one per skill, one per
 * side of the project/.claude mirror) and reports what differs.
 */
export function diffFileMaps(mapA, mapB) {
  const onlyInA = [];
  const onlyInB = [];
  const differing = [];

  const keysA = Object.keys(mapA);
  const keysB = new Set(Object.keys(mapB));

  for (const key of keysA) {
    if (!keysB.has(key)) {
      onlyInA.push(key);
      continue;
    }
    keysB.delete(key);
    if (mapA[key] !== mapB[key]) {
      differing.push(key);
    }
  }

  onlyInB.push(...keysB);

  return {
    onlyInA,
    onlyInB,
    differing,
    identical: onlyInA.length === 0 && onlyInB.length === 0 && differing.length === 0,
  };
}

/**
 * Cross-checks `skills.config.json` against what actually exists on disk
 * under `.agents/skills/`. `configuredNames` is `project` + every vendored
 * entry's `name`; `dirNames` is the real folder listing.
 */
export function checkConfigConsistency(configuredNames, dirNames) {
  const configured = new Set(configuredNames);
  const onDisk = new Set(dirNames);

  const missingFromDisk = configuredNames.filter((name) => !onDisk.has(name));
  const unlisted = dirNames.filter((name) => !configured.has(name));

  return { missingFromDisk, unlisted, consistent: missingFromDisk.length === 0 && unlisted.length === 0 };
}

// ---------------------------------------------------------------------------
// Filesystem helpers (not unit tested directly; thin wrappers around node:fs)
// ---------------------------------------------------------------------------

/** Lists immediate subdirectory names of `dir`, or `[]` if it doesn't exist. */
export function listSubdirs(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/** Recursively lists files under `dir`, returning paths relative to `dir`. */
export function listFilesRecursive(dir, base = dir) {
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return results;
    }
    throw error;
  }

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(full, base));
    } else if (entry.isFile()) {
      results.push(relative(base, full));
    }
  }
  return results.sort();
}

/** Builds a `relativePath -> sha256` map for every file under `dir`. */
export function buildFileHashMap(dir) {
  const map = {};
  for (const relPath of listFilesRecursive(dir)) {
    const content = readFileSync(join(dir, relPath));
    map[relPath] = createHash("sha256").update(content).digest("hex");
  }
  return map;
}

/** `true` if `path` exists and is a file. */
export function fileExists(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}
