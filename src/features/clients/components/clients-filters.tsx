// Search + stage filter for the clients list, synced to the URL
// (`?q=&stage=`) so the filtered view is shareable/bookmarkable and survives
// a refresh. The search input is debounced; the stage select updates the
// URL immediately. Self-wraps in Suspense (required for `useSearchParams`).
"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLIENT_STAGES } from "@/features/clients/constants";

const ALL_STAGES_VALUE = "all";
const SEARCH_DEBOUNCE_MS = 300;

function ClientsFiltersInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  // The last `q` value *this component* pushed to the URL. A debounced
  // search edit calls `router.replace`, which lands asynchronously — if the
  // user keeps typing while it's in flight, that URL update must not stomp
  // on their newer keystrokes when it finally lands. So `query` is only
  // resynced from `urlQuery` when the URL changed for a reason other than
  // our own last push (e.g. back/forward navigation) — checked during
  // render rather than in an effect, per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes.
  const [lastPushedQuery, setLastPushedQuery] = useState(urlQuery);
  if (urlQuery !== lastPushedQuery) {
    setLastPushedQuery(urlQuery);
    setQuery(urlQuery);
  }

  function updateParams(next: { q?: string; stage?: string }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.q !== undefined) {
      setLastPushedQuery(next.q);
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    if (next.stage !== undefined) {
      if (next.stage && next.stage !== ALL_STAGES_VALUE) {
        params.set("stage", next.stage);
      } else {
        params.delete("stage");
      }
    }

    const search = params.toString();
    startTransition(() => {
      router.replace(search ? `${pathname}?${search}` : pathname);
    });
  }

  useEffect(() => {
    if (query === urlQuery) {
      return;
    }
    const timeout = setTimeout(() => {
      updateParams({ q: query });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Input
        placeholder="Ism, telefon yoki kompaniya bo‘yicha qidirish"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="sm:max-w-xs"
        aria-label="Mijozlarni qidirish"
      />
      <Select
        value={searchParams.get("stage") ?? ALL_STAGES_VALUE}
        onValueChange={(value) => updateParams({ stage: value })}
      >
        <SelectTrigger className="sm:w-48" aria-label="Bosqich bo‘yicha filtr">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_STAGES_VALUE}>Barcha bosqichlar</SelectItem>
          {CLIENT_STAGES.map((stage) => (
            <SelectItem key={stage.value} value={stage.value}>
              {stage.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ClientsFilters() {
  return (
    <Suspense fallback={null}>
      <ClientsFiltersInner />
    </Suspense>
  );
}
