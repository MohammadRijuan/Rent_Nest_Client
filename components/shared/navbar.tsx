"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  UserRound,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { NavbarProps } from "@/lib/types";
import { Logout } from "@/service/logout";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import BrandMark from "./brandMark";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Properties", href: "/properties" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isLoggedIn = Boolean(user?.success);

  const router = useRouter();
  const pathname = usePathname();

  const getDashboardRoute = () => {
    const role = user?.data?.profile?.role;


    if (role === "ADMIN") {
      return "/dashboard/admin";
    } else if (role === "LANDLORD") {
      return "/dashboard/landlord";
    } else if (role === "TENANT") {
      return "/dashboard/tenant";
    } else {
      return "/dashboard/tenant";
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setIsProfileOpen(false);

    try {
      const result = await Logout();

      if (result?.success) {
        toast.success("Logged out successfully");
        setIsLoggingOut(false);
        router.replace("/login");
        router.refresh();
      } else {
        toast.error("Logout failed. Please try again.");
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e2d9] bg-[#fbfaf6]/95 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex shrink-0 items-center">
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={link.href === "/properties" ? false : undefined}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`relative py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-[#9a5c40] after:transition-transform ${
                pathname === link.href
                  ? "text-[#2f5039] after:scale-x-100"
                  : "text-[#687067] after:scale-x-0 hover:text-[#2f5039] hover:after:scale-x-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop authentication / profile */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-[#dedbd0] p-1.5 pr-3 transition hover:bg-white"
                aria-expanded={isProfileOpen}
                aria-label="Open profile menu"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6ebe2] text-[#45644d]">
                  <UserRound size={20} />
                </span>
                <span className="text-sm font-semibold text-zinc-800">
                  My Account
                </span>
                <ChevronDown
                  size={16}
                  className={`text-zinc-500 transition ${isProfileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isProfileOpen && (
                <div                 className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-[#e5e2d9] bg-[#fbfaf6] p-2 shadow-[0_20px_50px_-25px_rgba(32,43,35,0.35)]">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#465248] transition hover:bg-[#edf0e9] hover:text-[#2f5039]"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    href={getDashboardRoute()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#465248] transition hover:bg-[#edf0e9] hover:text-[#2f5039]"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <div className="my-1 border-t border-[#e8e5dc]" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-700 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                  >
                    <LogOut size={18} />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#465248] transition hover:bg-[#eeece4]"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#2f5039] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243f2d]"
              >
                Sign up
              </Link>
            </>
          )}


        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#344338] transition hover:bg-[#eeece4] lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-[#e5e2d9] bg-[#fbfaf6] px-5 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={link.href === "/properties" ? false : undefined}
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`rounded-xl px-3 py-3 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-[#edf0e9] text-[#2f5039]"
                    : "text-[#465248] hover:bg-[#edf0e9]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-zinc-200" />

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-700 hover:bg-green-50"
                >
                  <UserRound size={18} />
                  My Profile
                </Link>

                <Link
                  href={getDashboardRoute()}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-700 hover:bg-green-50"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-green-800 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-900"
                >
                  Sign up
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  );
}
