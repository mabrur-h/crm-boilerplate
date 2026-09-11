// The sidebar's main menu. A client component purely so it can read the
// current pathname and mark the active entry — the items themselves still
// come from `src/config/nav.ts`.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { navItems } from "@/config/nav";

export function SidebarNav() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenu className="gap-1">
      {navItems.map((item) => {
        // `/clients/abc` should keep "Mijozlar" highlighted.
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="h-10 gap-3 text-[0.9rem] data-[active=true]:font-medium"
            >
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  if (isMobile) setOpenMobile(false);
                }}
              >
                <item.icon aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
