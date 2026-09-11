import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getEnv } from "@/lib/cloudflare";
import { getDb } from "@/lib/db";
import { schema } from "@/lib/db/schema";

/**
 * Builds a fresh Better Auth instance for this request/call. Never a
 * module-level singleton — Workers isolates are reused across requests, and
 * both `getDb()` and the Cloudflare env binding must come from the current
 * request's context.
 */
export function getAuth() {
  const env = getEnv();

  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: "sqlite", schema }),
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      disableSignUp: env.ALLOW_SIGNUP !== "true",
    },
    // Base URL must work on any host without manual config: localhost dev
    // (any port), `opennextjs-cloudflare preview` (a different local port),
    // any `*.workers.dev` subdomain, and whatever custom domain a project
    // built from this template ends up on — none of which are known ahead
    // of time. Better Auth's dynamic `baseURL` config (added for exactly
    // this: multi-host deployments like Vercel previews) derives the base
    // URL from the incoming request's `Host` header per call and only needs
    // an allowlist of host patterns, so `allowedHosts: ["*"]` here means
    // "trust whatever host this request actually arrived on".
    //
    // `protocol: "auto"` is required, not cosmetic: a dynamic `baseURL`
    // config also seeds `trustedOrigins` (see
    // `node_modules/better-auth/dist/context/helpers.mjs`'s
    // `getTrustedOrigins`), and it does so once, at startup, without a
    // request to inspect — so it cannot sniff the scheme per call the way
    // the per-request `baseURL` resolution does. Left at its default
    // (`undefined`, meaning "https only"), every state-changing request over
    // plain `http://` — i.e. every request in local `next dev`, which never
    // terminates TLS — fails Better Auth's origin check with 403
    // `INVALID_ORIGIN`. `"auto"` makes it seed both `https://*` and
    // `http://*`, matching what `resolveDynamicBaseURL` already does per
    // request; the trust boundary is still `allowedHosts`, unchanged.
    baseURL: {
      allowedHosts: ["*"],
      protocol: "auto",
    },
    plugins: [nextCookies()],
  });
}
