
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronUp, LogOut, UserRound } from "lucide-react";

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
import BrandMark from "@/components/shared/brandMark";

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
      className="border-r border-[#e3e1d7] bg-[#f7f6f0]"
    >
      <SidebarContent>
        <SidebarGroup>
          <Link
            href="/"
            className="flex items-center rounded-xl px-3 py-4"
          >
            <BrandMark />
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
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active
                          ? "bg-[#e7ebe3] font-semibold text-[#2f5039]"
                          : "text-[#657066] hover:bg-[#ecece4] hover:text-[#26342a]"
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

      <SidebarFooter className="mt-auto border-t border-[#e3e1d7] p-3">
        <div className="relative">
          {/* Only this profile button is visible initially. */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#ecece4]"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e7ebe3] text-[#45644d]">
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
            <div className="absolute bottom-full left-0 z-[100] mb-2 w-full min-w-48 rounded-xl border border-[#e3e1d7] bg-[#fbfaf6] p-1 text-[#26342a] shadow-lg">
              <div className="border-b border-[#e3e1d7] px-3 py-2">
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
