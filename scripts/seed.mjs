#!/usr/bin/env node
// Seeds the D1 database with one demo user and 12 fictional clients, so a
// fresh clone has something to look at immediately after `npm run dev`.
//
// Idempotent: every seeded row has a fixed id. Re-running deletes exactly
// those ids (in FK-safe order) and re-inserts them — it never touches any
// other row in the database.
//
// Local by default. `--remote` targets the real Cloudflare D1 database and
// requires an interactive "y" confirmation unless `--yes` is also passed.
// This script must never be invoked with `--remote` by an automated agent —
// it exists for a human maintainer who explicitly wants to seed a shared
// remote environment.
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { hashPassword } from "better-auth/crypto";

const DB_NAME = "crm-boilerplate-db";
const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "demo12345";
const DEMO_USER_ID = "seed-demo-user";
const DEMO_ACCOUNT_ID = "seed-demo-account";

const args = process.argv.slice(2);
const remote = args.includes("--remote");
const autoConfirm = args.includes("--yes");

function sql(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${String(value).replace(/'/g, "''")}'`;
}

function tashkentDate(offsetDays) {
  const date = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

// value: days from today (Tashkent) for `nextContactDate`, or null.
const CLIENTS = [
  {
    name: "Aziz Karimov",
    company: "ABC Tech",
    phone: "+998 90 000 00 01",
    stage: "new",
    nextContactDate: -3,
    note: "Birinchi uchrashuv o‘tkazildi",
  },
  {
    name: "Dilnoza Yusupova",
    company: "Yusupova Trading",
    phone: "+998 90 000 00 02",
    stage: "in_progress",
    nextContactDate: 0,
    note: null,
  },
  {
    name: "Sardor Tojiboyev",
    company: "Toshkent Savdo",
    phone: "+998 90 000 00 03",
    stage: "won",
    nextContactDate: 7,
    note: "Shartnoma imzolandi",
  },
  {
    name: "Nodira Rashidova",
    company: "NR Consulting",
    phone: "+998 90 000 00 04",
    stage: "lost",
    nextContactDate: null,
    note: "Byudjet yo‘q",
  },
  {
    name: "Bekzod Alimov",
    company: "Alimov Logistics",
    phone: "+998 90 000 00 05",
    stage: "new",
    nextContactDate: 3,
    note: null,
  },
  {
    name: "Malika Nazarova",
    company: "Nazarov Group",
    phone: "+998 90 000 00 06",
    stage: "in_progress",
    nextContactDate: -1,
    note: "Qayta bog‘lanish kerak",
  },
  {
    name: "Jasur Ergashev",
    company: "Ergashev IT",
    phone: "+998 90 000 00 07",
    stage: "won",
    nextContactDate: null,
    note: null,
  },
  {
    name: "Zarina Qodirova",
    company: "Qodirova Design",
    phone: "+998 90 000 00 08",
    stage: "lost",
    nextContactDate: null,
    note: null,
  },
  {
    name: "Otabek Yoldashev",
    company: "Yoldashev Group",
    phone: "+998 90 000 00 09",
    stage: "new",
    nextContactDate: 0,
    note: "Taklif yuborildi",
  },
  {
    name: "Feruza Xolmatova",
    company: "Xolmatov Farm",
    phone: "+998 90 000 00 10",
    stage: "in_progress",
    nextContactDate: -5,
    note: null,
  },
  {
    name: "Ravshan Mirzayev",
    company: "Mirzayev Auto",
    phone: "+998 90 000 00 11",
    stage: "won",
    nextContactDate: 14,
    note: null,
  },
  {
    name: "Shahnoza Tursunova",
    company: "Tursunova Beauty",
    phone: "+998 90 000 00 12",
    stage: "new",
    nextContactDate: null,
    note: "Qiziqish bildirdi",
  },
].map((client, index) => ({
  ...client,
  id: `seed-client-${index + 1}`,
  nextContactDate:
    client.nextContactDate === null ? null : tashkentDate(client.nextContactDate),
}));

async function buildSql() {
  const nowMs = Date.now();
  // `user`/`account` (Better Auth's own tables, `src/lib/db/schema.ts`) use
  // drizzle's `mode: "timestamp"`, which stores **seconds** since epoch.
  // `clients.createdAt/updatedAt` use `mode: "timestamp_ms"` (milliseconds)
  // per this module's own schema — the two tables intentionally disagree,
  // so this script converts explicitly for each rather than sharing one
  // "now" value.
  const nowSeconds = Math.floor(nowMs / 1000);
  const passwordHash = await hashPassword(DEMO_PASSWORD);

  const deleteIds = CLIENTS.map((client) => sql(client.id)).join(", ");

  const statements = [
    // Delete first, children before parents, so this is safe to re-run
    // whether or not FK enforcement is on.
    `DELETE FROM clients WHERE id IN (${deleteIds});`,
    `DELETE FROM account WHERE id = ${sql(DEMO_ACCOUNT_ID)};`,
    `DELETE FROM user WHERE id = ${sql(DEMO_USER_ID)};`,

    `INSERT INTO user (id, name, email, emailVerified, image, createdAt, updatedAt)
     VALUES (${sql(DEMO_USER_ID)}, ${sql("Demo foydalanuvchi")}, ${sql(DEMO_EMAIL)}, 1, NULL, ${sql(nowSeconds)}, ${sql(nowSeconds)});`,

    `INSERT INTO account (id, accountId, providerId, userId, accessToken, refreshToken, idToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope, password, createdAt, updatedAt)
     VALUES (${sql(DEMO_ACCOUNT_ID)}, ${sql(DEMO_USER_ID)}, ${sql("credential")}, ${sql(DEMO_USER_ID)}, NULL, NULL, NULL, NULL, NULL, NULL, ${sql(passwordHash)}, ${sql(nowSeconds)}, ${sql(nowSeconds)});`,

    ...CLIENTS.map(
      (client, index) => `
     INSERT INTO clients (id, name, phone, company, note, stage, nextContactDate, createdBy, createdAt, updatedAt)
     VALUES (${sql(client.id)}, ${sql(client.name)}, ${sql(client.phone)}, ${sql(client.company)}, ${sql(client.note)}, ${sql(client.stage)}, ${sql(client.nextContactDate)}, ${sql(DEMO_USER_ID)}, ${sql(nowMs - index * 3_600_000)}, ${sql(nowMs - index * 3_600_000)});`,
    ),
  ];

  return statements.join("\n");
}

async function confirmRemote() {
  if (autoConfirm) return true;

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(
      `Bu haqiqiy (--remote) "${DB_NAME}" bazasiga yoziladi. Davom etasizmi? (y/N) `,
    );
    return answer.trim().toLowerCase() === "y";
  } finally {
    rl.close();
  }
}

async function main() {
  if (remote) {
    const confirmed = await confirmRemote();
    if (!confirmed) {
      console.log("Bekor qilindi.");
      return;
    }
  }

  const statements = await buildSql();

  const dir = mkdtempSync(join(tmpdir(), "crm-seed-"));
  const file = join(dir, "seed.sql");
  writeFileSync(file, statements, "utf8");

  try {
    const result = spawnSync(
      "npx",
      [
        "wrangler",
        "d1",
        "execute",
        DB_NAME,
        remote ? "--remote" : "--local",
        "--file",
        file,
      ],
      { stdio: "inherit" },
    );

    if (result.status !== 0) {
      process.exitCode = result.status ?? 1;
      return;
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  console.log("✅ Demo ma’lumotlar qo‘shildi");
  console.log(`   Kirish: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
}

main();
