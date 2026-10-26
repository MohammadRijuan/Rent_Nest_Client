"use client"


import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    LockKeyhole,
    ArrowRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { LoginAction } from "../_actions/authActions";
import { toast } from "sonner";



export const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    // optional but best practice
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    // main part
    const [state, action, pending] = useActionState(LoginAction.bind(null, redirectTo), false)

    useEffect(() => {
        if (!state || !state.message) return;

        if (state.success) {
            toast.success("Login successful");
        } else {
            toast.error("Login failed");
        }
    }, [state]);


    return (
        <>
            <form action={action} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Email address
                    </label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-zinc-700"
                        >
                            Password
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-green-800 hover:text-green-950"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-12 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            //   aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute cursor-pointer right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Remember Me */}
                <div className="flex  items-center gap-2">
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="size-4 cursor-pointer rounded border-zinc-300 accent-green-800 focus:ring-green-800"
                    />

                    <label htmlFor="remember" className="text-sm cursor-pointer text-zinc-600">
                        Remember me
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                >
                    {
                        pending ? "Logging in..." : "Login"
                    }
                    <ArrowRight size={17} />
                </button>
            </form>
        </>
    );
};

export default LoginForm;