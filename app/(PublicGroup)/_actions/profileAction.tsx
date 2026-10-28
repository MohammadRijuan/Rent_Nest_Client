import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "UNAUTHORIZED", user: null };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
        // signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      return {
        success: false,
        message: `HTTP_ERROR_${res.status}`,
        user: null,
      };
    }

    const result = await res.json();

    return {
      success: true,
      message: "SUCCESS",
      user: result.data?.profile ?? null,
    };
  } catch (error) {
    console.error("Profile API error:", error);

    return {
      success: false,
      message: "BACKEND_ERROR",
      user: null,
    };
  }
};