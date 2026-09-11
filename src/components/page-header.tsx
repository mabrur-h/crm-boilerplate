// The heading block every page under `(app)` starts with. Keeping it in one
// component is what makes the pages feel like one product: same type scale,
// same gap, same place for the buttons. Copy this pattern into new modules.
export function PageHeader({
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Actions slot — buttons that belong to the page, right-aligned. */
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-[1.75rem]">
          {title}
        </h1>
        {description && (
          <p className="max-w-prose text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
