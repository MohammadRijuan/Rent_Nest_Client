"use server";

import { unstable_rethrow } from "next/navigation";

const PropertyAction = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to fetch property data",
      };
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    unstable_rethrow(error);
    console.error("Property fetch error:", error);

    return {
      success: false,
      data: null,
      message: "Unable to load properties",
    };
  }
};

export default PropertyAction;