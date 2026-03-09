"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProgressBar = ({ pct, total, color }) => {
  const barRef = useRef(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      width: `${pct}%`,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [pct]);

  return (
    <div
      ref={barRef}
      className="h-full rounded-full"
      style={{
        width: "0%", // Let GSAP handle the width updates
        background: color,
        boxShadow: total > 0 ? `0 0 6px ${color}` : "none",
      }}
    />
  );
};

export default ProgressBar;
