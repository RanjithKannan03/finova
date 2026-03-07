"use client";
import React, { useRef, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { joinFlat } from "@/actions/flat-actions";
import { flatStore } from "@/zustand/store";
import { redirect } from "next/navigation";

const JoinFlatForm = () => {
  const inputs = useRef([]);

  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const res = await joinFlat(prev, formData);

      if (res?.success) {
        flatStore.getState().setFlat(res.flat);
        redirect("/");
      }
      return res;
    },
    {
      error: null,
    },
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
    <div className="w-full flex flex-col items-center bg-foreground card gap-10 px-6 py-10 font-poppins">
      <span className="text-center text-3xl font-medium">Join A Flat</span>

      <div className="w-full h-fit flex flex-col gap-6 items-center">
        {state.error && (
          <span className="text-red-400 text-sm">{state.error}</span>
        )}

        <form
          action={formAction}
          className="flex flex-col items-center gap-6 w-[70%]"
          autoComplete="off"
        >
          <div className="flex items-center w-full justify-evenly gap-3">
            {[1, 2, 3, 4].map((i, index) => (
              <input
                key={i}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                name={`code-${i}`}
                maxLength={1}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl drop-shadow-2xl shadow-2xl border uppercase border-white/40 rounded-md bg-transparent focus:outline-none focus:ring-1 focus:ring-white"
              />
            ))}
          </div>

          <SubmitButton isPending={isPending} text="Join Flat" />
        </form>
      </div>
    </div>
  );
};

export default JoinFlatForm;
