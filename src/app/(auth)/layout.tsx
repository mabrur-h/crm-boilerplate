// Signed-out shell for /login and /signup: one centered column, the product
// name on top, a way back to the landing page at the bottom.
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-1 flex-col items-center justify-center bg-background px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Link
            href="/"
            className="rounded-md text-xl font-semibold tracking-tight text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            CRM
          </Link>
          <p className="text-sm text-muted-foreground">
            Mijozlaringizni bir joyda boshqaring
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
