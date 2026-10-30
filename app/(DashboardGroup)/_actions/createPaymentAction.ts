"use server";

import { cookies } from "next/headers";

const CreatePaymentAction = async (rental_id: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ rental_id }),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false as const,
        message: data.message || "Payment creation failed",
      };
    }

    return {
      success: true as const,
      data: data.data,
    };
  } catch {
    return {
      success: false as const,
      message: "Something went wrong while creating payment",
    };
  }
};

export default CreatePaymentAction;