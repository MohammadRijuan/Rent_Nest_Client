
"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import PropertyCard, { type Property } from "./propertyCard";

type Props = {
  properties: Property[];
};

export default function PropertyFilters({ properties }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxRent, setMaxRent] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        properties
          .map((property) => property.category?.name)
          .filter((name): name is string => Boolean(name))
      )
    );
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        property.titles.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        property.category?.name.toLowerCase() === category.toLowerCase();

      const matchesRent =
        maxRent === "all" || Number(property.rent) <= Number(maxRent);

      const matchesBedrooms =
        bedrooms === "all" ||
        (bedrooms === "3+"
          ? property.bedrooms >= 3
          : property.bedrooms === Number(bedrooms));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRent &&
        matchesBedrooms
      );
    });
  }, [properties, search, category, maxRent, bedrooms]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMaxRent("all");
    setBedrooms("all");
  };

  const hasFilters =
    search !== "" ||
    category !== "all" ||
    maxRent !== "all" ||
    bedrooms !== "all";

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10";

  return (
    <div>
      {/* Search and filters */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={19} className="text-green-800" />
          <h2 className="font-semibold text-zinc-900">
            Find your perfect property
          </h2>
        </div>

        {/* Search input */}
        <div className="relative mt-5">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, location, or description..."
            aria-label="Search properties"
            className={`${inputClass} pl-11`}
          />
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Property category
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClass}
            >
              <option value="all">All categories</option>

              {categories.map((name) => (
                <option key={name} value={name}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="rent"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Maximum monthly rent
            </label>

            <select
              id="rent"
              value={maxRent}
              onChange={(event) => setMaxRent(event.target.value)}
              className={inputClass}
            >
              <option value="all">Any budget</option>
              <option value="10000">Up to ৳10,000</option>
              <option value="20000">Up to ৳20,000</option>
              <option value="30000">Up to ৳30,000</option>
              <option value="50000">Up to ৳50,000</option>
              <option value="100000">Up to ৳1,00,000</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="bedrooms"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Bedrooms
            </label>

            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(event) => setBedrooms(event.target.value)}
              className={inputClass}
            >
              <option value="all">Any number</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3+">3+ bedrooms</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X size={16} />
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-7 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-semibold text-zinc-900">
            {filteredProperties.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-zinc-900">
            {properties.length}
          </span>{" "}
          properties
        </p>
      </div>

      {/* Property results */}
      {filteredProperties.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
          <MapPin className="mx-auto h-10 w-10 text-zinc-400" />

          <h2 className="mt-4 text-lg font-semibold text-zinc-900">
            No matching properties
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Try changing your search or adjusting the filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
