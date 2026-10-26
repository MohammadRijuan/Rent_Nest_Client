"use client";

import Link from "next/link";
import LoginForm from "../_components/loginForm";

const LoginPage = () => {
  return (
    <div className="w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Welcome back
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <LoginForm/>

      {/* Register Link */}
      <p className="mt-7 text-center text-sm text-zinc-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-green-800 hover:text-green-950"
        >
          Create an account
        </Link>
      </p>

      {/* Back to Home */}
      <div className="mt-8 border-t border-zinc-200 pt-5 text-center">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition hover:text-green-800"
        >
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;