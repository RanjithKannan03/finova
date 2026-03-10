import React from "react";

const SkeletonBlock = ({ className }) => (
  <div className={`rounded-lg bg-white/5 animate-pulse ${className}`} />
);

export default SkeletonBlock;
