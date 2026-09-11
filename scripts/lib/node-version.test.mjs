import { describe, expect, it } from "vitest";
import { checkNodeVersion, parseNodeVersion } from "./node-version.mjs";

describe("parseNodeVersion", () => {
  it("parses a leading-v version string", () => {
    expect(parseNodeVersion("v22.23.1")).toEqual({ major: 22, minor: 23, patch: 1 });
  });

  it("parses a bare version string", () => {
    expect(parseNodeVersion("24.0.0")).toEqual({ major: 24, minor: 0, patch: 0 });
  });

  it("throws on garbage input", () => {
    expect(() => parseNodeVersion("not-a-version")).toThrow();
  });
});

describe("checkNodeVersion", () => {
  it("fails below the minimum supported version", () => {
    expect(checkNodeVersion("v18.20.0").level).toBe("fail");
  });

  it("warns when not on the recommended LTS major", () => {
    expect(checkNodeVersion("v22.23.1").level).toBe("warn");
  });

  it("passes on the recommended major", () => {
    expect(checkNodeVersion("v24.1.0").level).toBe("ok");
  });
});
