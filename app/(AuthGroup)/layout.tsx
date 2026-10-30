import { House } from "lucide-react";
import Link from "next/link";

const AuthGroupLayout = (
    {children}:
    {
        children:React.ReactNode
    }
) => {
  return (
    <main className="min-h-screen bg-[#f3f0e7] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto grid min-h-[min(760px,calc(100vh-6rem))] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#e2ded3] bg-[#fbfaf6] shadow-[0_30px_90px_-55px_rgba(32,43,35,0.5)] lg:grid-cols-[0.95fr_1.05fr]">

        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#2f5039] p-10 text-[#f3f0e7] lg:flex xl:p-14">
          <div className="absolute -right-36 top-1/4 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-20 top-[30%] h-64 w-64 rounded-full border border-white/10" />
          <Link href="/" className="relative flex items-center gap-3 text-xl font-semibold tracking-tight">
            <span className="flex size-10 items-center justify-center rounded-full border border-white/30 text-[#e7c2a8]">
              <House size={19} strokeWidth={1.6} />
            </span>
            rent<span className="-ml-3 font-normal text-[#d3b39b]">nest</span>
          </Link>

          <div className="relative max-w-md">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d3b39b]">
              A place to begin
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-[-0.04em] xl:text-6xl">
              Good to have you here.
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-[#d3ddd2]">
              Sign in to pick up where you left off, keep your plans together,
              and make your next move feel a little simpler.
            </p>
          </div>

          <p className="relative text-xs uppercase tracking-[0.16em] text-[#c5d0c4]">
            Find your place, at your pace.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14 lg:py-16">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AuthGroupLayout;