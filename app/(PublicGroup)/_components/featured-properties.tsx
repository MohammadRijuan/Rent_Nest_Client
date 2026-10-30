import Link from "next/link";
import { MapPin, BedDouble, Bath, ArrowUpRight } from "lucide-react";
import PropertyAction from "../_actions/propertyAction";

const FeaturedProperties = async () => {
  const result = await PropertyAction();

  if (!result.success) return null;

  const properties = result.data.data.data
    .filter((property: any) => property.status === "AVAILABLE")
    .slice(0, 3);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Find your next home
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Featured <span className="text-primary">Properties</span>
            </h2>

            <p className="mt-4 max-w-xl text-gray-500">
              Explore some of our latest available properties and find a
              comfortable place that feels like home.
            </p>
          </div>

          <Link
            href="/properties"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-primary hover:bg-primary hover:text-white"
          >
            View All Properties
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Property Cards */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property: any) => (
              <article
                key={property.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image Placeholder */}
                <div className="relative flex h-60 items-center justify-center bg-gray-100">
                  <span className="text-sm text-gray-400">
                    Property Image
                  </span>

                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-green-600 shadow-sm">
                    Available
                  </span>
                </div>

                {/* Details */}
                <div className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {property.category?.name || "Residential"}
                  </p>

                  <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition group-hover:text-primary">
                    {property.titles}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>

                  <div className="my-5 flex items-center gap-5 border-y border-gray-100 py-4 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <BedDouble size={17} />
                      {property.bedrooms} Beds
                    </span>

                    <span className="flex items-center gap-2">
                      <Bath size={17} />
                      {property.bathrooms} Baths
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Monthly Rent</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">
                        ৳{Number(property.rent).toLocaleString("en-BD")}
                        <span className="text-sm font-normal text-gray-400">
                          {" "}/ month
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/properties/${property.id}`}
                      className="rounded-full bg-gray-900 p-3 text-white transition hover:bg-primary"
                      aria-label={`View ${property.titles}`}
                    >
                      <ArrowUpRight size={19} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              No properties available yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              New properties will appear here when available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;