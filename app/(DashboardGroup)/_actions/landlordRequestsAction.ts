"use server";

import { cookies } from "next/headers";

const LandlordRequestsAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/requests`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
          }),
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false as const,
        message: data.message || "Failed to fetch rental requests",
      };
    }

    return { success: true as const, data };
  } catch {
    return {
      success: false as const,
      message: "Something went wrong while fetching requests",
    };
  }
};

export default LandlordRequestsAction;