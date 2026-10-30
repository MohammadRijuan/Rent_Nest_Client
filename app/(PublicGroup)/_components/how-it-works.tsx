import { Search, MessageCircle, KeyRound } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Property",
    description:
      "Browse available properties and choose one that fits your needs and budget.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Send a Rental Request",
    description:
      "Contact the landlord and submit your rental request through RentNest.",
  },
  {
    number: "03",
    icon: KeyRound,
    title: "Move Into Your New Space",
    description:
      "Complete the required steps and get ready to enjoy your new place.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#fbfaf6] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a5c40]">
            A clearer way forward
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em] text-[#202b23] md:text-5xl">
            From searching to settling in.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative border-t border-[#dedbd0] pt-5">
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-serif text-4xl italic text-[#a65f3f]">
                    {step.number}
                  </span>
                  <Icon size={23} strokeWidth={1.5} className="text-[#45644d]" />
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-[#26342a]">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-[#687067]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;