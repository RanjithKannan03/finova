"use client";

import React, { useState, useActionState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { useFormState } from "react-dom";
import AuthFormSubmitButton from "./AuthFormSubmitButton";
import { login } from "@/actions/auth-actions";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, { error: null });
  return (
    <div className="flex w-full lg:w-[40%] xl:w-[30%] flex-col gap-4 p-4 text-white font-poppins relative">
      <span className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
        Login
      </span>

      {state.error && (
        <span className="w-full text-sm text-red-400 font-extralight">
          {state.error}
        </span>
      )}

      <span className="">
        New User?{" "}
        <span className="bg-linear-to-r from-[#AA15A2] to-[#a60de7] bg-clip-text">
          <Link className="text-transparent" href={"/register"}>
            Create an account
          </Link>
        </span>
      </span>

      <form className="flex flex-col gap-4" action={formAction}>
        <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="text"
            id="floating_outlined_email"
            name="email"
            className="peer w-full appearance-none focus:outline-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:outline-0 "
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_email"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400 peer-focus:text-white peer-focus:bg-black"
          >
            Email
          </label>
        </div>

        <div className="relative flex items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            autoComplete="off"
            id="floating_outlined_pass"
            className="peer flex-1 appearance-none focus:outline-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:outline-0 "
            placeholder=" "
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => {
                return !prev;
              });
            }}
          >
            {showPassword ? <IoEye size={25} /> : <IoEyeOff size={25} />}
          </button>
          <label
            htmlFor="floating_outlined_pass"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 bg-black scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:bg-black"
          >
            Password
          </label>
        </div>

        <AuthFormSubmitButton text="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
