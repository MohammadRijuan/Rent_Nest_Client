"use server"

import jwt, { JwtPayload } from "jsonwebtoken"


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type userState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string,
    }
}


export const LoginAction = async (redirectTo: string, prevState: userState, formData: FormData) => {

    const email = formData.get("email")
    const password = formData.get("password")

    const payload = {
        email,
        password
    }


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();




    if (result.success) {
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",

        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
            redirect(redirectTo)
        }

        if (decodedToken.role === "ADMIN") {
            redirect("/dashboard/admin")
        }
        else if (decodedToken.role === "LANDLORD") {
            redirect("/dashboard/landlord")
        }
        else {
            redirect("/")
        }

    }

    return result
};





export const RegisterAction = async (redirectTo: string, prevState: userState, formData: FormData) => {

    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if (typeof password !== "string" || typeof confirmPassword !== "string" || password !== confirmPassword
    ) {
        return {
            success: false,
            message: "Password and confirm password do not match!",
        };
    }

    const payload = {
        name,
        email,
        password,
        confirmPassword
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json()


    // console.log("Registration status:", res.status);
    // console.log("Registration success:", result.success);
    // console.log("Registration message:", result.message);
    // console.log("Tokens received:", {
    //     accessToken: Boolean(result.data?.accessToken),
    //     refreshToken: Boolean(result.data?.refreshToken),
    // });

    if (result.success) {

        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        })

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload
        

    }

    return result


}