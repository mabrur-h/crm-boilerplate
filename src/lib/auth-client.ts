import { createAuthClient } from "better-auth/react";

// No `baseURL` needed: the browser always calls same-origin (falls back to
// `/api/auth`), so this works unmodified on localhost, preview, and any
// deployed domain.
export const authClient = createAuthClient();
