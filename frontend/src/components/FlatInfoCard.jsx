"use client";

import React, { useState, useEffect } from "react";
import { flatStore } from "@/zustand/store";
import Image from "next/image";
import FlatInfoCardSkeleton from "./FlatInfoCardSkeleton";

const FlatInfoCard = () => {
  const [flat, setFlat] = useState(null);

  useEffect(() => {
    const f = flatStore.getState().flat;
    setFlat(f);

    const unsub = flatStore.subscribe((state) => setFlat(state.flat));
    return () => unsub();
  }, []);

  const maxResidents = 5;
  const slots = Array.from({ length: maxResidents - 1 });

  if (!flat) return <FlatInfoCardSkeleton />;

  return (
    <div className="relative w-full md:w-1/2 xl:w-full card font-poppins overflow-y-auto px-6 py-6 flex flex-col gap-4 xl:h-[55%]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
            Your Flat
          </p>
          <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
            {flat.name}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] uppercase tracking-[0.15em] text-textPrimary/30">
            Join Code
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-outline">
            <span className="text-base font-mono font-semibold tracking-[0.25em] text-textPrimary/80">
              {flat.joinCode}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(flat.joinCode)}
              className="text-textPrimary/30 hover:text-textPrimary/70 cursor-pointer transition-colors duration-150"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-outline/50" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Residents",
            value: `${flat.numResidents} / ${maxResidents}`,
          },
          { label: "Status", value: flat.isFull ? "Full" : "Open" },
          { label: "Spaces Left", value: maxResidents - flat.numResidents },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-0.5 px-3 py-2 rounded-xl bg-white/5 border border-outline/60"
          >
            <p className="text-[10px] uppercase tracking-wider text-textPrimary/30">
              {label}
            </p>
            <p className="text-sm font-semibold text-textPrimary/80">{value}</p>
          </div>
        ))}
      </div>

      {/* Flatmates */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.15em] text-textPrimary/30">
          Flatmates
        </p>
        <div className="flex flex-col gap-1.5">
          {slots.map((_, i) => {
            const mate = flat.flatmates[i];
            return (
              <div
                key={i}
                className="relative flex items-center gap-3 px-3 py-2 rounded-xl overflow-hidden border transition-colors duration-150 group cursor-default"
                style={{
                  background: mate
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.01)",
                  borderColor: mate
                    ? "rgba(57,57,63,0.8)"
                    : "rgba(57,57,63,0.3)",
                }}
              >
                {mate && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  />
                )}
                {mate ? (
                  <>
                    <div className="w-6 relative aspect-square rounded-lg bg-white/[0.07] border border-outline flex items-center justify-center shrink-0">
                      {/* <span className="text-[10px] font-semibold text-textPrimary/60 uppercase">
                        {mate.username[0]}
                      </span> */}
                      <Image
                        src={mate.profile_pic}
                        className="object-contain rounded-lg"
                        fill
                        sizes="100"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-textPrimary/80 truncate">
                        {mate.username}
                      </span>
                      <span className="text-[10px] text-textPrimary/60 truncate">
                        {mate.email}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg border border-dashed border-outline/40 flex items-center justify-center">
                      <span className="text-textPrimary/15 text-xs">+</span>
                    </div>
                    <span className="text-xs text-textPrimary/20">
                      Empty slot
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlatInfoCard;
