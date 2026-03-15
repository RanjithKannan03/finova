"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import Loading from "./Loading";

const AuthFormSubmitButton = ({ text }) => {
  const status = useFormStatus();

  return (
    <button
      id="login-btn"
      type="submit"
      disabled={status.pending}
      className="relative w-full px-4 py-2.5 rounded-xl text-sm font-medium bg-white/8 border border-outline text-textPrimary/70 hover:bg-white/12 hover:text-textPrimary/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {status.pending ? (
        <>
          <span className="opacity-0">{text}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading />
          </div>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default AuthFormSubmitButton;
