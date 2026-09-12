import { describe, expect, it } from "vitest";
import {
  findD1DatabaseId,
  isR2NotEnabledError,
  parseMigrationsList,
  parseR2BucketList,
  parseWhoami,
} from "./wrangler-cli.mjs";

// Synthetic fixture shaped like `wrangler whoami --json`'s real output (see
// scripts/lib/wrangler-config.test.mjs for the same synthetic-fixture style).
const WHOAMI_LOGGED_IN = JSON.stringify({
  loggedIn: true,
  authType: "OAuth Token",
  email: "demo@example.com",
  accounts: [
    { id: "0123456789abcdef0123456789abcdef", name: "Demo Account", type: "standard" },
  ],
  tokenPermissions: ["account:read"],
});

const WHOAMI_NOT_LOGGED_IN = JSON.stringify({ loggedIn: false });

describe("parseWhoami", () => {
  it("parses a logged-in response", () => {
    const result = parseWhoami(WHOAMI_LOGGED_IN);
    expect(result).toEqual({
      loggedIn: true,
      email: "demo@example.com",
      accountName: "Demo Account",
    });
  });

  it("parses the not-logged-in response wrangler prints as a JsonFriendlyFatalError", () => {
    expect(parseWhoami(WHOAMI_NOT_LOGGED_IN)).toEqual({ loggedIn: false });
  });

  it("treats unparsable output as not logged in rather than throwing", () => {
    expect(parseWhoami("")).toEqual({ loggedIn: false });
    expect(parseWhoami("not json at all")).toEqual({ loggedIn: false });
  });
});

describe("parseMigrationsList", () => {
  it("recognizes the no-pending-migrations message", () => {
    expect(parseMigrationsList("✅ No migrations to apply!\n")).toEqual({
      pending: false,
      migrations: [],
    });
  });

  it("extracts pending migration file names from the table output", () => {
    const output = [
      "Migrations to be applied:",
      "┌──────────────────────────┐",
      "│ Name                     │",
      "├──────────────────────────┤",
      "│ 0002_dapper_freak.sql    │",
      "└──────────────────────────┘",
    ].join("\n");

    expect(parseMigrationsList(output)).toEqual({
      pending: true,
      migrations: ["0002_dapper_freak.sql"],
    });
  });

  it("returns pending: null for output it doesn't recognize", () => {
    expect(parseMigrationsList("some unexpected error")).toEqual({
      pending: null,
      migrations: [],
    });
  });
});

describe("findD1DatabaseId", () => {
  const list = JSON.stringify([
    { uuid: "11111111-1111-1111-1111-111111111111", name: "example-db" },
    { uuid: "22222222-2222-2222-2222-222222222222", name: "another-db" },
  ]);

  it("finds the uuid for an existing database by name", () => {
    expect(findD1DatabaseId(list, "another-db")).toBe("22222222-2222-2222-2222-222222222222");
  });

  it("returns null when no database with that name exists yet", () => {
    expect(findD1DatabaseId(list, "crm-boilerplate-db")).toBeNull();
  });

  it("throws on unparsable JSON", () => {
    expect(() => findD1DatabaseId("not json", "crm-boilerplate-db")).toThrow();
  });

  it("throws when the output isn't a JSON array", () => {
    expect(() => findD1DatabaseId(JSON.stringify({ oops: true }), "crm-boilerplate-db")).toThrow();
  });
});

describe("parseR2BucketList", () => {
  // Synthetic fixture shaped like `wrangler r2 bucket list`'s real output.
  const output = [
    "name:           example-bucket",
    "creation_date:  2026-08-08T13:46:33.088Z",
    "",
    "name:           another-bucket",
    "creation_date:  2026-05-09T13:33:38.138Z",
    "",
  ].join("\n");

  it("lists bucket names and reports whether the target bucket exists", () => {
    expect(parseR2BucketList(output, "another-bucket")).toEqual({
      buckets: ["example-bucket", "another-bucket"],
      exists: true,
    });
  });

  it("reports exists: false when the target bucket is absent", () => {
    expect(parseR2BucketList(output, "crm-boilerplate-files")).toEqual({
      buckets: ["example-bucket", "another-bucket"],
      exists: false,
    });
  });
});

describe("isR2NotEnabledError", () => {
  it("detects the real Cloudflare 'enable R2' error text (code 10042)", () => {
    const message =
      "A request to the Cloudflare API failed. Please enable R2 through the Cloudflare Dashboard. [code: 10042]";
    expect(isR2NotEnabledError(message)).toBe(true);
  });

  it("detects the 'not entitled to use r2' variant of the same error code", () => {
    expect(isR2NotEnabledError("You are not entitled to use r2. [code: 10042]")).toBe(true);
  });

  it("does not flag unrelated errors", () => {
    expect(isR2NotEnabledError("Network request failed")).toBe(false);
    expect(isR2NotEnabledError("")).toBe(false);
  });
});
