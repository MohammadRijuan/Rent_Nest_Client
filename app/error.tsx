"use client";

import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { getMe } from "@/service/getMe";

export default async function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("RentNest error:", error);
  }, [error]);

  const user = await getMe()

  return (
    <>
      <Navbar user={user} />

      <main className="flex min-h-[70vh] items-center justify-center bg-[#FAFAF7] px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle size={30} strokeWidth={1.7} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-green-800">
            Something went wrong
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            We hit an unexpected error.
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            Sorry about that. Please try again. If the problem continues,
            our support team can help.
          </p>

          {process.env.NODE_ENV === "development" && (
            <p className="mt-4 break-words rounded-lg bg-red-50 p-3 text-left text-sm text-red-700">
              {error.message}
            </p>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-900"
            >
              <RefreshCw size={17} />
              Try again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-800 transition hover:border-green-800 hover:text-green-800"
            >
              <Home size={17} />
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}