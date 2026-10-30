import { Suspense } from "react";
import FeaturedProperties from "./_components/featured-properties";
import { Hero } from "./_components/hero";
import HomeCTA from "./_components/home-cta";
import HowItWorks from "./_components/how-it-works";
import WhyChooseUs from "./_components/why-choose-us";


export const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <section className="bg-[#fbfaf6] py-20 md:py-28" aria-busy="true">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="h-3 w-36 animate-pulse rounded bg-[#e4e0d5]" />
              <div className="mt-5 h-10 max-w-xl animate-pulse rounded bg-[#e4e0d5]" />
              <div className="mt-10 grid gap-7 md:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-2xl bg-[#f0eee7]"
                  />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <FeaturedProperties />
      </Suspense>
      <WhyChooseUs />
      <HowItWorks />
      <HomeCTA />
    </>
  );
};

export default HomePage;