// `false` during SSR and the first client render, `true` afterwards.
//
// Anything whose value only exists in the browser (the resolved theme, for
// example) has to render a stable placeholder first, or the server HTML and
// the client's first paint disagree. `useSyncExternalStore` expresses that
// without a setState-in-effect.
"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
