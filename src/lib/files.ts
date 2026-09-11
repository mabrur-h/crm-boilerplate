// File-upload rules and R2 helpers for client files (M2b). Pure helpers
// (validation, key building, size formatting) are exported separately from
// the R2-touching helpers below so they can be unit tested without a
// Cloudflare context — see `src/lib/files.test.ts`.
import { getEnv } from "@/lib/cloudflare";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Content types this app accepts for client attachments.
export const ALLOWED_CONTENT_TYPES = [
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
] as const;

/**
 * Validates a file's size and content type before it is uploaded. Returns
 * `null` when the file is acceptable, or an Uzbek error message otherwise.
 */
export function validateUpload({
  size,
  type,
}: {
  size: number;
  type: string;
}): string | null {
  if (size <= 0) {
    return "Fayl tanlanmagan";
  }
  if (size > MAX_FILE_SIZE) {
    return "Fayl hajmi 10 MB dan oshmasligi kerak";
  }
  if (!(ALLOWED_CONTENT_TYPES as readonly string[]).includes(type)) {
    return "Bu turdagi faylni yuklab bo‘lmaydi";
  }
  return null;
}

/**
 * Builds the R2 object key for a client file: `clients/{clientId}/{fileId}-{sanitized}`.
 * `sanitized` keeps letters, digits, `.`, `-`, `_` (collapsing anything
 * else, including Uzbek/Cyrillic letters and spaces, to `-`) and is capped
 * at 80 characters while keeping the original file extension intact.
 */
export function buildObjectKey(
  clientId: string,
  fileId: string,
  filename: string,
): string {
  const lastDot = filename.lastIndexOf(".");
  const hasExtension = lastDot > 0 && lastDot < filename.length - 1;
  const base = hasExtension ? filename.slice(0, lastDot) : filename;
  const extension = hasExtension ? filename.slice(lastDot) : "";

  const sanitizedExtension = extension
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .slice(0, 20);
  const maxBaseLength = Math.max(80 - sanitizedExtension.length, 1);
  const sanitizedBase =
    base.replace(/[^a-zA-Z0-9.\-_]/g, "-").slice(0, maxBaseLength) || "file";

  const sanitized = `${sanitizedBase}${sanitizedExtension}`;
  return `clients/${clientId}/${fileId}-${sanitized}`;
}

const SIZE_UNITS = ["B", "KB", "MB", "GB"] as const;

/**
 * Formats a byte count for display, e.g. `512 B`, `3,4 KB`, `1,2 MB` — one
 * decimal digit with an Uzbek decimal comma above `B`.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const rounded = Math.round(value * 10) / 10;
  const formatted = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(1).replace(".", ",");

  return `${formatted} ${SIZE_UNITS[unitIndex]}`;
}

// --- Server helpers (touch the `FILES` R2 binding; not unit-testable) -----

export async function putObject(
  key: string,
  body: ReadableStream | ArrayBuffer | Blob,
  httpMetadata: { contentType: string },
): Promise<void> {
  await getEnv().FILES.put(key, body, { httpMetadata });
}

export async function getObject(key: string) {
  return getEnv().FILES.get(key);
}

export async function deleteObject(key: string): Promise<void> {
  await getEnv().FILES.delete(key);
}
