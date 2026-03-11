import React from "react";
import SkeletonBlock from "./SkeletonBlock";

const FlatInfoCardSkeleton = () => (
  <div className="relative w-full card font-poppins px-6 py-6 flex flex-col gap-4 h-[67vh]">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-2.5 w-14" />
        <SkeletonBlock className="h-5 w-24" />
      </div>
      <SkeletonBlock className="h-8 w-20 rounded-xl" />
    </div>

    <div className="w-full h-px bg-outline/50" />

    {/* Stats */}
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-outline/60"
        >
          <SkeletonBlock className="h-2 w-10" />
          <SkeletonBlock className="h-4 w-8" />
        </div>
      ))}
    </div>

    {/* Flatmates */}
    <div className="flex flex-col gap-2">
      <SkeletonBlock className="h-2.5 w-16" />
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2 rounded-xl border"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(57,57,63,0.3)",
            }}
          >
            <SkeletonBlock className="w-6 h-6 shrink-0 rounded-lg" />
            <div className="flex flex-col gap-1 flex-1">
              <SkeletonBlock className="h-2.5 w-20" />
              <SkeletonBlock className="h-2 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FlatInfoCardSkeleton;
