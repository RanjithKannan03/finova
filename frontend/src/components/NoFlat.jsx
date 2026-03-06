import React from "react";
import FlatForm from "./FlatForm";

const NoFlat = () => {
  return (
    <div className="flex w-full gap-4 h-full font-poppins flex-col items-center">
      <h1 className="text-4xl font-medium">
        You&apos;re not part of any flat yet.
      </h1>
      <p className="text-xl font-extralight text-white/75">
        Join one or create a new flat to continue.
      </p>

      <div className="w-[40%]">
        <FlatForm />
      </div>
    </div>
  );
};

export default NoFlat;
