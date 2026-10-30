import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Wifi,
  Car,
  Building2,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export type Property = {
  id: string;
  titles: string;
  description: string;
  location: string;
  rent: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string;
  status: string;
  category?: {
    name: string;
  } | null;
};

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const amenities = property.amenities
    ? property.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const isAvailable = property.status === "AVAILABLE";

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image placeholder */}
      <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-green-100 via-stone-100 to-green-50">
        <Building2
          size={56}
          strokeWidth={1.2}
          className="text-green-800/40"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold capitalize text-green-800 shadow-sm">
          {property.category?.name ?? "Property"}
        </span>

        <span
          className={`absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          <CheckCircle2 size={13} />
          {isAvailable ? "Available" : property.status}
        </span>
      </div>

      {/* Property information */}
      <div className="p-5">
        <h2 className="line-clamp-1 text-lg font-bold text-zinc-900 transition group-hover:text-green-800">
          {property.titles}
        </h2>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin size={16} className="shrink-0 text-green-800" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500">
          {property.description}
        </p>

        {/* Bedrooms and bathrooms */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-zinc-100 py-4">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <BedDouble size={18} className="text-green-800" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Bath size={18} className="text-green-800" />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Amenities
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {amenities.length > 0 ? (
              amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600"
                >
                  {amenity.toLowerCase().includes("wifi") ? (
                    <Wifi size={12} />
                  ) : amenity.toLowerCase().includes("parking") ? (
                    <Car size={12} />
                  ) : (
                    <CheckCircle2 size={12} />
                  )}
                  {amenity}
                </span>
              ))
            ) : (
              <span className="text-xs text-zinc-400">
                No amenities listed
              </span>
            )}
          </div>
        </div>

        {/* Rent and details link */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-zinc-400">Monthly rent</p>
            <p className="mt-1 text-xl font-bold text-green-800">
              ৳{Number(property.rent).toLocaleString("en-BD")}
              <span className="text-xs font-normal text-zinc-500">
                {" "}/ month
              </span>
            </p>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}