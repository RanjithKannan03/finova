import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full">
      <div
        className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent rounded-full text-white"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
