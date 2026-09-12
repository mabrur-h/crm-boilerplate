import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { diffConfigText, formatConfigDiff, getD1DatabaseId, setD1DatabaseId } from "./wrangler-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
// A byte-for-byte copy of the real wrangler.jsonc, including its comments.
// Kept as a fixture so this test doesn't depend on (or risk corrupting) the
// real project config file.
const FIXTURE = readFileSync(join(__dirname, "__fixtures__/wrangler.jsonc"), "utf8");

describe("setD1DatabaseId", () => {
  it("inserts database_id when it is missing, preserving every comment", () => {
    const result = setD1DatabaseId(FIXTURE, { databaseId: "11111111-1111-1111-1111-111111111111" });

    expect(getD1DatabaseId(result)).toBe("11111111-1111-1111-1111-111111111111");

    // Every comment line from the original file must still be present, verbatim.
    for (const line of FIXTURE.split("\n")) {
      if (line.trim().startsWith("//")) {
        expect(result).toContain(line);
      }
    }

    // The rest of the d1_databases entry is untouched.
    expect(result).toContain('"binding": "DB"');
    expect(result).toContain('"database_name": "crm-boilerplate-db"');
    expect(result).toContain('"migrations_dir": "migrations"');

    // Still valid JSON once comments are stripped (sanity check, not just substring matching).
    const withoutComments = result.replace(/^\s*\/\/.*$/gm, "");
    expect(() => JSON.parse(withoutComments)).not.toThrow();
  });

  it("updates an existing database_id in place", () => {
    const withId = setD1DatabaseId(FIXTURE, { databaseId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" });
    const updated = setD1DatabaseId(withId, { databaseId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" });

    expect(getD1DatabaseId(updated)).toBe("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
    expect(updated).not.toContain("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
  });

  it("is idempotent: applying the same id twice yields byte-identical output", () => {
    const once = setD1DatabaseId(FIXTURE, { databaseId: "cccccccc-cccc-cccc-cccc-cccccccccccc" });
    const twice = setD1DatabaseId(once, { databaseId: "cccccccc-cccc-cccc-cccc-cccccccccccc" });

    expect(twice).toBe(once);
  });

  it("throws rather than writing anything when the d1_databases array is missing", () => {
    const broken = FIXTURE.replace('"d1_databases"', '"not_d1_databases"');
    expect(() => setD1DatabaseId(broken, { databaseId: "x" })).toThrow();
  });

  it("throws when the requested binding does not exist in d1_databases", () => {
    expect(() => setD1DatabaseId(FIXTURE, { binding: "NOT_DB", databaseId: "x" })).toThrow();
  });

  it("throws when there are multiple entries with the same binding", () => {
    const duplicated = FIXTURE.replace(
      '"d1_databases": [\n    {\n      "binding": "DB",\n      "database_name": "crm-boilerplate-db",\n      "migrations_dir": "migrations"\n    }\n  ],',
      '"d1_databases": [\n    {\n      "binding": "DB",\n      "database_name": "crm-boilerplate-db",\n      "migrations_dir": "migrations"\n    },\n    {\n      "binding": "DB",\n      "database_name": "crm-boilerplate-db-2",\n      "migrations_dir": "migrations"\n    }\n  ],',
    );
    expect(duplicated).not.toBe(FIXTURE);
    expect(() => setD1DatabaseId(duplicated, { databaseId: "x" })).toThrow();
  });

  it("rejects an empty databaseId", () => {
    expect(() => setD1DatabaseId(FIXTURE, { databaseId: "" })).toThrow();
  });
});

describe("getD1DatabaseId", () => {
  it("returns null when no database_id is set yet", () => {
    expect(getD1DatabaseId(FIXTURE)).toBeNull();
  });
});

describe("diffConfigText / formatConfigDiff", () => {
  it("reports no changes when the two texts are identical", () => {
    expect(diffConfigText(FIXTURE, FIXTURE).some((entry) => entry.type !== "context")).toBe(false);
    expect(formatConfigDiff(FIXTURE, FIXTURE)).toEqual([]);
  });

  it("reports the real single-line case: inserting database_id", () => {
    const withId = setD1DatabaseId(FIXTURE, { databaseId: "11111111-1111-1111-1111-111111111111" });

    const lines = formatConfigDiff(FIXTURE, withId);

    // Exactly one line added, nothing removed, and every other line in the
    // file (including comments) is untouched context.
    expect(lines).toEqual(['+ "database_id": "11111111-1111-1111-1111-111111111111",']);
    const entries = diffConfigText(FIXTURE, withId);
    expect(entries.filter((e) => e.type === "removed")).toEqual([]);
    expect(entries.filter((e) => e.type === "context").length).toBe(
      FIXTURE.split("\n").length,
    );
  });

  it("reports the real single-line case: updating an existing database_id", () => {
    const withOldId = setD1DatabaseId(FIXTURE, { databaseId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" });
    const withNewId = setD1DatabaseId(withOldId, { databaseId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" });

    expect(formatConfigDiff(withOldId, withNewId)).toEqual([
      '- "database_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",',
      '+ "database_id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",',
    ]);
  });

  it("reports each changed line correctly when more than one line changes", () => {
    // This is exactly the case a naive set-difference gets wrong: two
    // distinct lines change, and (deliberately) one of the new lines'
    // text duplicates a line that still exists unchanged elsewhere in the
    // file, which would confuse a `filter(l => !newLines.includes(l))`
    // approach into thinking nothing changed there.
    const oldText = ['"a": "1",', '"b": "2",', '"c": "3",', '"a": "1",'].join("\n");
    const newText = ['"a": "1",', '"b": "20",', '"c": "30",', '"a": "1",'].join("\n");

    // Both changed lines are reported (nothing is hidden or misattributed
    // to the unrelated duplicate `"a": "1",` line before or after them).
    expect(formatConfigDiff(oldText, newText)).toEqual([
      '- "b": "2",',
      '- "c": "3",',
      '+ "b": "20",',
      '+ "c": "30",',
    ]);
  });

  it("treats an added trailing line as a pure addition, not a scrambled diff", () => {
    const oldText = ["line one", "line two"].join("\n");
    const newText = ["line one", "line two", "line three"].join("\n");

    expect(formatConfigDiff(oldText, newText)).toEqual(["+ line three"]);
  });
});
