import { Suspense } from "react";

import PropertyAction from "../_actions/propertyAction";
import type { Property } from "../_components/propertyCard";
import PropertyFilters from "../_components/propertyFilters";

async function PropertiesContent() {
  const result = await PropertyAction();

  if (!result.success) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl text-[#26342a]">
          Unable to load properties
        </h1>
        <p className="mt-2 text-sm text-[#687067]">
          {result.message || "Please try again later."}
        </p>
      </main>
    );
  }

  const properties: Property[] = Array.isArray(result.data?.data?.data)
    ? result.data.data.data.filter(
        (property: Property) => property.status !== "RENTED"
      )
    : [];

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <section className="border-b border-[#e5e2d9] bg-[#f3f0e7]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a5c40]">
            A considered search
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-medium tracking-[-0.04em] text-[#202b23] sm:text-6xl">
                Find your next <span className="italic text-[#507258]">place.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#687067] sm:text-base">
                Explore homes available to rent, with the details you need to
                choose what feels right.
              </p>
            </div>

            <p className="text-sm text-[#687067]">
              <span className="font-semibold text-[#26342a]">
                {properties.length}
              </span>{" "}
              {properties.length === 1 ? "property" : "properties"} found
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-8 lg:py-14">
        <PropertyFilters properties={properties} />
      </section>
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fbfaf6]" aria-busy="true">
          <section className="border-b border-[#e5e2d9] bg-[#f3f0e7]">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-8 lg:py-16">
              <div className="h-3 w-32 animate-pulse rounded bg-[#dedbd0]" />
              <div className="mt-6 h-14 max-w-lg animate-pulse rounded bg-[#dedbd0]" />
              <div className="mt-4 h-5 max-w-xl animate-pulse rounded bg-[#e5e2d9]" />
            </div>
          </section>
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-8 lg:py-14">
            <div className="h-64 animate-pulse rounded-2xl bg-[#f0eee7]" />
          </div>
        </main>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
