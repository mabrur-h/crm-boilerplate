import { describe, expect, it } from "vitest";
import {
  MAX_FILE_SIZE,
  buildContentDisposition,
  buildObjectKey,
  encodeRfc5987ValueChars,
  formatFileSize,
  validateUpload,
} from "@/lib/files";

describe("validateUpload", () => {
  it("rejects an empty selection", () => {
    expect(validateUpload({ size: 0, type: "image/png" })).toBe(
      "Fayl tanlanmagan",
    );
  });

  it("rejects a file larger than 10 MB", () => {
    expect(
      validateUpload({ size: MAX_FILE_SIZE + 1, type: "image/png" }),
    ).toBe("Fayl hajmi 10 MB dan oshmasligi kerak");
  });

  it("allows a file exactly at the 10 MB limit", () => {
    expect(validateUpload({ size: MAX_FILE_SIZE, type: "image/png" })).toBe(
      null,
    );
  });

  it("rejects a disallowed content type", () => {
    expect(
      validateUpload({ size: 1024, type: "application/x-msdownload" }),
    ).toBe("Bu turdagi faylni yuklab bo‘lmaydi");
  });

  it("accepts every allowed content type at a valid size", () => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "text/plain",
    ];
    for (const type of allowed) {
      expect(validateUpload({ size: 1024, type })).toBe(null);
    }
  });
});

describe("buildObjectKey", () => {
  it("keeps letters, digits, and .-_ from the filename", () => {
    expect(buildObjectKey("client-1", "file-1", "report_v2.final-1.pdf")).toBe(
      "clients/client-1/file-1-report_v2.final-1.pdf",
    );
  });

  it("collapses spaces and Uzbek/Cyrillic characters to hyphens", () => {
    expect(
      buildObjectKey("client-1", "file-1", "Шартнома О‘zbek fayli.docx"),
    ).toBe("clients/client-1/file-1------------zbek-fayli.docx");
  });

  it("keeps the extension intact", () => {
    const key = buildObjectKey("client-1", "file-1", "rasm.jpeg");
    expect(key.endsWith(".jpeg")).toBe(true);
  });

  it("caps the sanitized filename at 80 characters", () => {
    const longName = `${"a".repeat(200)}.txt`;
    const key = buildObjectKey("client-1", "file-1", longName);
    const sanitizedPart = key.slice("clients/client-1/file-1-".length);
    expect(sanitizedPart.length).toBeLessThanOrEqual(80);
    expect(sanitizedPart.endsWith(".txt")).toBe(true);
  });

  it("handles a filename with no extension", () => {
    const key = buildObjectKey("client-1", "file-1", "README");
    expect(key).toBe("clients/client-1/file-1-README");
  });
});

describe("encodeRfc5987ValueChars", () => {
  it("percent-encodes the RFC 5987 attr-char exceptions encodeURIComponent leaves bare", () => {
    // `encodeURIComponent` alone leaves `'`, `(`, `)`, and `*` unescaped,
    // but RFC 5987's `attr-char` grammar excludes exactly those four.
    expect(encodeRfc5987ValueChars("'")).toBe("%27");
    expect(encodeRfc5987ValueChars("(")).toBe("%28");
    expect(encodeRfc5987ValueChars(")")).toBe("%29");
    expect(encodeRfc5987ValueChars("*")).toBe("%2A");
  });

  it("encodes a realistic Uzbek filename with an apostrophe and parentheses", () => {
    const encoded = encodeRfc5987ValueChars("shartnoma (nusxa) o'zbek.pdf");
    expect(encoded).not.toMatch(/['()]/);
    expect(encoded).toBe(
      "shartnoma%20%28nusxa%29%20o%27zbek.pdf",
    );
  });

  it("still encodes non-ASCII characters the same way encodeURIComponent does", () => {
    expect(encodeRfc5987ValueChars("шартнома.pdf")).toBe(
      encodeURIComponent("шартнома.pdf"),
    );
  });

  it("leaves attr-char-safe punctuation (- _ . ! ~) untouched", () => {
    expect(encodeRfc5987ValueChars("a-b_c.d!e~f")).toBe("a-b_c.d!e~f");
  });
});

describe("buildContentDisposition", () => {
  it("uses inline for images and pdf, attachment otherwise", () => {
    expect(buildContentDisposition("rasm.png", "image/png")).toMatch(
      /^inline;/,
    );
    expect(buildContentDisposition("hujjat.pdf", "application/pdf")).toMatch(
      /^inline;/,
    );
    expect(
      buildContentDisposition("jadval.xlsx", "application/vnd.ms-excel"),
    ).toMatch(/^attachment;/);
  });

  it("produces a spec-conformant filename* value for a name with an apostrophe and parentheses", () => {
    const header = buildContentDisposition(
      "shartnoma (nusxa) o'zbek.pdf",
      "application/pdf",
    );
    const filenameStar = header.match(/filename\*=UTF-8''(\S+)/)?.[1];
    expect(filenameStar).toBeDefined();
    // None of RFC 5987's excluded attr-char punctuation may appear raw in
    // the ext-value — everything outside attr-char must be percent-encoded.
    expect(filenameStar).not.toMatch(/['()*]/);
  });

  it("keeps the ASCII fallback filename readable, quoting any literal quotes", () => {
    const header = buildContentDisposition('weird"name.txt', "text/plain");
    expect(header).toContain(`filename="weird'name.txt"`);
  });
});

describe("formatFileSize", () => {
  it("formats bytes under 1 KB with no decimal", () => {
    expect(formatFileSize(512)).toBe("512 B");
  });

  it("formats kilobytes with an Uzbek decimal comma", () => {
    expect(formatFileSize(3481)).toBe("3,4 KB");
  });

  it("formats megabytes with an Uzbek decimal comma", () => {
    expect(formatFileSize(1_258_291)).toBe("1,2 MB");
  });

  it("drops the decimal when the value is a whole number", () => {
    expect(formatFileSize(2048)).toBe("2 KB");
  });
});
