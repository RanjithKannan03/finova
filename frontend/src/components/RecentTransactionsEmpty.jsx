import React from "react";

const RecentTransactionsEmpty = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-4">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center 
                        bg-white/[0.03] border border-outline"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-textPrimary/25"
          >
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-textPrimary/40" />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-textPrimary/55">
          No transactions yet
        </p>
        <p className="text-xs mt-1 text-textPrimary/25">
          Your activity will appear here
        </p>
      </div>

      <button
        className="mt-1 px-5 py-2 rounded-xl text-xs font-medium transition-all duration-200 
                         bg-white/[0.06] border border-outline hover:bg-white/10 
                         active:scale-95 text-textPrimary/60"
      >
        + Add transaction
      </button>
    </div>
  );
};

export default RecentTransactionsEmpty;
