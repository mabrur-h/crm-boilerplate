import { describe, expect, it } from "vitest";
import { mergeDevVars } from "./dev-vars.mjs";

const EXAMPLE = "# Copy this file to .dev.vars and fill in a real value for local development.\nBETTER_AUTH_SECRET=\n";

describe("mergeDevVars", () => {
  it("creates .dev.vars from the example and fills the empty secret", () => {
    const result = mergeDevVars({
      exampleContent: EXAMPLE,
      existingContent: undefined,
      generateSecret: () => "generated-secret",
    });

    expect(result.created).toBe(true);
    expect(result.changed).toBe(true);
    expect(result.content).toContain(
      "# Copy this file to .dev.vars and fill in a real value for local development.",
    );
    expect(result.content).toContain("BETTER_AUTH_SECRET=generated-secret");
  });

  it("fills an existing but empty secret without touching anything else", () => {
    const existing = "# my own comment\nBETTER_AUTH_SECRET=\nEXTRA_VAR=keep-me\n";
    const result = mergeDevVars({
      exampleContent: EXAMPLE,
      existingContent: existing,
      generateSecret: () => "generated-secret",
    });

    expect(result.created).toBe(false);
    expect(result.changed).toBe(true);
    expect(result.content).toBe(
      "# my own comment\nBETTER_AUTH_SECRET=generated-secret\nEXTRA_VAR=keep-me\n",
    );
  });

  it("never overwrites an existing non-empty secret", () => {
    const existing = "BETTER_AUTH_SECRET=already-set\n";
    const result = mergeDevVars({
      exampleContent: EXAMPLE,
      existingContent: existing,
      generateSecret: () => {
        throw new Error("must not be called");
      },
    });

    expect(result.created).toBe(false);
    expect(result.changed).toBe(false);
    expect(result.content).toBe(existing);
  });

  it("is idempotent: running it twice on its own output changes nothing further", () => {
    const first = mergeDevVars({
      exampleContent: EXAMPLE,
      existingContent: undefined,
      generateSecret: () => "generated-secret",
    });

    const second = mergeDevVars({
      exampleContent: EXAMPLE,
      existingContent: first.content,
      generateSecret: () => {
        throw new Error("must not be called");
      },
    });

    expect(second.changed).toBe(false);
    expect(second.content).toBe(first.content);
  });

  it("appends the secret line if it is entirely missing from an existing file", () => {
    const existing = "SOME_OTHER_VAR=x\n";
    const result = mergeDevVars({
      exampleContent: EXAMPLE,
      existingContent: existing,
      generateSecret: () => "generated-secret",
    });

    expect(result.changed).toBe(true);
    expect(result.content).toBe("SOME_OTHER_VAR=x\nBETTER_AUTH_SECRET=generated-secret\n");
  });
});
