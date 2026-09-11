import { describe, expect, it } from "vitest";
import {
  checkConfigConsistency,
  diffFileMaps,
  parseFrontmatter,
  validateFrontmatter,
} from "./skills.mjs";

describe("parseFrontmatter", () => {
  it("reads name and description from a plain SKILL.md frontmatter block", () => {
    const content = [
      "---",
      "name: yangi-modul",
      "description: Build a new feature module. Uzbek triggers: \"yangi modul qo‘sh\".",
      "---",
      "",
      "# Yangi modul",
      "",
    ].join("\n");

    expect(parseFrontmatter(content)).toEqual({
      name: "yangi-modul",
      description: 'Build a new feature module. Uzbek triggers: "yangi modul qo‘sh".',
    });
  });

  it("ignores indented/nested keys such as metadata sub-fields", () => {
    const content = [
      "---",
      "name: web-design-guidelines",
      "description: Review UI code for guidelines.",
      "metadata:",
      "  author: vercel",
      "  version: \"1.0.0\"",
      "---",
      "body",
    ].join("\n");

    const fields = parseFrontmatter(content);
    expect(fields.name).toBe("web-design-guidelines");
    expect(fields.author).toBeUndefined();
  });

  it("returns null when there is no frontmatter block", () => {
    expect(parseFrontmatter("# just a heading\n")).toBeNull();
    expect(parseFrontmatter("")).toBeNull();
  });

  it("returns null when the closing --- is missing", () => {
    expect(parseFrontmatter("---\nname: broken\n")).toBeNull();
  });
});

describe("validateFrontmatter", () => {
  it("accepts a valid skill", () => {
    const result = validateFrontmatter(
      { name: "boshlash", description: "First-time setup." },
      "boshlash",
    );
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("flags a name that does not match the folder", () => {
    const result = validateFrontmatter(
      { name: "vercel-react-best-practices", description: "x" },
      "react-best-practices",
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("papka nomiga"))).toBe(true);
  });

  it("flags an invalid name pattern (uppercase / underscore)", () => {
    const result = validateFrontmatter(
      { name: "Yangi_Modul", description: "x" },
      "Yangi_Modul",
    );
    expect(result.valid).toBe(false);
  });

  it("flags a missing description", () => {
    const result = validateFrontmatter({ name: "baza" }, "baza");
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("description"))).toBe(true);
  });

  it("flags a description longer than 1024 characters", () => {
    const result = validateFrontmatter(
      { name: "baza", description: "a".repeat(1025) },
      "baza",
    );
    expect(result.valid).toBe(false);
  });

  it("flags missing frontmatter entirely", () => {
    const result = validateFrontmatter(null, "baza");
    expect(result.valid).toBe(false);
  });
});

describe("diffFileMaps", () => {
  it("reports identical maps as identical", () => {
    const map = { "SKILL.md": "abc", "LICENSE": "def" };
    const result = diffFileMaps(map, { ...map });
    expect(result).toEqual({ onlyInA: [], onlyInB: [], differing: [], identical: true });
  });

  it("finds files only on one side", () => {
    const result = diffFileMaps(
      { "SKILL.md": "abc", "extra-in-a.md": "1" },
      { "SKILL.md": "abc", "extra-in-b.md": "2" },
    );
    expect(result.onlyInA).toEqual(["extra-in-a.md"]);
    expect(result.onlyInB).toEqual(["extra-in-b.md"]);
    expect(result.identical).toBe(false);
  });

  it("finds files whose content differs", () => {
    const result = diffFileMaps(
      { "SKILL.md": "hash-a" },
      { "SKILL.md": "hash-b" },
    );
    expect(result.differing).toEqual(["SKILL.md"]);
    expect(result.identical).toBe(false);
  });
});

describe("checkConfigConsistency", () => {
  it("is consistent when configured names exactly match disk", () => {
    const result = checkConfigConsistency(["boshlash", "holat"], ["boshlash", "holat"]);
    expect(result).toEqual({ missingFromDisk: [], unlisted: [], consistent: true });
  });

  it("flags a configured skill missing from disk", () => {
    const result = checkConfigConsistency(["boshlash", "holat"], ["boshlash"]);
    expect(result.missingFromDisk).toEqual(["holat"]);
    expect(result.consistent).toBe(false);
  });

  it("flags a folder on disk that isn't listed in the config", () => {
    const result = checkConfigConsistency(["boshlash"], ["boshlash", "mystery-skill"]);
    expect(result.unlisted).toEqual(["mystery-skill"]);
    expect(result.consistent).toBe(false);
  });
});
