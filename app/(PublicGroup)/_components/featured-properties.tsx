import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PropertyAction from "../_actions/propertyAction";
import PropertyCard, { type Property } from "./propertyCard";

const FeaturedProperties = async () => {
  const result = await PropertyAction();

  if (!result.success) return null;

  const properties: Property[] = result.data.data.data
    .filter((property: Property) => property.status === "AVAILABLE")
    .slice(0, 3);

  return (
    <section className="bg-[#fbfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a5c40]">
              <span className="h-px w-7 bg-[#9a5c40]" />
              A few good places
            </span>

            <h2 className="text-4xl font-medium tracking-[-0.045em] text-[#202b23] md:text-5xl">
              Find a place to <span className="font-serif italic text-[#507258]">settle in.</span>
            </h2>

            <p className="mt-4 max-w-xl text-[#687067]">
              Start with a few of the homes currently open for rent.
            </p>
          </div>

          <Link
            href="/properties"
            className="group inline-flex w-fit items-center gap-2 border-b border-[#aab2a7] pb-2 text-sm font-semibold text-[#35463a] transition-colors hover:border-[#9a5c40] hover:text-[#9a5c40]"
          >
            Browse all homes
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="border-y border-[#dedbd0] py-16 text-center">
            <h3 className="font-serif text-2xl text-[#26342a]">
              The next good place is on its way.
            </h3>
            <p className="mt-2 text-sm text-[#687067]">
              Check back soon for available homes.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;