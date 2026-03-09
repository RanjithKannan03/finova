"use client";

import React, { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createFlat } from "@/actions/flat-actions";
import { redirect } from "next/navigation";
import { flatStore } from "@/zustand/store";

const FloatingInput = ({ id, name, type = "text", label }) => (
  <div className="relative w-full group">
    <input
      type={type}
      id={id}
      name={name}
      className="peer w-full bg-white/4 border border-outline rounded-xl
                 px-4 pb-2.5 pt-5 text-sm text-textPrimary/80
                 transition-all duration-150
                 focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]
                 placeholder-transparent"
      placeholder=" "
    />
    <label
      htmlFor={id}
      className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-5 scale-75 transform  px-2  text-white/75 tracking-wider duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-80 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-white/75 peer-focus:text-white "
    >
      {label}
    </label>
  </div>
);

const CreateFlatForm = () => {
  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const res = await createFlat(prev, formData);
      if (res?.success) {
        flatStore.getState().setFlat(res.flat);
        redirect("/");
      }
      return res;
    },
    { error: null },
  );

  return (
    <div className="relative w-full flex flex-col items-center card gap-6 px-5 py-8 font-poppins overflow-hidden md:gap-8 md:px-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
          New Flat
        </p>
        <h1 className="text-2xl font-semibold text-textPrimary/90 md:text-3xl">
          Create Your Flat
        </h1>
      </div>

      <form
        className="flex flex-col gap-4 w-full md:w-[70%]"
        action={formAction}
        autoComplete="off"
      >
        <FloatingInput id="flatName" name="flatName" label="Flat Name" />
        <FloatingInput
          id="budget"
          name="budget"
          type="number"
          label="Initial Budget"
        />

        {state.error && (
          <span className="text-red-400/80 text-xs text-center">
            {state.error}
          </span>
        )}

        <div className="pt-2">
          <SubmitButton isPending={isPending} text="Create Flat" />
        </div>
      </form>
    </div>
  );
};

export default CreateFlatForm;
