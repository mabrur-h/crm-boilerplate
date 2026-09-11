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
    // "trust whatever host this request actually arrived on" rather than
    // widening a *separate* trust boundary — it doesn't touch
    // `trustedOrigins` (left at its default), which is what actually gates
    // cross-origin requests.
    baseURL: {
      allowedHosts: ["*"],
    },
    plugins: [nextCookies()],
  });
}
