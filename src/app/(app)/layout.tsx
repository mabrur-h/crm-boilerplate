import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireUser } from "@/lib/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No middleware.ts in this project — this server layout is the auth
  // guard for every route under `(app)`.
  const user = await requireUser();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-4">
          <Link
            href="/dashboard"
            className="w-fit rounded-md text-lg font-semibold tracking-tight text-sidebar-foreground focus-visible:ring-3 focus-visible:ring-sidebar-ring/50 focus-visible:outline-none"
          >
            CRM
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-2 py-3">
            <SidebarNav />
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="gap-3 border-t border-sidebar-border p-3">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <div className="min-w-0 text-sm leading-tight">
              <p className="truncate font-medium text-sidebar-foreground">
                {user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <ThemeToggle className="size-9 shrink-0" />
          </div>
          <SignOutButton />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 md:hidden">
          <SidebarTrigger aria-label="Menyuni ochish" className="size-10" />
          <span className="text-base font-semibold tracking-tight text-foreground">
            CRM
          </span>
        </header>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
