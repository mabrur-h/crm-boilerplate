#!/usr/bin/env node
// `npm run setup` — one command for a person who has never used a terminal.
// Gets a fresh clone to a working local app, or explains in Uzbek exactly
// what to do next. Idempotent: running it twice changes nothing further and
// still succeeds.
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { mergeDevVars } from "./lib/dev-vars.mjs";
import { createReporter } from "./lib/format.mjs";
import { checkNodeVersion } from "./lib/node-version.mjs";
import { runNpm } from "./lib/run.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const args = process.argv.slice(2);
const skipSeed = args.includes("--no-seed");

const reporter = createReporter();

function generateSecret() {
  return randomBytes(32).toString("base64");
}

function checkNode() {
  const result = checkNodeVersion(process.version);
  if (result.level === "ok") reporter.ok(result.message);
  else if (result.level === "warn") reporter.warn(result.message, result.hint);
  else reporter.fail(result.message, result.hint);
}

function installDependencies() {
  const nodeModulesPath = join(ROOT, "node_modules");
  if (existsSync(nodeModulesPath)) {
    reporter.ok("Paketlar allaqachon o‘rnatilgan (node_modules mavjud).");
    return;
  }

  reporter.ok("Paketlar o‘rnatilmoqda (npm install)...");
  const result = runNpm(["install"], { cwd: ROOT, stdio: "inherit" });
  if (result.status !== 0) {
    reporter.fail(
      "`npm install` muvaffaqiyatsiz tugadi.",
      "Xato xabarini o‘qing va qayta urinib ko‘ring: npm install",
    );
    return;
  }
  reporter.ok("Paketlar muvaffaqiyatli o‘rnatildi.");
}

function ensureDevVars() {
  const examplePath = join(ROOT, ".dev.vars.example");
  const devVarsPath = join(ROOT, ".dev.vars");

  if (!existsSync(examplePath)) {
    reporter.fail(
      "`.dev.vars.example` fayli topilmadi.",
      "Loyihani qaytadan klonlang yoki jamoadan so‘rang.",
    );
    return;
  }

  const exampleContent = readFileSync(examplePath, "utf8");
  const existingContent = existsSync(devVarsPath) ? readFileSync(devVarsPath, "utf8") : undefined;

  const { content, changed, created } = mergeDevVars({
    exampleContent,
    existingContent,
    generateSecret,
  });

  if (changed) {
    writeFileSync(devVarsPath, content, "utf8");
  }

  if (created) {
    reporter.ok("`.dev.vars` fayli yaratildi va maxfiy kalit (BETTER_AUTH_SECRET) hosil qilindi.");
  } else if (changed) {
    reporter.ok("`.dev.vars` faylidagi bo‘sh maxfiy kalit to‘ldirildi.");
  } else {
    reporter.ok("`.dev.vars` fayli tayyor.");
  }
}

function migrateLocal() {
  const result = runNpm(["run", "db:migrate:local"], { cwd: ROOT, stdio: "inherit" });
  if (result.status !== 0) {
    reporter.fail(
      "Lokal ma’lumotlar bazasi migratsiyasi muvaffaqiyatsiz tugadi.",
      "`npm run doctor` orqali muammoni aniqlang, so‘ng qayta urinib ko‘ring: npm run db:migrate:local",
    );
    return false;
  }
  reporter.ok("Lokal ma’lumotlar bazasi tayyor.");
  return true;
}

function seedDatabase() {
  if (skipSeed) {
    reporter.ok("Demo ma’lumotlar qo‘shilmadi (--no-seed berildi).");
    return;
  }
  const result = runNpm(["run", "db:seed"], { cwd: ROOT, stdio: "inherit" });
  if (result.status !== 0) {
    reporter.fail(
      "Demo ma’lumotlarni qo‘shib bo‘lmadi.",
      "`npm run doctor` orqali muammoni aniqlang, so‘ng qayta urinib ko‘ring: npm run db:seed",
    );
    return;
  }
  reporter.ok("Demo ma’lumotlar qo‘shildi.");
}

function printSummary() {
  console.log("");
  if (reporter.failed) {
    console.log("Sozlash to‘liq tugallanmadi. Yuqoridagi ❌ bandlarni hal qiling.");
    console.log("   → Nima qilish kerak: muammolarni aniqlash uchun ishga tushiring: npm run doctor");
    return;
  }
  console.log("✅ Hammasi tayyor! Endi quyidagilarni bajaring:");
  console.log("   1. Ilovani ishga tushiring: npm run dev");
  console.log("   2. Brauzerda oching: http://localhost:3000");
  console.log("   3. Demo hisob bilan kiring: demo@example.com / demo12345");
  console.log("");
  console.log("Agar biror narsa ishlamasa: npm run doctor");
}

function main() {
  checkNode();
  installDependencies();
  ensureDevVars();
  migrateLocal();
  seedDatabase();

  reporter.print();
  printSummary();

  process.exitCode = reporter.failed ? 1 : 0;
}

main();
