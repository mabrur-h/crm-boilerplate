import { drizzle } from "drizzle-orm/d1";
import { getEnv } from "@/lib/cloudflare";
import * as schema from "@/lib/db/schema";

/**
 * Creates a Drizzle instance bound to the request's D1 database. No
 * module-level instance — call this fresh per request/call, per the
 * project's Cloudflare Workers constraints.
 */
export function getDb() {
  return drizzle(getEnv().DB, { schema });
}
