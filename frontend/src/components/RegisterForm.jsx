"use client";

import React, { useState, useActionState } from "react";
import Link from "next/link";
import AuthFormSubmitButton from "@/components/AuthFormSubmitButton";
// import { useFormState } from "react-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { register } from "@/actions/auth-actions";

const RegisterForm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [state, formAction, isPending] = useActionState(register, {
    error: null,
  });

  return (
    <div className="flex w-full lg:w-[40%] xl:w-[30%] flex-col gap-4 p-4 text-white font-montserrat">
      <span className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
        Welcome
      </span>

      {state.error && (
        <span className="w-full text-sm text-red-400 font-extralight">
          {state.error}
        </span>
      )}

      <span className="">
        Already have an account?
        <span className="bg-linear-to-r from-[#AA15A2] to-[#a60de7] bg-clip-text">
          <Link className="text-transparent " href={"/login"}>
            Sign in
          </Link>
        </span>
      </span>

      <form className="flex flex-col gap-4" action={formAction}>
        <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="text"
            id="floating_outlined_email"
            name="email"
            className="peer w-full focus:outline-none appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:outline-0 dark:text-white"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_email"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black  px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400  peer-focus:bg-black"
          >
            Email
          </label>
        </div>

        <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="text"
            id="floating_outlined_username"
            name="username"
            className="peer w-full focus:outline-none appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:outline-0 dark:text-white"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_username"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black  px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400  peer-focus:bg-black"
          >
            Username
          </label>
        </div>

        {/* <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="text"
            id="floating_outlined_username"
            name="firstname"
            className="peer w-full focus:outline-none appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:outline-0 dark:text-white"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_username"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black  px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400  peer-focus:bg-black"
          >
            Firstname
          </label>
        </div>

        <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="text"
            id="floating_outlined_username"
            name="lastname"
            className="peer w-full focus:outline-none appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:outline-0 dark:text-white"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_username"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black  px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400  peer-focus:bg-black"
          >
            Lastname
          </label>
        </div> */}

        <div className="relative flex items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type={`${showPassword1 ? "text" : "password"}`}
            name="password"
            autoComplete="off"
            id="floating_outlined_pass"
            className="peer flex-1 focus:outline-none appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:outline-0 dark:text-white"
            placeholder=" "
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword1((prev) => {
                return !prev;
              });
            }}
          >
            {showPassword1 ? <IoEye size={25} /> : <IoEyeOff size={25} />}
          </button>
          <label
            htmlFor="floating_outlined_pass"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black  px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400  peer-focus:bg-black"
          >
            Password
          </label>
        </div>

        <div className="relative flex items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type={`${showPassword2 ? "text" : "password"}`}
            name="confirmPassword"
            autoComplete="off"
            id="floating_outlined_pass_confirm"
            className="peer flex-1 focus:outline-none appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:outline-0 dark:text-white"
            placeholder=" "
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword2((prev) => {
                return !prev;
              });
            }}
          >
            {showPassword2 ? <IoEye size={25} /> : <IoEyeOff size={25} />}
          </button>
          <label
            htmlFor="floating_outlined_pass_confirm"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-black  px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-gray-400  peer-focus:bg-black"
          >
            Confirm Password
          </label>
        </div>

        <AuthFormSubmitButton text="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
