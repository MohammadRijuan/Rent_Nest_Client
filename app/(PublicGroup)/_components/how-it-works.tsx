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
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Simple process
          </p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            How RentNest Works
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                  <Icon size={34} strokeWidth={1.6} />
                </div>

                <p className="mb-2 text-sm font-bold tracking-widest text-primary">
                  STEP {step.number}
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500">
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