import Link from "next/link";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import type { NavbarProps } from "@/lib/types";
import BrandMark from "./brandMark";

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
    <footer className="bg-[#263a2d] text-[#e5e5dc]">
      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <BrandMark inverse />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#bdc6bc]">
              A more considered way to find a home or share one. Built for the
              people and places that make Bangladesh feel like home.
            </p>

            {/* Contact information */}
            <div className="mt-6 space-y-4">
              <a
                href="mailto:support@rentnest.com"
                className="flex items-center gap-3 text-sm transition hover:text-white"
              >
                <Mail size={17} className="shrink-0 text-[#d3b39b]" />
                support@rentnest.com
              </a>

              <div className="flex items-center gap-3 text-sm text-[#bdc6bc]">
                <MapPin size={17} className="shrink-0 text-[#d3b39b]" />
                <span>Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
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
                    prefetch={link.href.startsWith("/properties") ? false : undefined}
                    className="text-sm text-[#bdc6bc] transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#bdc6bc] transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#bdc6bc] transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d3b39b] transition hover:text-white"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-14 flex flex-col justify-between gap-5 border-y border-white/15 py-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Ready to find your next home?
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#bdc6bc]">
              Explore available properties and discover a place that suits you.
            </p>
          </div>

          <Link
            href="/properties"
            prefetch={false}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#f3f0e7] px-5 py-3 text-sm font-semibold text-[#2f5039] transition hover:bg-white"
          >
            Explore Properties
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-7 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-[#aeb9ae]">
            © 2026 RentNest. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}
