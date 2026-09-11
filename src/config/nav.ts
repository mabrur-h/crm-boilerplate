import type { LucideIcon } from "lucide-react";
import { LayoutDashboard } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

// Later modules (clients, settings, ...) append their entries here instead
// of building a separate nav.
export const navItems: NavItem[] = [
  { title: "Bosh sahifa", href: "/dashboard", icon: LayoutDashboard },
];
