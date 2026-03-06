"use client";

import React, { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { createFlat } from "@/actions/flat-actions";
import { redirect, useRouter } from "next/navigation";
import { flatStore } from "@/zustand/store";

const CreateFlatForm = () => {
  const router = useRouter();
  //   const [state, formAction, isPending] = useActionState(createFlat, {
  //     error: null,
  //   });

  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const res = await createFlat(prev, formData);

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
  return (
    <div className="w-full flex flex-col items-center bg-foregorund card gap-10 px-6 py-10 font-poppins">
      <span className="text-center text-3xl font-medium">Create Your Flat</span>

      <form
        className="flex flex-col gap-6 w-[70%]"
        action={formAction}
        autoComplete="off"
      >
        <div className="relative items-center w-full px-2 py-1 border drop-shadow-2xl shadow-2xl border-white/40 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="text"
            id="floating_outlined_flatName"
            name="flatName"
            className="peer w-full appearance-none focus:outline-none bg-transparent px-2.5 pb-2.5 pt-4 focus:outline-0 "
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_flatName"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-5 scale-75 transform bg-foregorund px-2  text-white/75 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-80 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-white/75 peer-focus:text-white peer-focus:bg-foregorund"
          >
            Flat Name
          </label>
        </div>

        <div className="relative items-center w-full px-2 py-1 border drop-shadow-2xl shadow-2xl border-white/40 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
          <input
            type="number"
            id="floating_outlined_budget"
            name="budget"
            className="peer w-full appearance-none focus:outline-none bg-transparent px-2.5 pb-2.5 pt-4 focus:outline-0 "
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined_budget"
            className="absolute inset-s-1 top-2 z-10 origin-left -translate-y-5 scale-75 transform bg-foregorund px-2  text-white/75 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-80 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  dark:text-white/75 peer-focus:text-white peer-focus:bg-foregorund"
          >
            Initial Budget
          </label>
        </div>

        <SubmitButton isPending={isPending} text="Submit" />
      </form>
    </div>
  );
};

export default CreateFlatForm;
