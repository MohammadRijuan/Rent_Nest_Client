"use server"

import { toast } from "sonner";

const PropertyAction = async () => {

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                revalidate: 60 * 60 * 6,
                tags: ["properties"],
            }
        })

        if (!res.ok) {
            toast.error("failed to fetch property data")
        }

        const data = await res.json()

        return {
            success: true,
            data
        }

    } catch (error) {
        console.error("Property fetch error:", error);
    }

    return {
        success: false,
        data: null,
        message: "Unable to load properties",
    }

};

export default PropertyAction;