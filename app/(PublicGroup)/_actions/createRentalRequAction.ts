
"use server";

import { cookies } from "next/headers";

export interface RentalPayload {
    property_id: string;
    move_in_date: Date;
    message: string;
}

const CreateRentalRequAction = async (payload: RentalPayload) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Please login first.",
            };
        }

        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/rentals`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to submit request.",
            };
        }

        return {
            success: true,
            message: data.message || "Rental request submitted successfully!",
            data: data.data,
        };
    } catch (error) {
        console.error("Create rental error:", error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export default CreateRentalRequAction;
