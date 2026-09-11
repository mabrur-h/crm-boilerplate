// Pure date helpers shared across features. No I/O, no Cloudflare context —
// safe to import from client or server code and to unit test directly.

const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

/**
 * Today's calendar day (`YYYY-MM-DD`) in the `Asia/Tashkent` time zone,
 * independent of the server's own time zone (Workers run in UTC).
 */
export function todayInTashkent(now: Date = new Date()): string {
  // `en-CA` formats as `YYYY-MM-DD`, which is exactly the shape we want.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * Formats a `YYYY-MM-DD` calendar date as Uzbek prose, e.g.
 * `formatUzDate("2026-09-12")` -> `"12-sentabr, 2026"`.
 */
export function formatUzDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const monthName = UZ_MONTHS[month - 1];
  return `${day}-${monthName}, ${year}`;
}

/**
 * True when `date` (a client's `nextContactDate`) is today or already in the
 * past relative to `today` — both `YYYY-MM-DD` strings. Plain string
 * comparison works because the format is zero-padded and big-endian.
 */
export function isDueOrOverdue(date: string, today: string): boolean {
  return date <= today;
}
