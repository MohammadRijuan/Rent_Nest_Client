"use server"

import { cookies } from "next/headers";

const LandlordPropertiesAction = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
          }),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        message: "fetch error",
      };
    }

    const data = await res.json();

    return {
      success: true as const,
      data,
    };
  } catch (error) {
    return {
      success: false as const,
      message: "Something went wrong while fetching properties",
    };
  }
};

export default LandlordPropertiesAction;
