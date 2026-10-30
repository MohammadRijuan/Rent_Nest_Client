
import PropertyAction from "../_actions/propertyAction";

import type { Property } from "../_components/propertyCard";
import PropertyFilters from "../_components/propertyFilters";

export default async function PropertiesPage() {
  const result = await PropertyAction();

  if (!result.success) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-zinc-900">
          Unable to load properties
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          {result.message || "Please try again later."}
        </p>
      </main>
    );
  }

  // Get properties and exclude rented ones.
  const properties: Property[] = Array.isArray(result.data?.data?.data)
    ? result.data.data.data.filter(
        (property: Property) => property.status !== "RENTED"
      )
    : [];

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Page heading */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-800">
            Find your next place
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Explore Properties
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                Discover a place that fits your lifestyle, budget, and
                everyday needs.
              </p>
            </div>

            <p className="text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900">
                {properties.length}
              </span>{" "}
              {properties.length === 1 ? "property" : "properties"} found
            </p>
          </div>
        </div>
      </section>

      {/* Search, filters, and property cards */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PropertyFilters properties={properties} />
      </section>
    </main>
  );
}
