import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * The only place in the app that calls `getCloudflareContext`. Everything
 * else (DB, auth, bindings) goes through `getEnv()` so the Cloudflare
 * context stays behind one seam.
 */
export function getEnv(): CloudflareEnv {
  return getCloudflareContext().env;
}
