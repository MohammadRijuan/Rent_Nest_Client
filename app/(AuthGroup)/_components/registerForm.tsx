"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    UserRound,
    Mail,
    LockKeyhole,
    ArrowRight,
} from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { RegisterAction } from "../_actions/authActions";
import { toast } from "sonner";



const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // optional but best practice
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    // main part
    const [state, action, pending] = useActionState(RegisterAction.bind(null, redirectTo),false)

    useEffect(() => {
        if (!state || !state.message) return;

        if (state.success) {
            toast.success("Registration successful");
            redirect("/login")
        } else {
            toast.error(state.message || "Registration failed... check your password again");
        }
    }, [state]);

    return (
        <>
            <form action={action} className="mt-7 space-y-4">
                {/* Full Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Full name
                    </label>

                    <div className="relative">
                        <UserRound
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            required
                            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                        />
                    </div>
                </div>

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
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            minLength={6}
                            required
                            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-12 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Confirm password
                    </label>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            minLength={6}
                            required
                            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-12 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-800 focus:ring-2 focus:ring-green-800/10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={
                                showConfirmPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>



                {/* Submit */}
                <button
                    type="submit"
                    className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                >
                    {
                        pending ? "Creating a new account" : "Register"
                    }
                    <ArrowRight size={17} />
                </button>
            </form>
        </>
    );
};

export default RegisterForm;