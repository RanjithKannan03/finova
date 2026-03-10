import React from "react";
import SkeletonBlock from "./SkeletonBlock";

const TransactionSkeleton = () => (
  <div className="flex flex-col gap-2">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
        style={{ borderColor: "rgba(57,57,63,0.4)" }}
      >
        <SkeletonBlock className="w-7 h-7 rounded-lg shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <SkeletonBlock className="h-2.5 w-28" />
          <SkeletonBlock className="h-2 w-20" />
        </div>
        <SkeletonBlock className="h-3 w-12" />
      </div>
    ))}
  </div>
);

export default TransactionSkeleton;
