import Link from "next/link";
import { ArrowRight, House } from "lucide-react";

const HomeCTA = () => {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-7 py-16 text-center text-white md:px-16">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
          <House size={32} />
        </div>

        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Find Your Next Space?
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-white/80">
          Discover rental properties that match your lifestyle, needs, and
          budget. Your next space could be just one click away.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary transition hover:bg-gray-100"
          >
            Explore Properties <ArrowRight size={18} />
          </Link>

          <Link
            href="/register"
            className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            Join RentNest
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;