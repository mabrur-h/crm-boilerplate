#!/usr/bin/env node
// Deterministic vendored-skill updater. For every entry in
// `skills.config.json`'s `vendored` list, shallow + sparse `git clone`s the
// upstream repo at `ref` into a temp directory OUTSIDE this repo, copies the
// skill folder into both `.agents/skills/<name>/` and `.claude/skills/<name>/`,
// makes sure a LICENSE file ends up inside the folder (copying the repo
// root's LICENSE when the folder itself doesn't ship one), records the
// resolved commit SHA back into `skills.config.json`, and cleans the temp
// directory up. Node built-ins + `git` only — no interactive CLIs, no
// network access beyond public GitHub clones.
//
// Run with: npm run skills:update

import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const configPath = join(repoRoot, "skills.config.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

const destRoots = [
  join(repoRoot, ".agents", "skills"),
  join(repoRoot, ".claude", "skills"),
];

function git(args, cwd) {
  execFileSync("git", args, { cwd, stdio: ["ignore", "inherit", "inherit"] });
}

function findLicenseFile(dir) {
  if (!existsSync(dir)) return null;
  return readdirSync(dir).find((f) => /^license/i.test(f)) ?? null;
}

function ensureLicense(destDir, workdir, skillName) {
  if (findLicenseFile(destDir)) return;
  const rootLicense = findLicenseFile(workdir);
  if (rootLicense) {
    cpSync(join(workdir, rootLicense), join(destDir, rootLicense));
  } else {
    console.warn(
      `  ! ${skillName}: LICENSE fayli topilmadi (na skill papkasida, na repo tagida) — qo‘lda tekshiring`,
    );
  }
}

// Group vendored entries by repo+ref so each upstream repo is cloned once,
// even when several skills come from the same repo (e.g. cloudflare/skills).
const byRepo = new Map();
for (const entry of config.vendored) {
  const key = `${entry.repo}@${entry.ref}`;
  if (!byRepo.has(key)) {
    byRepo.set(key, { repo: entry.repo, ref: entry.ref, entries: [] });
  }
  byRepo.get(key).entries.push(entry);
}

let updatedCount = 0;
let skippedCount = 0;

for (const { repo, ref, entries } of byRepo.values()) {
  const workdir = mkdtempSync(join(tmpdir(), "crm-boilerplate-skills-"));
  console.log(`\nKlonlanmoqda: ${repo} (${ref}) -> vaqtinchalik papka (repo tashqarisida)`);
  try {
    git(
      ["clone", "--depth", "1", "--filter=blob:none", "--sparse", "--branch", ref, repo, workdir],
      repoRoot,
    );
    git(
      ["sparse-checkout", "set", "--cone", ...entries.map((e) => e.path)],
      workdir,
    );
    const commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: workdir })
      .toString()
      .trim();

    for (const entry of entries) {
      const sourceDir = join(workdir, entry.path);
      if (!existsSync(sourceDir)) {
        console.error(
          `  X ${entry.name}: manba papka "${entry.path}" repo’da topilmadi — o‘tkazib yuborildi (skills.config.json’dan olib tashlashni ko‘rib chiqing)`,
        );
        skippedCount++;
        continue;
      }

      for (const destRoot of destRoots) {
        const destDir = join(destRoot, entry.name);
        rmSync(destDir, { recursive: true, force: true });
        mkdirSync(destDir, { recursive: true });
        cpSync(sourceDir, destDir, { recursive: true });
        ensureLicense(destDir, workdir, entry.name);
      }

      entry.commit = commit;
      console.log(`  OK ${entry.name} <- ${entry.path} @ ${commit.slice(0, 12)}`);
      updatedCount++;
    }
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

console.log(`\n${updatedCount} ta vendored skill yangilandi, ${skippedCount} ta o‘tkazib yuborildi.`);
console.log("skills.config.json’dagi commit SHA’lar yangilandi.");
console.log("Keyingi qadam: npm run skills:sync (loyiha skill’larini .claude/skills/ ga ko‘chirish uchun) va npm run skills:check.");
