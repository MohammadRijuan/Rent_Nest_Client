"use server";

import { cookies } from "next/headers";

const PaymentsAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch payments",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export default PaymentsAction;