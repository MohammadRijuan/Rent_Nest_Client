"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  House,
  Building2,
  UserRound,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { NavbarProps } from "@/lib/types";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Properties", href: "/properties" },
  { label: "Favorites", href: "/favorites" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({user} : NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
 

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-800 text-white">
            <House size={22} />
          </span>

          <span className="text-2xl font-bold tracking-tight text-zinc-900">
            Rent<span className="text-green-700">Nest</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-green-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop authentication / profile */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-zinc-200 p-1.5 pr-3 transition hover:bg-zinc-50"
                aria-expanded={isProfileOpen}
                aria-label="Open profile menu"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-800">
                  <UserRound size={20} />
                </span>
                <span className="text-sm font-semibold text-zinc-800">
                  My Account
                </span>
                <ChevronDown
                  size={16}
                  className={`text-zinc-500 transition ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-xl">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-green-50 hover:text-green-800"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-green-50 hover:text-green-800"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <div className="my-1 border-t border-zinc-100" />

                  <button
                    type="button"
                    // onClick={}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
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
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-800 hover:bg-zinc-100 lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-green-50"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-zinc-200" />

            {user ? (
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
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-700 hover:bg-green-50"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  // onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
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
