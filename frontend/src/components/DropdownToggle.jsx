"use client";

import React, { useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DropdownToggle = ({ form, setForm }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const dropRef = useRef(null);
  const iconRef = useRef(null);

  useGSAP(
    () => {
      if (open) {
        // Animate IN
        gsap.to(dropRef.current, {
          height: "auto",
          opacity: 1,
          paddingTop: 2,
          duration: 0.3,
          ease: "power2.out",
        });
        // Rotate the arrow up
        gsap.to(iconRef.current, { rotation: 180, duration: 0.3 });
      } else {
        // Animate OUT
        gsap.to(dropRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        // Rotate the arrow back down
        gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
      }
    },
    // The dependency array tells GSAP to run this hook whenever 'open' changes
    { dependencies: [open], scope: containerRef },
  );

  return (
    <div
      className="w-full absolute z-20 shadow-2xl drop-shadow-2xl"
      ref={containerRef}
    >
      <div className="px-3 flex flex-col w-full bg-foreground card items-center rounded-2xl font-poppins">
        <div className="flex text-sm md:text-base  items-center w-full justify-between ">
          <p>{form}</p>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-1 rounded-full hover:highlight cursor-pointer"
          >
            {/* Wrapped the icon in a div with a ref so we can rotate it */}
            <div ref={iconRef}>
              <MdKeyboardArrowDown className="text-xl" />
            </div>
          </button>
        </div>

        <div
          ref={dropRef}
          className={`flex flex-col gap-2 border-t border-white/20 text-sm w-full items-center-safe overflow-hidden h-0 opacity-0 ${open ? "pb-2" : "pb-0"}`}
        >
          <button
            onClick={() => {
              setForm("Join Flat");
              setOpen(false);
            }}
            className="relative cursor-pointer rounded-2xl py-1 px-2 overflow-hidden group"
          >
            {/* spotlight */}
            <span className="absolute inset-0 bg-white opacity-0 rounded-2xl blur-3xl transition-opacity duration-300 group-hover:opacity-100"></span>
            {/* text */}
            <span className="relative z-10">Join Flat</span>
          </button>
          <button
            onClick={() => {
              setForm("Create Flat");
              setOpen(false);
            }}
            className="relative cursor-pointer rounded-2xl py-1 px-2 overflow-hidden group"
          >
            {/* spotlight */}
            <span className="absolute inset-0 bg-white opacity-0 rounded-2xl blur-3xl transition-opacity duration-300 group-hover:opacity-100"></span>
            {/* text */}
            <span className="relative z-10">Create Flat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownToggle;
