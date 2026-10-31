import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#f3f0e7]">
      <div className="mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#45644d]">
            <span className="h-px w-8 bg-[#a65f3f]" />
            A more thoughtful way to rent
          </div>

          <h1 className="text-[clamp(3.35rem,7vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.065em] text-[#202b23]">
            Find a place
            <br />
            to <span className="font-serif font-normal italic text-[#507258]">begin.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-[#626960] sm:text-lg sm:leading-8">
            A good home changes the shape of your days. Find a rental that fits
            your life, your plans, and the way you want to feel at home.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#2f5039] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#243f2d]"
            >
              Explore available homes
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c8c9bc] px-6 py-3.5 text-sm font-semibold text-[#35463a] transition-colors hover:border-[#637966] hover:bg-white/50"
            >
              I have a property
              <ArrowDownRight size={16} />
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#d8d6ca] pt-5 text-sm text-[#626960]">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-[#a65f3f]" />
              Made for renting in Bangladesh
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[#a65f3f] sm:block" />
            <span>Clear listings. A simpler search.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[580px] lg:ml-auto">
          <div className="absolute -left-7 top-12 z-10 hidden h-24 w-24 rounded-full border border-[#9d684e]/40 sm:block" />
          <div className="relative aspect-[0.94] overflow-hidden rounded-t-[48%] rounded-b-2xl bg-[#d7dfd9] shadow-[0_28px_70px_-38px_rgba(37,53,41,0.42)]">
            <Image
              src="/images/rent.jpg"
              alt="A house-shaped wooden model beside a magnifying glass and the word rent"
              fill
              loading="eager"
              sizes="(max-width: 1024px) 90vw, 46vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c2a21]/40 via-transparent to-transparent" />
            <span className="absolute bottom-7 left-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              Find your next chapter
            </span>
          </div>

          <div className="absolute -bottom-5 -left-3 max-w-[230px] rounded-2xl border border-[#e1ded2] bg-[#fbfaf6] p-5 shadow-[0_16px_40px_-24px_rgba(32,43,35,0.4)] sm:-left-10 sm:bottom-9">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a65f3f]">
              The search starts here
            </p>
            <p className="mt-2 font-serif text-xl leading-snug text-[#26342a]">
              Your next place, on your terms.
            </p>
          </div>
          <span className="absolute -right-2 top-8 hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#6b756a] [writing-mode:vertical-rl] lg:block">
            RENTNEST · FIND YOUR PLACE
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
