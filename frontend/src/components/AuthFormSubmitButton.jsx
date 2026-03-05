"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import Loading from "./Loading";

const AuthFormSubmitButton = ({ text }) => {
  const status = useFormStatus();
  return (
    <div className="w-full p-3 text-white text-xl font-light transition-all bg-linear-to-r from-[#AA15A2] to-[#800CB1] rounded-lg hover:font-normal">
      {status.pending ? (
        <div className="relative w-full">
          <span className="opacity-0">{text}</span>
          <Loading />
        </div>
      ) : (
        <button id="login-bth" className="w-full">
          {text}
        </button>
      )}
    </div>
  );
};

export default AuthFormSubmitButton;
