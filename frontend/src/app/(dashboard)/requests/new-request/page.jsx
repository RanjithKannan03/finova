import NewRequestForm from "@/components/NewRequestForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex justify-center px-4 md:px-8 lg:px-20 xl:px-32 pt-5 md:pt-8 lg:pt-10 xl:pt-16">
      <div className="w-full md:w-[80%] md:pt-10 xl:pt-0 xl:w-[40%]">
        <NewRequestForm />
      </div>
    </div>
  );
};

export default page;
