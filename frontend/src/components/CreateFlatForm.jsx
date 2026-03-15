"use client";

import React, { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createFlat } from "@/actions/flat-actions";
import { redirect } from "next/navigation";
import { useFlatStore } from "@/zustand/store";

const CreateFlatForm = () => {
  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const res = await createFlat(prev, formData);
      if (res?.success) {
        useFlatStore.getState().setFlat(res.flat);
        redirect("/");
      }
      return res;
    },
    { error: null },
  );

  return (
    <div className="relative w-full flex flex-col items-center card gap-6 px-5 py-8 font-poppins overflow-hidden md:gap-8 md:px-8 md:py-10">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/60">
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
        {/* Flat Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-textPrimary/60">
            Flat Name
          </label>
          <input
            type="text"
            name="flatName"
            placeholder="My Flat"
            className="w-full bg-white/4 border border-outline rounded-xl px-4 py-2.5 text-sm text-textPrimary/80 placeholder:text-textPrimary/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] transition-all duration-150"
          />
        </div>

        {/* Initial Budget */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-textPrimary/60">
            Initial Budget
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-textPrimary/60 pointer-events-none">
              £
            </span>
            <input
              type="number"
              name="budget"
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full bg-white/4 border border-outline rounded-xl pl-8 pr-4 py-2.5 text-sm text-textPrimary/80 placeholder:text-textPrimary/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] transition-all duration-150"
            />
          </div>
        </div>

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
