import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HomeCTA = () => {
  return (
    <section className="bg-[#fbfaf6] px-5 pb-20 md:pb-28">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#2f5039] px-7 py-12 text-[#f6f3eb] md:grid-cols-[1fr_auto] md:items-end md:px-14 md:py-14">
        <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d3b39b]">
          Your next chapter
        </p>
        <h2 className="max-w-2xl font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
          A place to call yours is closer than you think.
        </h2>

        <p className="mt-5 max-w-xl leading-7 text-white/70">
          Take your time. Find the right fit. Make yourself at home.
        </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
        <Link
          href="/properties"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f3f0e7] px-6 py-3.5 text-sm font-semibold text-[#2f5039] transition hover:bg-white"
        >
          Explore homes <ArrowRight size={17} />
        </Link>

        <Link
          href="/register"
          className="rounded-full border border-white/25 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Join RentNest
        </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;