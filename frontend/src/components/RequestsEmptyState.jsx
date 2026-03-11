import React from "react";

const RequestsEmptyState = ({ filter, STATUS_MAP }) => (
  <div className="flex flex-col items-center gap-3 py-16">
    <div className="w-12 h-12 rounded-xl bg-white/4 border border-outline flex items-center justify-center">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
      >
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
      </svg>
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-textPrimary/50">
        No requests found
      </p>
      <p className="text-xs text-textPrimary/25 mt-0.5">
        {filter === "ALL"
          ? "No requests have been made yet"
          : `No ${STATUS_MAP[filter]?.label.toLowerCase()} requests`}
      </p>
    </div>
  </div>
);

export default RequestsEmptyState;
