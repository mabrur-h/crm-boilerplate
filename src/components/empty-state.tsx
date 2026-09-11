// One shape for every "there is nothing here yet" moment. An empty state
// should say what belongs here and offer the way to create it — not just
// report that the list is empty.
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional call to action, usually a `<Button>`. */
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-10 text-center ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <Icon className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground">{title}</p>
        {description && (
          <p className="max-w-xs text-sm text-balance text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
