import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings, Users } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

// Later modules append their entries here instead of building a separate
// nav.
export const navItems: NavItem[] = [
  { title: "Bosh sahifa", href: "/dashboard", icon: LayoutDashboard },
  { title: "Mijozlar", href: "/clients", icon: Users },
  { title: "Sozlamalar", href: "/settings", icon: Settings },
];
