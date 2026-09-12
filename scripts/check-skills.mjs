#!/usr/bin/env node
// Validates the whole skills setup:
//  1. Every `skills.config.json` entry (project + vendored) exists on disk
//     under `.agents/skills/`, and no unlisted folder exists there.
//  2. Every `SKILL.md` in BOTH `.agents/skills/` and `.claude/skills/` has
//     valid frontmatter (name matches the folder, description length, …).
//  3. Every vendored folder ships a LICENSE file.
//  4. `.agents/skills/<name>/` and `.claude/skills/<name>/` are byte-for-byte
//     identical for every configured skill (project and vendored alike).
//
// Prints Uzbek ✅ / ❌ lines with a fix hint, and exits 1 on any failure.
//
// Run with: npm run skills:check

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildFileHashMap,
  checkConfigConsistency,
  diffFileMaps,
  fileExists,
  listSubdirs,
  parseFrontmatter,
  validateFrontmatter,
} from "./lib/skills.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const config = JSON.parse(readFileSync(join(repoRoot, "skills.config.json"), "utf8"));

const agentsRoot = join(repoRoot, ".agents", "skills");
const claudeRoot = join(repoRoot, ".claude", "skills");

const vendoredNames = new Set(config.vendored.map((entry) => entry.name));
const allConfiguredNames = [...config.project, ...config.vendored.map((entry) => entry.name)];

let ok = true;

function pass(msg) {
  console.log(`✅ ${msg}`);
}

function fail(msg, hint) {
  ok = false;
  console.log(`❌ ${msg}${hint ? ` — TUZATISH: ${hint}` : ""}`);
}

function hasLicenseFile(dir) {
  try {
    return readdirSync(dir).some((f) => /^license/i.test(f));
  } catch {
    return false;
  }
}

// 1. skills.config.json <-> .agents/skills/ on disk.
const agentsDirs = listSubdirs(agentsRoot);
const configCheck = checkConfigConsistency(allConfiguredNames, agentsDirs);
if (configCheck.consistent) {
  pass("skills.config.json ro‘yxati .agents/skills/ papkalari bilan mos");
} else {
  for (const name of configCheck.missingFromDisk) {
    fail(
      `"${name}" skills.config.json’da bor, lekin .agents/skills/ da yo‘q`,
      vendoredNames.has(name) ? "npm run skills:update" : "skill papkasini yarating",
    );
  }
  for (const name of configCheck.unlisted) {
    fail(
      `.agents/skills/${name}/ mavjud, lekin skills.config.json’da yo‘q`,
      "skills.config.json’ga qo‘shing yoki ortiqcha papkani o‘chiring",
    );
  }
}

// 2 & 3. Frontmatter validity (both trees) + LICENSE presence (vendored, both trees).
for (const [root, treeLabel] of [
  [agentsRoot, ".agents/skills"],
  [claudeRoot, ".claude/skills"],
]) {
  for (const name of listSubdirs(root)) {
    const skillDir = join(root, name);
    const skillMdPath = join(skillDir, "SKILL.md");

    if (!fileExists(skillMdPath)) {
      fail(`${treeLabel}/${name}/SKILL.md topilmadi`, "npm run skills:sync yoki npm run skills:update");
      continue;
    }

    const fields = parseFrontmatter(readFileSync(skillMdPath, "utf8"));
    const { valid, errors } = validateFrontmatter(fields, name);
    if (valid) {
      pass(`${treeLabel}/${name}: frontmatter to‘g‘ri`);
    } else {
      fail(`${treeLabel}/${name}: frontmatter xato (${errors.join("; ")})`);
    }

    if (vendoredNames.has(name)) {
      if (hasLicenseFile(skillDir)) {
        pass(`${treeLabel}/${name}: LICENSE mavjud`);
      } else {
        fail(`${treeLabel}/${name}: LICENSE fayli yo‘q`, "npm run skills:update");
      }
    }
  }
}

// 4. .agents/skills/<name> and .claude/skills/<name> are identical, per skill.
for (const name of allConfiguredNames) {
  const agentsDir = join(agentsRoot, name);
  const claudeDir = join(claudeRoot, name);
  const diff = diffFileMaps(buildFileHashMap(agentsDir), buildFileHashMap(claudeDir));

  if (diff.identical) {
    pass(`${name}: .agents/skills va .claude/skills bir xil`);
  } else {
    const details = [
      ...diff.onlyInA.map((f) => `faqat .agents/skills’da: ${f}`),
      ...diff.onlyInB.map((f) => `faqat .claude/skills’da: ${f}`),
      ...diff.differing.map((f) => `mazmuni har xil: ${f}`),
    ].join(", ");
    fail(
      `${name}: .agents/skills va .claude/skills bir xil emas (${details})`,
      vendoredNames.has(name) ? "npm run skills:update" : "npm run skills:sync",
    );
  }
}

console.log("");
if (ok) {
  console.log("✅ Barcha skill tekshiruvlari o‘tdi.");
} else {
  console.log("❌ Ba’zi skill tekshiruvlari muvaffaqiyatsiz. Yuqoridagi TUZATISH bo‘limlariga qarang.");
  process.exitCode = 1;
}
