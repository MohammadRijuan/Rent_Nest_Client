import Link from "next/link";
import {
  House,
  MapPin,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import type { NavbarProps } from "@/lib/types";

const footerLinks = {
  explore: [
    { label: "All Properties", href: "/properties" },
    { label: "Apartments", href: "/properties?type=apartment" },
    { label: "Houses", href: "/properties?type=house" },
    { label: "Rooms", href: "/properties?type=room" },
    { label: "Favorites", href: "/favorites" },
  ],
  company: [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "List Your Property", href: "/dashboard/properties/new" },
    { label: "My Dashboard", href: "/dashboard" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy_policy" },
    { label: "Terms & Conditions", href: "/terms_and_conditions" },
  ],
};

export default function Footer({
  user,
}: {
  user?: NavbarProps["user"];
}) {
  const role = user?.data?.profile?.role;
  const dashboardHref =
    role === "ADMIN"
      ? "/admin-dashboard"
      : role === "LANDLORD"
        ? "/landlord-dashboard"
        : role === "TENANT"
          ? "/dashboard"
          : "/login";

  return (
    <footer className="bg-zinc-950 text-zinc-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                <House size={24} />
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">
                Rent<span className="text-green-400">Nest</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
              Find a place that feels like home. Discover rental properties,
              explore your options, and connect with property owners through
              RentNest.
            </p>

            {/* Contact information */}
            <div className="mt-6 space-y-4">
              <a
                href="mailto:support@rentnest.com"
                className="flex items-center gap-3 text-sm transition hover:text-green-400"
              >
                <Mail size={17} className="shrink-0 text-green-400" />
                support@rentnest.com
              </a>

              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <MapPin size={17} className="shrink-0 text-green-400" />
                <span>Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base font-semibold text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={
                      link.label === "My Dashboard"
                        ? dashboardHref
                        : link.href
                    }
                    className="text-sm text-zinc-400 transition hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-semibold text-white">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-14 flex flex-col justify-between gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Ready to find your next home?
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Explore available properties and discover a place that suits you.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            Explore Properties
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-zinc-800 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            © 2026 RentNest. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}
