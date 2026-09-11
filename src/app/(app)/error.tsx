// Error boundary for every route under `(app)`. Must be a client component —
// Next passes it a `reset()` callback to retry the failed render.
"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppError({
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
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
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
    </div>
  );
}
