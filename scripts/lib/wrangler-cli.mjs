// Pure parsers for the shapes of text/JSON that `wrangler` prints on stdout.
// Keeping these separate from the actual `spawnSync` calls (see `run.mjs`)
// is what makes them unit-testable against captured real output.

/**
 * Parses `wrangler whoami --json` output.
 * Logged in shape: {"loggedIn":true,"authType":"OAuth Token","email":"...","accounts":[{"id":"...","name":"..."}],...}
 * Not logged in: wrangler throws a JsonFriendlyFatalError whose message is
 * printed as-is to stdout: `{"loggedIn":false}` (non-zero exit code).
 */
export function parseWhoami(stdout) {
  let data;
  try {
    data = JSON.parse(String(stdout).trim());
  } catch {
    return { loggedIn: false };
  }

  if (!data || typeof data !== "object") {
    return { loggedIn: false };
  }

  if (data.loggedIn === false) {
    return { loggedIn: false };
  }

  if (data.loggedIn === true) {
    const account = Array.isArray(data.accounts) ? data.accounts[0] : undefined;
    return {
      loggedIn: true,
      email: typeof data.email === "string" ? data.email : null,
      accountName: account && typeof account.name === "string" ? account.name : null,
    };
  }

  return { loggedIn: false };
}

/**
 * Parses `wrangler d1 migrations list <db> --local` output.
 * Real shapes:
 *   "✅ No migrations to apply!"
 *   "Migrations to be applied:\n┌───────────────────────┐\n│ Name                  │\n├───────────────────────┤\n│ 0002_x.sql            │\n└───────────────────────┘"
 */
export function parseMigrationsList(stdout) {
  const text = String(stdout);
  if (/no migrations to apply/i.test(text)) {
    return { pending: false, migrations: [] };
  }
  if (/migrations to be applied/i.test(text)) {
    const migrations = [...text.matchAll(/([0-9]{4}_[A-Za-z0-9_]+\.sql)/g)].map((m) => m[1]);
    return { pending: true, migrations };
  }
  return { pending: null, migrations: [] };
}

/**
 * Parses `wrangler d1 list --json` output and returns the uuid for a
 * database by name, or `null` if no database with that name exists yet.
 */
export function findD1DatabaseId(stdout, databaseName) {
  let list;
  try {
    list = JSON.parse(String(stdout));
  } catch {
    throw new Error("`wrangler d1 list --json` chiqishi noto‘g‘ri JSON.");
  }
  if (!Array.isArray(list)) {
    throw new Error("`wrangler d1 list --json` chiqishi kutilmagan shaklda.");
  }
  const match = list.find((db) => db && db.name === databaseName);
  return match ? match.uuid : null;
}

/**
 * Parses `wrangler r2 bucket list` text output (no --json option exists).
 * Real shape:
 *   "name:           bucket-one\ncreation_date:  2026-08-08T13:46:33.088Z\n\nname:           bucket-two\n..."
 */
export function parseR2BucketList(stdout, bucketName) {
  const text = String(stdout);
  const names = [...text.matchAll(/^name:\s*(.+)$/gm)].map((m) => m[1].trim());
  return { buckets: names, exists: bucketName ? names.includes(bucketName) : undefined };
}

/**
 * Detects Cloudflare API error 10042 ("R2 is not enabled for this
 * account" / "Please enable R2 through the Cloudflare Dashboard"), the
 * error wrangler prints when the account has no billing info on file for R2.
 */
export function isR2NotEnabledError(text) {
  const value = String(text ?? "");
  return /\b10042\b/.test(value) || /enable r2/i.test(value);
}

export const R2_BILLING_HINT =
  "R2’ni yoqish uchun Cloudflare boshqaruv panelida to‘lov ma’lumotini (karta yoki PayPal) kiriting: " +
  "https://dash.cloudflare.com/?to=/:account/r2/overview — bepul reja oyiga 10 GB xotira, 1 mln Class A va " +
  "10 mln Class B operatsiyasini o‘z ichiga oladi, chiqish trafigi (egress) doim bepul; pul faqat shu bepul " +
  "chegaralardan oshganda yechiladi.";
