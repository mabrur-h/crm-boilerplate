// Light / dark / system switcher. Icon-only trigger, so it carries an
// Uzbek `aria-label`. Renders a stable placeholder until mounted, because
// the resolved theme is only known in the browser.
"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const THEME_OPTIONS = [
  { value: "light", label: "Yorug‘", icon: Sun },
  { value: "dark", label: "Qorong‘i", icon: Moon },
  { value: "system", label: "Tizim", icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const TriggerIcon = mounted && resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Ko‘rinishni o‘zgartirish"
          className={className ?? "size-10"}
        >
          <TriggerIcon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {THEME_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => setTheme(option.value)}
            className={
              mounted && theme === option.value
                ? "font-medium text-primary"
                : undefined
            }
          >
            <option.icon aria-hidden="true" />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
