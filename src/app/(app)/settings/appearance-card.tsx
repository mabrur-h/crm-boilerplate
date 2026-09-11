// "Ko‘rinish" card on the settings page: the same three theme options as the
// sidebar toggle, laid out as a radio group so the current choice is visible
// without opening a menu.
"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { THEME_OPTIONS } from "@/components/theme-toggle";

export function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div
      role="radiogroup"
      aria-label="Mavzu"
      className="grid grid-cols-3 gap-2"
    >
      {THEME_OPTIONS.map((option) => {
        const isSelected = mounted && theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setTheme(option.value)}
            className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border p-3 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${
              isSelected
                ? "border-primary bg-accent font-medium text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <option.icon aria-hidden="true" className="size-5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
