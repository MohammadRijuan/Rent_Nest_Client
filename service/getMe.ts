"use server"

import { cookies } from "next/headers";
import type { IUser } from "@/lib/types";

export const getMe = async(): Promise<IUser | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return null;
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        method:"GET",
        headers : {
            Cookie : `accessToken=${accessToken}`
        },
        cache : "no-store",
    });

    if (res.status === 401 || res.status === 403) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Failed to load current user (HTTP ${res.status})`);
    }

    const result = (await res.json()) as IUser;
    return result.success ? result : null;
};
