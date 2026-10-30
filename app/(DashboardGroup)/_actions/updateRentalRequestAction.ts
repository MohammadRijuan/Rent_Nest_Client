"use server";

import { cookies } from "next/headers";

const UpdateRentalRequestAction = async (
  id: string,
  status: "APPROVED" | "CANCELLED"
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/requests/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
          }),
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false as const,
        message: data.message || "Failed to update request",
      };
    }

    return { success: true as const, data };
  } catch {
    return {
      success: false as const,
      message: "Something went wrong while updating request",
    };
  }
};

export default UpdateRentalRequestAction;