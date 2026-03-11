import React from "react";
import { fmt } from "@/lib/date-helpers";

const VoteRow = ({ vote, VOTE_MAP }) => {
  const meta = VOTE_MAP[vote.choice];
  return (
    <div
      className="relative flex items-center gap-3 px-3 py-2 rounded-xl border group transition-colors duration-150"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(57,57,63,0.6)",
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="w-6 h-6 rounded-lg bg-white/6 border border-outline flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-textPrimary/50 uppercase">
          {vote.cast_by.username[0]}
        </span>
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs font-medium text-textPrimary/75 truncate">
          @{vote.cast_by.username}
        </span>
        <span className="text-xs text-textPrimary/30">{fmt(vote.cast_on)}</span>
      </div>
      <span
        className="text-xs font-semibold shrink-0"
        style={{ color: meta?.color }}
      >
        {meta?.label ?? vote.choice}
      </span>
    </div>
  );
};

export default VoteRow;
