
"use server";

import { cookies } from "next/headers";

interface UpdatePropertyData {
  category_id: string;
  titles: string;
  description: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string;
  status: "AVAILABLE" | "RENTED";
}

const UpdatePropertyAction = async (
  propertyId: string,
  propertyData: UpdatePropertyData
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Please log in first." };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(propertyData),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update property",
      };
    }

    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    console.error("Update property error:", error);

    return {
      success: false,
      message: "Something went wrong while updating property",
    };
  }
};

export default UpdatePropertyAction;
