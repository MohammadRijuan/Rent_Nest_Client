
"use client";

import { useMemo, useState } from "react";
import { Search, X, MapPin } from "lucide-react";
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
    "w-full rounded-xl border border-[#dedbd0] bg-[#fffefa] px-3 py-3 text-sm text-[#35463a] outline-none transition focus:border-[#55705a] focus:ring-2 focus:ring-[#55705a]/10";

  return (
    <div>
      <div className="rounded-2xl border border-[#e4e0d5] bg-[#f7f5ee] p-4 sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a5c40]">
            Refine your search
          </p>
          <h2 className="mt-1 font-serif text-2xl text-[#26342a]">
            The details that matter to you.
          </h2>
        </div>

        <div className="relative mt-5">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858b80]"
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

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-xs font-semibold text-[#59635a]"
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
              className="mb-2 block text-xs font-semibold text-[#59635a]"
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
              className="mb-2 block text-xs font-semibold text-[#59635a]"
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d9d6cb] px-4 py-3 text-sm font-semibold text-[#59635a] transition hover:bg-[#fffefa] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X size={16} />
              Clear filters
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-b border-[#e4e0d5] pb-4">
        <p className="text-sm text-[#687067]">
          Showing{" "}
          <span           className="font-semibold text-[#26342a]">
            {filteredProperties.length}
          </span>{" "}
          of{" "}
          <span           className="font-semibold text-[#26342a]">
            {properties.length}
          </span>{" "}
          properties
        </p>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-[#d6d3c7] bg-[#fffefa] px-6 py-16 text-center">
          <MapPin className="mx-auto h-10 w-10 text-[#9a5c40]" />

          <h2 className="mt-4 font-serif text-2xl text-[#26342a]">
            No matching properties
          </h2>

          <p className="mt-2 text-sm text-[#687067]">
            Try changing your search or adjusting the filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-[#2f5039] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243f2d]"
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
