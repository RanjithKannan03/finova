import React from "react";
import FlatForm from "./FlatForm";

const NoFlat = () => {
  return (
    <div className="flex w-full gap-4 h-full font-poppins flex-col items-center px-4 md:px-0 md:pt-10 xl:pt-0">
      <h1 className="text-xl text-center font-medium md:text-3xl lg:text-5xl xl:text-5xl">
        You&apos;re not part of any flat yet.
      </h1>
      <p className="text-sm text-center font-extralight text-white/75 md:text-lg lg:text-xl">
        Join one or create a new flat to continue.
      </p>

      <div className="w-full md:w-[80%] md:pt-10 xl:pt-0 xl:w-[40%]">
        <FlatForm />
      </div>
    </div>
  );
};

export default NoFlat;
