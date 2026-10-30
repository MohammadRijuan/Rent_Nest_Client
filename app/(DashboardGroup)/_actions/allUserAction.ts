
"use server";

import { cookies } from "next/headers";

export const AllUserAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users`,
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
        message: "Failed to fetch all user data",
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
      message: "Something went wrong while fetching users",
    };
  }
};

export default AllUserAction;
