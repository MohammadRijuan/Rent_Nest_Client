import Navbar from "@/components/shared/navbar";
import { House } from "lucide-react";
import Link from "next/link";

const AuthGroupLayout = (
    {children}:
    {
        children:React.ReactNode
    }
) => {
  return (
    <>
    <main className="min-h-screen bg-[#FAFAF7] px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-2">

        {/* Left Side — Branding */}
        <section className="hidden flex-col justify-between bg-green-900 p-12 text-white lg:flex">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <House size={25} />
            RentNest
          </Link>

          <div className="max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
              Welcome home
            </p>

            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Find a place that feels like home.
            </h1>

            <p className="mt-5 leading-7 text-green-100">
              Sign in to manage your rentals, save your favorite properties,
              and keep everything organized in one place.
            </p>
          </div>

          <p className="text-sm text-green-200">
            Your next chapter starts here.
          </p>
        </section>

        {/* Right Side — Login Form */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 lg:py-16">
          {children}
        </section>
      </div>
    </main>
    </>
  );
};

export default AuthGroupLayout;