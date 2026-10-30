
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronUp, LogOut, Home, UserRound } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import type { ISidebarItem } from "@/lib/types";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";
import { LogoutAndRedirect } from "@/service/logout";

type UserProfile = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

type DashboardSidebarProps = {
  user: UserProfile | null;
};

export default function DashboardSidebar({
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // Menu is hidden initially.
  const [menuOpen, setMenuOpen] = useState(false);

  const role = user?.role?.toUpperCase();
  const name = user?.name ?? "User";
  const email = user?.email ?? "";

  const navItems: ISidebarItem[] =
    role === "TENANT"
      ? sidebarMenuItems.TENANT
      : role === "LANDLORD"
        ? sidebarMenuItems.LANDLORD
        : role === "ADMIN"
          ? sidebarMenuItems.ADMIN
          : [];

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r"
    >
      <SidebarContent>
        <SidebarGroup>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-3 text-lg font-bold"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              R
            </span>
            RentNest
            <Home className="ml-auto size-4 text-muted-foreground" />
          </Link>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active
                          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`}
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}

              {navItems.length === 0 && (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  No navigation available for role: {role ?? "unknown"}
                </p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t p-3">
        <div className="relative">
          {/* Only this profile button is visible initially. */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-sidebar-accent"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <UserRound className="size-5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">
                {name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {email || role || "Account"}
              </span>
            </span>

            <ChevronUp
              className={`size-4 shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* The dropdown only exists while menuOpen is true. */}
          {menuOpen && (
            <div className="absolute bottom-full left-0 z-[100] mb-2 w-full min-w-48 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg">
              <div className="border-b px-3 py-2">
                <p className="truncate text-sm font-medium">{name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {email || role || "Account"}
                </p>
              </div>

              <form action={LogoutAndRedirect}>
                <button
                  type="submit"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
