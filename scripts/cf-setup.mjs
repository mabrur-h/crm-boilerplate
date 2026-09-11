#!/usr/bin/env node
// `npm run cf:setup` — explicit-id path for wiring this repo to real
// Cloudflare resources (D1 database id, R2 bucket), for when wrangler's own
// auto-provisioning is not wanted or not working. Only ever touches remote
// Cloudflare state after an explicit "y" (or `--yes`); `--dry-run` prints
// exactly what would happen without doing any of it.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

import { createReporter } from "./lib/format.mjs";
import { runNpx } from "./lib/run.mjs";
import {
  findD1DatabaseId,
  isR2NotEnabledError,
  parseR2BucketList,
  parseWhoami,
  R2_BILLING_HINT,
} from "./lib/wrangler-cli.mjs";
import { formatConfigDiff, setD1DatabaseId } from "./lib/wrangler-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WRANGLER_CONFIG_PATH = join(ROOT, "wrangler.jsonc");

const D1_BINDING = "DB";
const D1_NAME = "crm-boilerplate-db";
const R2_BUCKET_NAME = "crm-boilerplate-files";

const args = process.argv.slice(2);
const autoYes = args.includes("--yes");
const dryRun = args.includes("--dry-run");

const reporter = createReporter();

async function confirm(question) {
  if (autoYes) return true;
  if (!process.stdin.isTTY) {
    // Non-interactive and no --yes: never guess. Caller sees a ⚠️ with the
    // exact flag/command to re-run.
    return false;
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`${question} (y/N) `);
    return answer.trim().toLowerCase() === "y";
  } finally {
    rl.close();
  }
}

function printWranglerJsoncDiff(oldText, newText) {
  const changedLines = formatConfigDiff(oldText, newText);
  if (changedLines.length === 0) {
    console.log("   (wrangler.jsonc allaqachon to‘g‘ri qiymatga ega — o‘zgarish yo‘q)");
    return;
  }
  console.log("   wrangler.jsonc o‘zgarishi:");
  for (const line of changedLines) console.log(`   ${line}`);
}

function writeDatabaseId(databaseId) {
  const currentText = readFileSync(WRANGLER_CONFIG_PATH, "utf8");
  let newText;
  try {
    newText = setD1DatabaseId(currentText, { binding: D1_BINDING, databaseId });
  } catch (error) {
    reporter.fail(
      `wrangler.jsonc’ni yangilab bo‘lmadi: ${error.message}`,
      "Faylni qo‘lda tekshiring va \"database_id\" maydonini o‘zingiz qo‘shing.",
    );
    return false;
  }

  if (dryRun) {
    printWranglerJsoncDiff(currentText, newText);
    return true;
  }

  if (currentText === newText) {
    reporter.ok("wrangler.jsonc allaqachon to‘g‘ri database_id’ga ega.");
    return true;
  }

  writeFileSync(WRANGLER_CONFIG_PATH, newText, "utf8");
  reporter.ok("wrangler.jsonc faylidagi database_id yangilandi.");
  return true;
}

async function ensureLoggedIn() {
  const result = runNpx(["wrangler", "whoami", "--json"], { cwd: ROOT });
  const status = parseWhoami(result.stdout);
  if (!status.loggedIn) {
    reporter.fail(
      "Wrangler tizimga kirmagan.",
      "Ishga tushiring: npx wrangler login",
    );
    return false;
  }
  reporter.ok(`Wrangler tizimga kirgan (${status.accountName ?? status.email ?? "hisob"}).`);
  return true;
}

