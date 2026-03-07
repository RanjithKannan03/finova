"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { flatStore } from "@/zustand/store";

gsap.registerPlugin(Flip);

const NavLinks = ({ navLinks }) => {
  const path = usePathname();
  const highlightRef = useRef(null);
  const linksRef = useRef([]);

  const isFirstRender = useRef(true);

  const [flat, setFlat] = useState(null);

  useEffect(() => {
    const f = flatStore.getState().flat;
    setFlat(f);
  });

  // useGSAP(() => {
  //   const activeIndex = navLinks.findIndex((link) => link.url === path);
  //   const targetLink = linksRef.current[activeIndex];

  //   if (!highlightRef || !targetLink) {
  //     return;
  //   }

  //   const state = Flip.getState(highlightRef.current);

  //   targetLink.appendChild(highlightRef.current);
  //   console.log(targetLink);
  //   Flip.from(state, {
  //     duration: 0.5,
  //     ease: "power1.out",
  //   });
  // }, [path]);

  // useGSAP(() => {
  //   const activeIndex = navLinks.findIndex((link) => link.url === path);
  //   const targetLink = linksRef.current[activeIndex];

  //   if (!highlightRef.current || !targetLink) return;

  //   const state = Flip.getState(highlightRef.current);

  //   targetLink.appendChild(highlightRef.current);
  //   gsap.set(highlightRef.current, { opacity: 1 });
  //   Flip.from(state, {
  //     duration: 0.4,
  //     ease: "power2.out",
  //     absolute: true,
  //   });
  // }, [path]);

  useGSAP(() => {
    const activeIndex = navLinks.findIndex((link) => link.url === path);
    const targetLink = linksRef.current[activeIndex];

    if (!highlightRef.current || !targetLink) return;

    if (isFirstRender.current) {
      // place instantly with no animation
      gsap.set(highlightRef.current, { clearProps: "all" });
      targetLink.appendChild(highlightRef.current);
      isFirstRender.current = false;
      gsap.set(highlightRef.current, { opacity: 1 });
      return;
    }

    const state = Flip.getState(highlightRef.current);

    targetLink.appendChild(highlightRef.current);
    gsap.set(highlightRef.current, { opacity: 1 });

    Flip.from(state, {
      duration: 0.4,
      ease: "power2.out",
      absolute: true,
    });
  }, [path]);

  return (
    <div className="flex rounded-full shadow-2xl drop-shadow-2xl bg-foreground px-8 border border-outline gap-5 py-2 font-poppins items-center">
      <div
        ref={highlightRef}
        className="absolute inset-0 w-full h-full z-[-99] rounded-full nav-pill opacity-0"
      />
      {navLinks.map((link, index) => {
        return (
          <Link
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            key={link.name}
            href={link.url}
            className={`${path == link.url ? "font-medium" : "font-normal"} relative px-4 py-1`}
          >
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
