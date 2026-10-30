import {
  ShieldCheck,
  SearchCheck,
  Wallet,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Listings",
    description:
      "Explore property listings with clear information to help you make confident rental decisions.",
  },
  {
    icon: SearchCheck,
    title: "Easy Property Search",
    description:
      "Find suitable rental spaces based on your location, budget, and preferences.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Compare rental prices and understand property costs before making a decision.",
  },
  {
    icon: Headset,
    title: "Simple Communication",
    description:
      "Connect with landlords and make your rental journey easier.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f3f0e7] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a5c40]">
            The RentNest difference
          </p>

          <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.03em] text-[#202b23] md:text-5xl">
            Renting should feel like a beginning.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#687067]">
            Less guesswork for tenants. A more considered way for landlords to
            share a place.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="border-t border-[#d6d3c7] pt-5">
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-[#b8c2b5] text-[#45644d]">
                  <Icon size={21} strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-[#26342a]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#687067]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;