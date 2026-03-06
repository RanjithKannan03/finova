import React from "react";
import Loading from "./Loading";

const SubmitButton = ({ text, isPending }) => {
  return (
    <div className="w-full p-3 text-white text-xl transition-all card hover:highlight border-white/40 rounded-md shadow-2xl drop-shadow-2xl">
      {isPending ? (
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

export default SubmitButton;
