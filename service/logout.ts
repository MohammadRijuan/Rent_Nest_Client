"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Logout = async () => {
  const cookieStore = await cookies();

  for (const name of ["accessToken", "refreshToken"]) {
    cookieStore.set(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  }

  return { success: true };
};

export const LogoutAndRedirect = async () => {
  await Logout();
  redirect("/login");
};