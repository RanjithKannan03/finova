import React from "react";

export const RecentTransactionsNotEmpty = ({ transactions }) => {
  const fmt = (iso) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      time: d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };
  return (
    <>
      <div className="grid grid-cols-3 px-1">
        <span className="text-sm uppercase tracking-wider text-textPrimary">
          Date
        </span>
        <span className="text-sm uppercase tracking-wider text-textPrimary text-center">
          User
        </span>
        <span className="text-sm uppercase tracking-wider text-textPrimary text-right">
          Amount
        </span>
      </div>

      <div className="w-full h-px bg-outline" />

      {/* Transaction rows */}
      <div className="grid grid-rows-10 gap-2 flex-1 overflow-hidden">
        {transactions.map((tx, i) => {
          const { date, time } = fmt(tx.created_at);
          const amount = parseFloat(tx.total_amount);
          return (
            <div
              key={i}
              className="grid relative cursor-pointer grid-cols-3 items-center px-2  rounded-xl transition-colors duration-150 group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
                }}
              />
              {/* Date + time */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-textPrimary/80">
                  {date}
                </span>
                <span className="text-xs text-textPrimary/30">{time}</span>
              </div>

              {/* User pill */}
              <div className="flex justify-center">
                <span className="text-sm px-2 py-0.5 rounded-full bg-white/[0.06] border border-outline text-textPrimary/50 truncate max-w-[80px]">
                  {tx.created_by}
                </span>
              </div>

              {/* Amount */}
              <div className="flex flex-col items-end">
                <span className={`text-sm font-semibold text-emerald-400/80`}>
                  £{amount.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
