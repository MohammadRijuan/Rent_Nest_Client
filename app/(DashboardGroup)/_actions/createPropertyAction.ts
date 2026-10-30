
"use server";

import { cookies } from "next/headers";
import { revalidatePath, updateTag } from "next/cache";

type PropertyPayload = {
  category_id: string;
  titles: string;
  description: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string;
  status: "AVAILABLE" | "RENTED";
};

const CreatePropertyAction = async (payload: PropertyPayload) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
          }),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false as const,
        message: data.message || "Failed to create property",
      };
    }

    updateTag("properties");
    revalidatePath("/properties");

    return { success: true as const, data };
  } catch {
    return {
      success: false as const,
      message: "Something went wrong while creating property",
    };
  }
};

export default CreatePropertyAction;
