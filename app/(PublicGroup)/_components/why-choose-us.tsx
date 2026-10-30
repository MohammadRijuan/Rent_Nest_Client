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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Why RentNest
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            A Better Way to Find Your Next Home
          </h2>

          <p className="mt-4 text-gray-500">
            We make property discovery and rental management simpler for
            tenants and landlords.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={30} strokeWidth={1.6} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
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