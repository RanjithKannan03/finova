import React from "react";

const ChartSkeleton = () => (
  <div className="flex items-end gap-3 h-65 w-full px-2">
    {[40, 70, 55, 90, 45, 80, 60].map((h, i) => (
      <div
        key={i}
        className="flex-1 rounded-t-lg bg-white/5 animate-pulse"
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

export default ChartSkeleton;
