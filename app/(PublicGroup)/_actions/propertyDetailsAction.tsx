"use server"


export type PropertyDetails = {
    id: string;
    landlord_id: string;
    category_id: string;
    titles: string;
    description: string;
    location: string;
    rent: string;
    bedrooms: number;
    bathrooms: number;
    amenities: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    category: {
        name: string;
    } | null;
};

export default async function PropertyDetailsAction(id: string) {
    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/properties/${id}`,
            {
                method: "GET",
                next: {
                    revalidate: 3600, 
                },
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                data: null,
                message: result.message || "Failed to fetch property details.",
            };
        }

        return {
            success: true,
            data: result.data as PropertyDetails,
            message: result.message,
        };
    } catch (error) {
        console.error("Property details error:", error);

        return {
            success: false,
            data: null,
            message: "Unable to load property details.",
        };
    }
}
