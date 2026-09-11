// Public shell: header + footer around the landing page. Everything here is
// visible to signed-out visitors, so it never touches the session.
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const GITHUB_URL = "https://github.com/mabrur-h/crm-boilerplate";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-1 flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
          <Link
            href="/"
            className="rounded-md text-lg font-semibold tracking-tight text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            CRM
          </Link>

          <nav
            aria-label="Asosiy"
            className="ml-auto flex items-center gap-3 text-sm sm:gap-5"
          >
            <a
              href="#imkoniyatlar"
              className="rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Imkoniyatlar
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Button asChild size="lg" className="h-10 px-4">
              <Link href="/login">Kirish</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 CRM boilerplate · Ochiq manba shablon</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-md underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
