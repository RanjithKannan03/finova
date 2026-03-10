"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Dropdown = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = React.useRef(null);
  const dropRef = React.useRef(null);
  const iconRef = React.useRef(null);

  useGSAP(
    () => {
      if (open) {
        gsap.to(dropRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(iconRef.current, { rotation: 180, duration: 0.25 });
      } else {
        gsap.to(dropRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        });
        gsap.to(iconRef.current, { rotation: 0, duration: 0.25 });
      }
    },
    { dependencies: [open], scope: containerRef },
  );

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      ref={containerRef}
      className="relative font-poppins"
      style={{ zIndex: open ? 50 : 10 }} // elevate the whole container when open
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-outline
                   text-xs text-textPrimary/70 hover:bg-white/8 transition-all duration-150 whitespace-nowrap"
      >
        {selected?.label ?? value}
        <div ref={iconRef}>
          <MdKeyboardArrowDown className="text-sm text-textPrimary/40" />
        </div>
      </button>
      <div
        ref={dropRef}
        className="absolute top-full left-0 mt-1 min-w-full bg-foreground border border-outline rounded-xl overflow-hidden h-0 opacity-0 shadow-xl"
      >
        <div className="flex flex-col py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 text-xs text-left transition-colors duration-100 hover:bg-white/6
                ${opt.value === value ? "text-textPrimary/90" : "text-textPrimary/50"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
