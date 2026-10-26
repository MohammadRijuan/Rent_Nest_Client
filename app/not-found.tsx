
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  House,
  Search,
} from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { getMe } from "@/service/getMe";

export default async function NotFound() {

  const user = await getMe()
  return (

    <>
      <Navbar user={user} />

      <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#FAFAF7] px-4 py-16 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-green-100/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-emerald-100/50 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-2xl text-center">
          {/* Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-green-200 bg-white text-green-800 shadow-sm">
            <House size={30} strokeWidth={1.7} />
          </div>

          {/* Error code */}
          <p className="mt-8 text-8xl font-extrabold tracking-tighter text-green-800 sm:text-9xl">
            404
          </p>

          {/* Message */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Looks like you're
            <span className="text-green-700"> lost.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-600 sm:text-lg">
            The property or page you're looking for may have been moved,
            removed, or might never have existed. Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3.5 font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <ArrowLeft size={18} />
              Back to home
            </Link>

            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3.5 font-semibold text-zinc-800 transition hover:border-green-700 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <Search size={18} />
              Explore properties
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Bottom note */}
          <div className="mx-auto mt-14 flex max-w-sm items-center justify-center gap-3 border-t border-zinc-200 pt-6">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-800">
              <House size={18} />
            </div>
            <p className="text-left text-sm leading-6 text-zinc-500">
              <span className="font-semibold text-zinc-800">
                Your next home is waiting.
              </span>
              <br />
              Let's find a place that feels right.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
