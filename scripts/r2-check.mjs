#!/usr/bin/env node
// `npm run r2:check` — read-only: is R2 enabled on this Cloudflare account,
// and does the app's bucket already exist. Never creates or modifies
// anything (see `cf-setup.mjs` for that).
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createReporter } from "./lib/format.mjs";
import { runNpx } from "./lib/run.mjs";
import { isR2NotEnabledError, parseR2BucketList, R2_BILLING_HINT } from "./lib/wrangler-cli.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const R2_BUCKET_NAME = "crm-boilerplate-files";

const reporter = createReporter();

function main() {
  const result = runNpx(["wrangler", "r2", "bucket", "list"], { cwd: ROOT });
  const combined = `${result.stdout}\n${result.stderr}`;

  if (isR2NotEnabledError(combined)) {
    reporter.fail("R2 bu hisobda yoqilmagan.", R2_BILLING_HINT);
    reporter.print();
    process.exitCode = 1;
    return;
  }

  if (result.status !== 0) {
    reporter.fail(
      "R2 bucketlar ro‘yxatini olib bo‘lmadi.",
      "Wrangler tizimga kirganini tekshiring: npx wrangler whoami",
    );
    reporter.print();
    process.exitCode = 1;
    return;
  }

  reporter.ok("R2 bu hisobda yoqilgan.");

  const { exists } = parseR2BucketList(result.stdout, R2_BUCKET_NAME);
  if (exists) {
    reporter.ok(`R2 bucket "${R2_BUCKET_NAME}" mavjud.`);
  } else {
    reporter.warn(
      `R2 bucket "${R2_BUCKET_NAME}" hali yaratilmagan.`,
      "Ishga tushiring: npm run cf:setup",
    );
  }

  reporter.print();
  process.exitCode = reporter.failed ? 1 : 0;
}

main();
