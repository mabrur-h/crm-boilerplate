// Shows a toast after a server action redirect carrying `?saved=1` or
// `?deleted=1`, then strips the query param so a page refresh doesn't
// re-show it. Wrapped in its own Suspense boundary (required for
// `useSearchParams`) so callers can just drop in `<SavedToast />`.
"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function SavedToastInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("saved") === "1") {
      toast.success("Mijoz saqlandi");
    } else if (searchParams.get("deleted") === "1") {
      toast.success("Mijoz o‘chirildi");
    } else {
      return;
    }

    router.replace(pathname, { scroll: false });
    // Only re-run when the params actually change; `router`/`pathname` are
    // stable between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

export function SavedToast() {
  return (
    <Suspense fallback={null}>
      <SavedToastInner />
    </Suspense>
  );
}
