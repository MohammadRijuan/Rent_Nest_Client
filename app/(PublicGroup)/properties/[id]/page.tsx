
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import {
    MapPin,
    BedDouble,
    Bath,
    Building2,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react";

import PropertyDetailsAction, {
    type PropertyDetails,
} from "../../_actions/propertyDetailsAction";

import RentalsAction from "../../../(DashboardGroup)/_actions/rentalsAction";

import RentalRequestDialog from "../../_components/rental-request-dialog";

type IdProps = {
    params: Promise<{ id: string }>;
};

type JwtPayload = {
    role?: string;
    exp?: number;
};

type RentalItem = {
    property?: {
        id?: string;
    };
};

function getUserRole(token?: string): string | null {
    if (!token) return null;

    try {
        const payload = token.split(".")[1];

        if (!payload) return null;

        const normalizedPayload = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const decoded = Buffer.from(
            normalizedPayload,
            "base64"
        ).toString("utf-8");

        const user: JwtPayload = JSON.parse(decoded);

        if (user.exp && user.exp * 1000 < Date.now()) {
            return null;
        }

        return user.role ?? null;
    } catch {
        return null;
    }
}

export default async function PropertyDetailsPage({
    params,
}: IdProps) {
    const { id } = await params;

    const [result, cookieStore] = await Promise.all([
        PropertyDetailsAction(id),
        cookies(),
    ]);

    if (!result.success || !result.data) {
        notFound();
    }

    const property: PropertyDetails = result.data;

    const accessToken = cookieStore
        .get("accessToken")
        ?.value;

    const userRole = getUserRole(accessToken);

    // Guests and tenants can see the request button.
    const canSeeRequestButton =
        property.status === "AVAILABLE" &&
        (!userRole || userRole === "TENANT");

    // Check whether this tenant has already requested
    // the current property.
    let alreadyRequested = false;

    if (userRole === "TENANT") {
        try {
            const rentalsResult = await RentalsAction();

            const rentals: RentalItem[] =
                rentalsResult?.data?.data || [];

            alreadyRequested = rentals.some(
                (rental) =>
                    rental.property?.id === property.id
            );
        } catch (error) {
            console.error(
                "Failed to check existing rental requests:",
                error
            );
        }
    }

    // Convert amenities into an array.
    const amenities = property.amenities
        ? property.amenities
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
        : [];

    return (
        <main className="min-h-screen bg-[#fbfaf6]">
            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Back Button */}
                <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#45644d] transition-colors hover:text-[#26342a]"
                >
                    <ArrowLeft size={17} />
                    Back to properties
                </Link>

                <div className="mt-6 overflow-hidden rounded-3xl border border-[#e4e0d5] bg-[#fffefa]">

                    {/* Property Image / Fallback */}
                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#e8ebe4] sm:h-72">
                        <div className="absolute h-56 w-56 rounded-t-full border border-[#8da08b]/50" />

                        <div className="absolute h-40 w-40 rounded-t-full border border-[#8da08b]/35" />

                        <Building2
                            size={76}
                            strokeWidth={1}
                            className="relative text-[#55705a]/70"
                        />
                    </div>

                    <div className="p-5 sm:p-9">

                        {/* Category and Status */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-full bg-[#e7ebe3] px-3 py-1.5 text-xs font-semibold capitalize text-[#45644d]">
                                {property.category?.name ?? "Property"}
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0eee7] px-3 py-1.5 text-xs font-semibold text-[#59635a]">
                                <CheckCircle2 size={14} />
                                {property.status}
                            </span>
                        </div>

                        {/* Property Title */}
                        <h1 className="mt-5 font-serif text-3xl font-medium tracking-tight text-[#26342a] sm:text-4xl">
                            {property.titles}
                        </h1>

                        {/* Location */}
                        <p className="mt-3 flex items-center gap-2 text-sm text-[#687067]">
                            <MapPin
                                size={18}
                                className="shrink-0 text-[#9a5c40]"
                            />
                            {property.location}
                        </p>

                        {/* Rent */}
                        <p className="mt-6 text-3xl font-semibold tracking-tight text-[#2f5039]">
                            ৳{Number(property.rent).toLocaleString("en-BD")}

                            <span className="ml-2 text-sm font-normal text-[#687067]">
                                / month
                            </span>
                        </p>

                        {/* Bedrooms and Bathrooms */}
                        <div className="mt-7 grid grid-cols-2 gap-4 border-y border-[#ece9df] py-5">

                            <div className="flex items-center gap-3">
                                <BedDouble
                                    size={22}
                                    className="text-[#55705a]"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-[#26342a]">
                                        {property.bedrooms} Bedrooms
                                    </p>

                                    <p className="text-xs text-[#858b80]">
                                        Sleeping spaces
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Bath
                                    size={22}
                                    className="text-[#55705a]"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-[#26342a]">
                                        {property.bathrooms} Bathrooms
                                    </p>

                                    <p className="text-xs text-[#858b80]">
                                        Bathroom facilities
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Description */}
                        <section className="mt-7">
                            <h2 className="font-serif text-xl font-medium text-[#26342a]">
                                About this property
                            </h2>

                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#59635a]">
                                {property.description ||
                                    "No description provided."}
                            </p>
                        </section>

                        {/* Amenities */}
                        <section className="mt-7">
                            <h2 className="font-serif text-xl font-medium text-[#26342a]">
                                Amenities
                            </h2>

                            {amenities.length > 0 ? (
                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {amenities.map((amenity) => (
                                        <li
                                            key={amenity}
                                            className="rounded-full bg-[#f2f0e9] px-3 py-2 text-sm text-[#59635a]"
                                        >
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-sm text-[#687067]">
                                    No amenities listed.
                                </p>
                            )}
                        </section>

                        {/* Guest / Tenant Request Button */}
                        {canSeeRequestButton && (
                            <div className="mt-8 border-t border-[#ece9df] pt-6">
                                <RentalRequestDialog
                                    propertyId={property.id}
                                    propertyTitle={property.titles}
                                    isGuest={!userRole}
                                    alreadyRequested={alreadyRequested}
                                />
                            </div>
                        )}

                        {/* Unavailable Property */}
                        {property.status !== "AVAILABLE" && (
                            <div className="mt-8 border-t border-[#ece9df] pt-6">
                                <p className="text-sm font-medium text-[#687067]">
                                    This property is currently unavailable.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </main>
    );
}
