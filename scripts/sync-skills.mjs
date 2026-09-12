#!/usr/bin/env node
// Mirrors every PROJECT skill (the names listed in `skills.config.json`'s
// `project` array) from `.agents/skills/<name>/` into `.claude/skills/<name>/`.
// Each destination folder is fully replaced (so stale files are removed,
// not just overwritten) — but only for project skill folders; vendored
// skill folders are never touched here (those are written directly to both
// trees by `npm run skills:update`).
//
// Run with: npm run skills:sync

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const config = JSON.parse(readFileSync(join(repoRoot, "skills.config.json"), "utf8"));

const agentsRoot = join(repoRoot, ".agents", "skills");
const claudeRoot = join(repoRoot, ".claude", "skills");

let copied = 0;
let hadError = false;

for (const name of config.project) {
  const src = join(agentsRoot, name);
  const dest = join(claudeRoot, name);

  if (!existsSync(src)) {
    console.error(`X ${name}: .agents/skills/${name}/ topilmadi — o‘tkazib yuborildi`);
    hadError = true;
    continue;
  }

  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`OK ${name}`);
  copied++;
}

console.log(`\n${copied} ta loyiha skill’i .agents/skills/ dan .claude/skills/ ga nusxalandi.`);

if (hadError) {
  process.exitCode = 1;
}
