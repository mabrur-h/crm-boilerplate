#!/usr/bin/env node
// `npm run doctor` — read-only health check. Never modifies anything; only
// reports what's wrong and exactly what command fixes it, in Uzbek.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { BETTER_AUTH_SECRET_KEY } from "./lib/dev-vars.mjs";
import { createReporter } from "./lib/format.mjs";
import { checkNodeVersion } from "./lib/node-version.mjs";
import { isPortFree } from "./lib/port.mjs";
import { runNpm, runNpx } from "./lib/run.mjs";
import { parseMigrationsList, parseWhoami } from "./lib/wrangler-cli.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DB_NAME = "crm-boilerplate-db";
const DEV_PORT = 3000;

const reporter = createReporter();

function checkNode() {
  const result = checkNodeVersion(process.version);
  if (result.level === "ok") reporter.ok(result.message);
  else if (result.level === "warn") reporter.warn(result.message, result.hint);
  else reporter.fail(result.message, result.hint);
}

function checkNpm() {
  const result = runNpm(["--version"], { cwd: ROOT });
  if (result.status === 0) {
    reporter.ok(`npm mavjud (versiya ${result.stdout.trim()}).`);
  } else {
    reporter.fail(
      "npm topilmadi.",
      "Node.js’ni https://nodejs.org saytidan o‘rnating — npm u bilan birga keladi.",
    );
  }
}

function checkDependencies() {
  if (!existsSync(join(ROOT, "node_modules"))) {
    reporter.fail(
      "Paketlar o‘rnatilmagan (node_modules yo‘q).",
      "Ishga tushiring: npm install (yoki: npm run setup)",
    );
    return;
  }
  const result = runNpm(["ls", "--depth=0"], { cwd: ROOT });
  if (result.status === 0) {
    reporter.ok("Paketlar o‘rnatilgan va izchil.");
  } else {
    reporter.warn(
      "Paketlar orasida nomuvofiqlik bor.",
      "Ishga tushiring: npm install",
    );
  }
}

function checkDevVars() {
  const devVarsPath = join(ROOT, ".dev.vars");
  if (!existsSync(devVarsPath)) {
    reporter.fail(
      "`.dev.vars` fayli topilmadi.",
      "Ishga tushiring: npm run setup",
    );
    return;
  }
  const content = readFileSync(devVarsPath, "utf8");
  const match = new RegExp(`^${BETTER_AUTH_SECRET_KEY}=(.*)$`, "m").exec(content);
  const value = match ? match[1].trim() : "";
  if (value === "") {
    reporter.fail(
      `\`.dev.vars\` mavjud, lekin ${BETTER_AUTH_SECRET_KEY} bo‘sh.`,
      "Ishga tushiring: npm run setup",
    );
    return;
  }
  reporter.ok("`.dev.vars` mavjud va maxfiy kalit to‘ldirilgan.");
}

function checkWranglerLogin() {
  const result = runNpx(["wrangler", "whoami", "--json"], { cwd: ROOT });
  const status = parseWhoami(result.stdout);
  if (status.loggedIn) {
    const who = status.accountName ?? status.email ?? "noma’lum hisob";
    reporter.ok(`Wrangler tizimga kirgan (${who}).`);
  } else {
    reporter.warn(
      "Wrangler tizimga kirmagan (sun’iy intellekt qoralamasi va deploy uchun kerak).",
      "Ishga tushiring: npx wrangler login",
    );
  }
}

function checkLocalMigrations() {
  const result = runNpx(["wrangler", "d1", "migrations", "list", DB_NAME, "--local"], {
    cwd: ROOT,
  });
  const { pending, migrations } = parseMigrationsList(result.stdout);
  if (pending === false) {
    reporter.ok("Lokal ma’lumotlar bazasi migratsiyalari qo‘llangan.");
  } else if (pending === true) {
    reporter.fail(
      `Lokal ma’lumotlar bazasida qo‘llanmagan migratsiyalar bor (${migrations.join(", ") || migrations.length}).`,
      "Ishga tushiring: npm run db:migrate:local",
    );
  } else {
    reporter.fail(
      "Lokal ma’lumotlar bazasi holatini aniqlab bo‘lmadi.",
      "Ishga tushiring: npm run db:migrate:local",
    );
  }
}

function checkGitRepo() {
  if (existsSync(join(ROOT, ".git"))) {
    reporter.ok("Git repozitoriyasi mavjud.");
  } else {
    reporter.warn(
      "Bu papka Git repozitoriyasi emas.",
      "Ishga tushiring: git init",
    );
  }
}

async function checkPort() {
  const free = await isPortFree(DEV_PORT);
  if (free) {
    reporter.ok(`${DEV_PORT}-port bo‘sh.`);
  } else {
    reporter.warn(
      `${DEV_PORT}-port band.`,
      `Band qilgan dasturni toping va to‘xtating (masalan: lsof -i :${DEV_PORT}), ` +
        `yoki boshqa portda ishga tushiring: npm run dev -- --port 3001`,
    );
  }
}

async function main() {
  checkNode();
  checkNpm();
  checkDependencies();
  checkDevVars();
  checkWranglerLogin();
  checkLocalMigrations();
  checkGitRepo();
  await checkPort();

  reporter.print();
  process.exitCode = reporter.failed ? 1 : 0;
}

main();
