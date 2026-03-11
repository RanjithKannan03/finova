"use client";

import React, { useState, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const TransactionRow = ({ tx }) => {
  const [expanded, setExpanded] = useState(false);
  const d = new Date(tx.created_at);

  const CATEGORIES = {
    GR: { label: "Groceries", color: "rgba(52,211,153,0.9)" },
    CS: { label: "Cleaning Supplies", color: "rgba(99,102,241,0.9)" },
    HE: { label: "Home Essentials", color: "rgba(251,191,36,0.9)" },
  };

  const containerRef = useRef(null);
  const dropRef = useRef(null);
  const iconRef = useRef(null);

  useGSAP(
    () => {
      // Changed 'open' to 'expanded' to match your state variable
      if (expanded) {
        // Animate IN
        gsap.to(dropRef.current, {
          height: "auto",
          opacity: 1,
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
    // Updated dependency array to use 'expanded'
    { dependencies: [expanded], scope: containerRef },
  );

  return (
    <div
      className="relative flex flex-col rounded-xl border overflow-hidden cursor-pointer group transition-colors duration-150"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(57,57,63,0.6)",
      }}
      onClick={() => setExpanded((p) => !p)}
      ref={containerRef}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="flex items-center gap-3 px-4 py-2.5 relative z-10">
        <div className="w-7 aspect-square relative rounded-lg bg-white/6 border border-outline flex items-center justify-center shrink-0">
          <Image
            src={tx.created_by.profile_pic}
            alt="avatar"
            fill
            sizes="100"
            className="object-contain rounded-lg"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-medium text-textPrimary/80 truncate">
            {tx.created_by.first_name} {tx.created_by.last_name}
          </span>
          <span className="text-[10px] lg:text-xs text-textPrimary/30">
            @{tx.created_by.username} · {tx.items.length} item
            {tx.items.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex flex-col items-end shrink-0 gap-0.5">
          <span className="text-xs font-semibold text-textPrimary/80">
            £{parseFloat(tx.total_amount).toFixed(2)}
          </span>
          <span className="text-[10px] lg:text-xs text-textPrimary/30">
            {d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
          </span>
        </div>
        <div ref={iconRef}>
          <FaAngleDown className="text-textPrimary/30 shrink-0" />
        </div>
      </div>

      <div
        ref={dropRef}
        className="h-0 opacity-0 overflow-hidden relative z-10"
      >
        {/* The content wrapper holds the static padding and borders */}
        <div className="px-4 pb-3 pt-2 flex flex-col gap-1.5 border-t border-outline/40">
          {tx.items.map((item, i) => {
            const cat = CATEGORIES[item.category];
            return (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: cat?.color }}
                  />
                  <span className="text-[10px] lg:text-xs text-textPrimary/60">
                    {item.name}
                  </span>
                  <span className="text-[10px] lg:text-xs text-textPrimary/25">
                    × {item.units}
                  </span>
                </div>
                <span className="text-[10px] lg:text-xs font-medium text-textPrimary/50">
                  £{(parseFloat(item.price) * item.units).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
