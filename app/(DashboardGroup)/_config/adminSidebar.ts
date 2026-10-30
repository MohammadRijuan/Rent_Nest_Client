import { ISidebarItem } from "@/lib/types";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "All Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "All Properties",
    href: "/dashboard/admin/properties",
    icon: Building2,
  },
  {
    label: "All Rentals",
    href: "/dashboard/admin/rentals",
    icon: ClipboardList,
  },
];