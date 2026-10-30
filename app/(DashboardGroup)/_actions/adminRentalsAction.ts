
"use server";

import { cookies } from "next/headers";

const AdminRentalsAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals`,
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
        message: "Failed to fetch rentals",
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
      message: "Something went wrong while fetching rentals",
    };
  }
};

export default AdminRentalsAction;
