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
    <article className="group overflow-hidden rounded-2xl border border-[#e4e0d5] bg-[#fffefa] transition duration-300 hover:-translate-y-1 hover:border-[#c5cabb] hover:shadow-[0_20px_50px_-35px_rgba(32,43,35,0.5)]">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#e8ebe4]">
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-[42%] rounded-t-full border border-[#8da08b]/50" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-[35%] rounded-t-full border border-[#8da08b]/35" />
        <Building2
          size={60}
          strokeWidth={1}
          className="relative text-[#55705a]/70 transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-[#fffefa]/90 px-3 py-1.5 text-[11px] font-semibold capitalize tracking-wide text-[#35463a]">
          {property.category?.name ?? "Property"}
        </span>

        <span
          className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
            isAvailable
              ? "bg-[#2f5039] text-white"
              : "bg-[#e2ded4] text-[#626960]"
          }`}
        >
          <CheckCircle2 size={12} />
          {isAvailable ? "Available" : property.status}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="line-clamp-1 text-xl font-semibold tracking-[-0.025em] text-[#26342a] transition-colors group-hover:text-[#507258]">
          {property.titles}
        </h2>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#687067]">
          <MapPin size={15} className="shrink-0 text-[#9a5c40]" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-6 text-[#687067]">
          {property.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#ece9df] py-4">
          <div className="flex items-center gap-2 text-sm text-[#59635a]">
            <BedDouble size={17} className="text-[#55705a]" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#59635a]">
            <Bath size={17} className="text-[#55705a]" />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
        </div>

        {amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {amenities.slice(0, 2).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f0e9] px-2.5 py-1 text-xs text-[#59635a]"
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
            ))}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-[#858b80]">Monthly rent</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-[#26342a]">
              ৳{Number(property.rent).toLocaleString("en-BD")}
              <span className="text-xs font-normal text-[#858b80]">
                {" "}/ month
              </span>
            </p>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d6d9ce] px-4 py-2.5 text-xs font-semibold text-[#35463a] transition-colors hover:border-[#2f5039] hover:bg-[#2f5039] hover:text-white"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}