"use client";

import React, { useState, useActionState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import AuthFormSubmitButton from "./AuthFormSubmitButton";
import { login } from "@/actions/auth-actions";
import Image from "next/image";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, { error: null });

  return (
    <div className="flex w-full md:w-[50%] lg:w-[40%] xl:w-[30%] flex-col gap-6 p-6 font-poppins">
      {/* Brand */}
      <div className="flex flex-col items-center gap-1 mb-2">
        <span className="text-xs uppercase tracking-[0.3em] text-textPrimary/60">
          Welcome to
        </span>
        <div className="flex items-end gap-2">
          <div className="w-14 aspect-square relative">
            <Image
              src="/logo.png"
              fill
              sizes="100"
              alt="logo"
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-textPrimary/90 md:text-5xl">
            Finova
          </h1>
        </div>

        <span className="text-xs text-textPrimary/60 mt-1">
          Sign in to your account
        </span>
      </div>

      {/* Card */}
      <div className="relative card px-6 py-7 flex flex-col gap-5 overflow-hidden">
        {/* Error */}
        {state.error && (
          <div
            className="px-3 py-2 rounded-xl border text-xs text-red-400/80"
            style={{
              background: "rgba(239,68,68,0.06)",
              borderColor: "rgba(239,68,68,0.2)",
            }}
          >
            {state.error}
          </div>
        )}

        <form className="flex flex-col gap-4" action={formAction}>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-textPrimary/60">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="you@email.com"
              className="w-full bg-white/4 border border-outline rounded-xl px-4 py-2.5 text-sm text-textPrimary/80 placeholder:text-textPrimary/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] transition-all duration-150"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-textPrimary/60">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
                placeholder="••••••••"
                className="w-full bg-white/4 border border-outline rounded-xl px-4 pr-11 py-2.5 text-sm text-textPrimary/80 placeholder:text-textPrimary/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] transition-all duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textPrimary/60 hover:text-textPrimary/60 transition-colors duration-150"
              >
                {showPassword ? <IoEye size={18} /> : <IoEyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-1">
            <AuthFormSubmitButton text="Sign In" />
          </div>
        </form>

        <div className="w-full h-px bg-outline/50" />

        <p className="text-xs text-center text-textPrimary/60">
          New to Finova?{" "}
          <Link
            href="/register"
            className="font-medium text-textPrimary/60 hover:text-textPrimary/90 transition-colors duration-150"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
