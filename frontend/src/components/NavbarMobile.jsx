"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavbarMobile = ({ navLinks }) => {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const tl = useRef(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(".bar-1", { rotate: 45, duration: 0.2, ease: "power1.inOut" }, 0)
        .to(".bar-2", { opacity: 0, duration: 0.2 }, 0)
        .to(".bar-3", { rotate: -45, duration: 0.2, ease: "power1.inOut" }, 0)
        .to(".side-menu", { x: 0, duration: 0.3, ease: "power2.inOut" }, 0)
        .fromTo(
          ".nav-link",
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.15",
        );
    },
    { scope: container },
  );

  useGSAP(() => {
    if (open) tl.current.play();
    else tl.current.reverse();
  }, [open]);

  return (
    <div className="" ref={container}>
      {/* Hamburger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-7 z-50 relative lg:hidden aspect-square flex flex-col justify-around"
      >
        <div className="bar-1 bg-white origin-left w-full h-0.5 rounded-full" />
        <div className="bar-2 bg-white origin-left w-full h-0.5 rounded-full" />
        <div className="bar-3 bg-white origin-left w-full h-0.5 rounded-full" />
      </button>

      {/* Slide-in menu */}
      <div
        className="side-menu lg:hidden fixed h-screen w-screen bg-background z-40 top-0 left-0 flex flex-col"
        style={{ transform: "translateX(-100%)" }}
      >
        {/* Header area — matches hamburger position */}
        <div className="flex items-end justify-center px-6 py-8">
          <span className="text-sm font-semibold font-poppins text-textPrimary/50 uppercase tracking-widest">
            Menu
          </span>
        </div>

        <div className="mx-6 h-px bg-outline/50 mb-8" />

        {/* Links */}
        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setOpen(false)}
                className={`nav-link flex items-center justify-between px-4 py-3.5 rounded-2xl font-poppins text-base font-medium transition-colors duration-150 group
                  ${
                    isActive
                      ? "bg-white/8 border border-outline text-textPrimary/90"
                      : "text-textPrimary/50 hover:text-textPrimary/80 hover:bg-white/4"
                  }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom divider + index */}
        <div className="mt-auto px-6 pb-10 flex flex-col gap-4">
          <div className="h-px bg-outline/50" />
          <div className="flex self-center items-center gap-2">
            <div className="w-9 aspect-square relative">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/70">
              Finova
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
