"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";
import RegisterForm from "../_components/registerForm";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Create an account
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Join RentNest and find a place that feels like home.
        </p>
      </div>

      <RegisterForm/>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-green-800 hover:text-green-950"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;