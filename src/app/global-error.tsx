// Root error boundary — catches errors that escape every other error.tsx
// (including ones thrown from the root layout itself, e.g. a missing
// BETTER_AUTH_SECRET or D1 binding on a misconfigured first deploy). Must be
// a Client Component, and per Next.js's global-error convention it replaces
// the root layout entirely, so it defines its own <html>/<body> and imports
// the app's global styles itself.
"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The user gets the Uzbek message; the developer gets the stack.
    console.error(error);
  }, [error]);

  return (
    <html lang="uz">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center antialiased">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive"
        >
          <TriangleAlert className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Nimadir xato ketdi
          </h1>
          <p className="max-w-sm text-sm text-balance text-muted-foreground">
            Sahifani yuklab bo‘lmadi. Qaytadan urinib ko‘ring.
          </p>
        </div>
        <Button
          type="button"
          onClick={reset}
          size="lg"
          className="h-10 px-4"
        >
          Qayta urinish
        </Button>
      </body>
    </html>
  );
}
