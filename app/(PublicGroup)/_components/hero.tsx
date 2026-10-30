
"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroSlides = [
  {
    title: "Find Your Perfect Home",
    description: "Discover rental properties that fit your lifestyle.",
    image: "/images/rent-1.jpg",
    alt: "Modern house surrounded by greenery",
  },
  {
    title: "Comfort Meets Convenience",
    description: "Explore beautiful homes in your preferred location.",
    image: "/images/rent-1.jpg",
    alt: "Bright and spacious modern living room",
  },
  {
    title: "Your Next Chapter Starts Here",
    description: "Find a place where you can feel at home.",
    image: "/images/rent-1.jpg",
    alt: "Contemporary home exterior",
  },
];

export function Hero() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <Carousel opts={{
        loop: true,
        align: "start",
      }} className="mx-auto w-full max-w-7xl">
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[420px] lg:h-[540px]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={slide.title === heroSlides[0].title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"  />

                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-2xl space-y-4 px-6 text-white sm:px-12 lg:px-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
                      RentNest
                    </p>

                    <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="max-w-lg text-sm leading-6 text-white/85 sm:text-lg sm:leading-8">
                      {slide.description}
                    </p>

                    <a
                      href="/properties"
                      className="inline-flex rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      Explore Properties
                    </a>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 border-0 bg-white/90 hover:bg-white sm:left-5" />
        <CarouselNext className="right-3 border-0 bg-white/90 hover:bg-white sm:right-5" />
      </Carousel>
    </section>
  );
}
