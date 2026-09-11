import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

export async function getSession() {
  // Await the dynamic `headers()` API before touching `getAuth()` (which
  // reaches `getCloudflareContext()` synchronously via `getEnv()`). Next
  // only opts a route out of static prerendering once it sees a dynamic API
  // call complete; calling `getAuth()` first would run the sync
  // `getCloudflareContext()` while the route still looks static, which
  // OpenNext's Cloudflare adapter rejects at build time.
  const requestHeaders = await headers();
  return getAuth().api.getSession({ headers: requestHeaders });
}

/**
 * Server-only auth guard. Call at the top of `src/app/(app)/layout.tsx` (and
 * inside every protected server action / route handler) — this project has
 * no `middleware.ts`.
 */
export async function requireUser() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session.user;
}
