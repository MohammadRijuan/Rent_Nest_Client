
"use server";

import { cookies } from "next/headers";

const AdminPropertiesAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/properties`,
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

    if (!res.ok) {
      return {
        success: false as const,
        message: "Failed to fetch properties",
      };
    }

    const data = await res.json();

    return {
      success: true as const,
      data,
    };
  } catch {
    return {
      success: false as const,
      message: "Something went wrong while fetching properties",
    };
  }
};

export default AdminPropertiesAction;