async function ensureD1Database() {
  const listResult = runNpx(["wrangler", "d1", "list", "--json"], { cwd: ROOT });

  let existingId;
  try {
    existingId = findD1DatabaseId(listResult.stdout, D1_NAME);
  } catch (error) {
    reporter.fail(
      `D1 ma’lumotlar bazalari ro‘yxatini o‘qib bo‘lmadi: ${error.message}`,
      "Ishga tushiring: npx wrangler d1 list --json",
    );
    return;
  }

  if (existingId) {
    reporter.ok(`D1 ma’lumotlar bazasi "${D1_NAME}" allaqachon mavjud.`);
    writeDatabaseId(existingId);
    return;
  }

  if (dryRun) {
    reporter.warn(
      `D1 ma’lumotlar bazasi "${D1_NAME}" topilmadi — --dry-run rejimida yaratilmaydi.`,
      `Ishga tushiring: npx wrangler d1 create ${D1_NAME}`,
    );
    return;
  }

  const proceed = await confirm(
    `D1 ma’lumotlar bazasi "${D1_NAME}" mavjud emas. Cloudflare’da yaratilsinmi?`,
  );
  if (!proceed) {
    reporter.warn(
      `D1 ma’lumotlar bazasi yaratilmadi.`,
      `Keyinroq ishga tushiring: npm run cf:setup -- --yes (yoki qo‘lda: npx wrangler d1 create ${D1_NAME})`,
    );
    return;
  }

  const createResult = runNpx(["wrangler", "d1", "create", D1_NAME], { cwd: ROOT, stdio: "pipe" });
  const combined = `${createResult.stdout}\n${createResult.stderr}`;
  const idMatch = /"database_id"\s*:\s*"([^"]+)"/.exec(combined);

  if (createResult.status !== 0 || !idMatch) {
    reporter.fail(
      `D1 ma’lumotlar bazasini yaratib bo‘lmadi.`,
      `Xato xabarini o‘qing va qayta urinib ko‘ring: npx wrangler d1 create ${D1_NAME}`,
    );
    return;
  }

  reporter.ok(`D1 ma’lumotlar bazasi "${D1_NAME}" yaratildi.`);
  writeDatabaseId(idMatch[1]);
}

async function ensureR2Bucket() {
  const listResult = runNpx(["wrangler", "r2", "bucket", "list"], { cwd: ROOT });
  const combinedList = `${listResult.stdout}\n${listResult.stderr}`;

  if (isR2NotEnabledError(combinedList)) {
    reporter.fail("R2 bu hisobda yoqilmagan.", R2_BILLING_HINT);
    return;
  }

  const { exists } = parseR2BucketList(listResult.stdout, R2_BUCKET_NAME);
  if (exists) {
    reporter.ok(`R2 bucket "${R2_BUCKET_NAME}" allaqachon mavjud.`);
    return;
  }

  if (dryRun) {
    reporter.warn(
      `R2 bucket "${R2_BUCKET_NAME}" topilmadi — --dry-run rejimida yaratilmaydi.`,
      `Ishga tushiring: npx wrangler r2 bucket create ${R2_BUCKET_NAME}`,
    );
    return;
  }

  const proceed = await confirm(`R2 bucket "${R2_BUCKET_NAME}" mavjud emas. Cloudflare’da yaratilsinmi?`);
  if (!proceed) {
    reporter.warn(
      `R2 bucket yaratilmadi.`,
      `Keyinroq ishga tushiring: npm run cf:setup -- --yes (yoki qo‘lda: npx wrangler r2 bucket create ${R2_BUCKET_NAME})`,
    );
    return;
  }

  const createResult = runNpx(["wrangler", "r2", "bucket", "create", R2_BUCKET_NAME], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const combinedCreate = `${createResult.stdout}\n${createResult.stderr}`;

  if (isR2NotEnabledError(combinedCreate)) {
    reporter.fail("R2 bu hisobda yoqilmagan.", R2_BILLING_HINT);
    return;
  }

  if (createResult.status !== 0) {
    reporter.fail(
      `R2 bucket’ni yaratib bo‘lmadi.`,
      `Xato xabarini o‘qing va qayta urinib ko‘ring: npx wrangler r2 bucket create ${R2_BUCKET_NAME}`,
    );
    return;
  }

  reporter.ok(`R2 bucket "${R2_BUCKET_NAME}" yaratildi.`);
}

async function main() {
  if (!existsSync(WRANGLER_CONFIG_PATH)) {
    reporter.fail(
      "wrangler.jsonc fayli topilmadi.",
      "Loyiha papkasining ildizida ekanligingizga ishonch hosil qiling.",
    );
    reporter.print();
    process.exitCode = 1;
    return;
  }

  if (dryRun) {
    console.log("--dry-run: hech qanday buyruq bajarilmaydi, faqat nima qilinishi ko‘rsatiladi.\n");
  }

  const loggedIn = await ensureLoggedIn();
  if (!loggedIn) {
    reporter.print();
    process.exitCode = 1;
    return;
  }

  await ensureD1Database();
  await ensureR2Bucket();

  reporter.print();
  process.exitCode = reporter.failed ? 1 : 0;
}

main();
