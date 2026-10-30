
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    MapPin,
    BedDouble,
    Bath,
    Building2,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react";
import PropertyDetailsAction,{
    type PropertyDetails,
} from "../../_actions/propertyDetailsAction";



type IdProps = {
    params: Promise<{ id: string }>;
};

export default async function PropertyDetailsPage({ params }: IdProps) {
    const { id } = await params;
    const result = await PropertyDetailsAction(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const property: PropertyDetails = result.data;

    const amenities = property.amenities
        ? property.amenities.split(",").map((item) => item.trim()).filter(Boolean)
        : [];

    return (
        <main className="min-h-screen bg-[#FAFAF7]">
            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-950"
                >
                    <ArrowLeft size={17} />
                    Back to properties
                </Link>

                <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    {/* Property banner */}
                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-green-100 via-stone-100 to-green-50 sm:h-72">
                        <Building2 size={76} strokeWidth={1.2} className="text-green-800/40" />
                    </div>

                    <div className="p-5 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold capitalize text-green-800">
                                {property.category?.name ?? "Property"}
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700">
                                <CheckCircle2 size={14} />
                                {property.status}
                            </span>
                        </div>

                        <h1 className="mt-5 text-2xl font-bold text-zinc-900 sm:text-3xl">
                            {property.titles}
                        </h1>

                        <p className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                            <MapPin size={18} className="shrink-0 text-green-800" />
                            {property.location}
                        </p>

                        <p className="mt-6 text-3xl font-bold text-green-800">
                            ৳{Number(property.rent).toLocaleString("en-BD")}
                            <span className="ml-2 text-sm font-normal text-zinc-500">
                                / month
                            </span>
                        </p>

                        <div className="mt-7 grid grid-cols-2 gap-4 border-y border-zinc-100 py-5">
                            <div className="flex items-center gap-3">
                                <BedDouble size={22} className="text-green-800" />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900">
                                        {property.bedrooms} Bedrooms
                                    </p>
                                    <p className="text-xs text-zinc-500">Sleeping spaces</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Bath size={22} className="text-green-800" />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900">
                                        {property.bathrooms} Bathrooms
                                    </p>
                                    <p className="text-xs text-zinc-500">Bathroom facilities</p>
                                </div>
                            </div>
                        </div>

                        <section className="mt-7">
                            <h2 className="text-lg font-bold text-zinc-900">
                                About this property
                            </h2>
                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-600">
                                {property.description || "No description provided."}
                            </p>
                        </section>

                        <section className="mt-7">
                            <h2 className="text-lg font-bold text-zinc-900">Amenities</h2>

                            {amenities.length > 0 ? (
                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {amenities.map((amenity) => (
                                        <li
                                            key={amenity}
                                            className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700"
                                        >
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-sm text-zinc-500">
                                    No amenities listed.
                                </p>
                            )}
                        </section>

                        <div className="mt-8 border-t border-zinc-100 pt-6">
                            {property.status === "AVAILABLE" ? (
                                <Link
                                    href={`/properties/${property.id}/request`}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-green-800 px-5 py-3 font-semibold text-white transition hover:bg-green-900 sm:w-auto"
                                >
                                    Request this property
                                </Link>
                            ) : (
                                <p className="text-sm font-medium text-zinc-500">
                                    This property is currently unavailable.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
