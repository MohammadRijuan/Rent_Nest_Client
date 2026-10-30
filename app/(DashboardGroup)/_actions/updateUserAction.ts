
"use server";

import { cookies } from "next/headers";

type UpdatePayload = {
  role?: "TENANT" | "LANDLORD" | "ADMIN";
  isBlocked?: boolean;
};

export default async function UpdateUserAction(
  userId: string,
  payload: UpdatePayload
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
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

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to update user",
      };
    }

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while updating user",
    };
  }
}
