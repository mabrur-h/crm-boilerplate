// Wraps next-themes. Class strategy (`.dark` on <html>), system preference
// by default, and no flash on first paint — next-themes injects a tiny
// blocking script that sets the class before the page renders.
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
