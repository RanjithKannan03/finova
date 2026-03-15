"use client";
import React, { useRef, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { joinFlat } from "@/actions/flat-actions";
import { useFlatStore } from "@/zustand/store";
import { redirect } from "next/navigation";

const JoinFlatForm = () => {
  const inputs = useRef([]);

  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const res = await joinFlat(prev, formData);
      if (res?.success) {
        useFlatStore.getState().setFlat(res.flat);
        redirect("/");
      }
      return res;
    },
    { error: null },
  );

  const handleInput = (e, index) => {
    if (e.target.value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center card gap-6 px-5 py-8 font-poppins overflow-hidden md:gap-8 md:px-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
          Invite Code
        </p>
        <h1 className="text-2xl font-semibold text-textPrimary/90 md:text-3xl">
          Join a Flat
        </h1>
      </div>

      <form
        action={formAction}
        className="flex flex-col items-center gap-5 w-full md:gap-6"
        autoComplete="off"
      >
        {/* Code inputs */}
        <div className="flex items-center gap-2 md:gap-3">
          {[1, 2, 3, 4].map((i, index) => (
            <input
              key={i}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              name={`code-${i}`}
              maxLength={1}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl font-semibold uppercase rounded-xl
                     bg-white/4 border border-outline
                     text-textPrimary/80 caret-white/50
                     transition-all duration-150
                     focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                     focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]
                     md:w-12 md:h-12 md:text-lg"
            />
          ))}
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 w-full px-2">
          <div className="flex-1 h-px bg-outline/60" />
          <span className="text-xs text-textPrimary/20 uppercase tracking-widest md:text-sm">
            enter code
          </span>
          <div className="flex-1 h-px bg-outline/60" />
        </div>

        {/* Error */}
        {state.error && (
          <span className="text-red-400/80 text-xs -mt-2">{state.error}</span>
        )}

        <SubmitButton isPending={isPending} text="Join Flat" />
      </form>
    </div>
  );
};

export default JoinFlatForm;
