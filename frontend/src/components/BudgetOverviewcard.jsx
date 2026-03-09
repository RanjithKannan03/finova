import { getCurrentMonthBudget } from "@/actions/budget-actions";
import React from "react";
import ProgressBar from "./ProgressBar";

const BudgetOverviewCard = async () => {
  const budget = await getCurrentMonthBudget();
  const categoryTotals = { GR: 0, CS: 0, HE: 0 };

  const CATEGORY_MAP = {
    GR: { label: "Groceries", color: "rgba(52,211,153,0.9)" },
    CS: { label: "Cleaning Supplies", color: "rgba(99,102,241,0.9)" },
    HE: { label: "Home Essentials", color: "rgba(251,191,36,0.9)" },
  };

  budget.transactions.forEach((tx) => {
    tx.items.forEach((item) => {
      if (categoryTotals[item.category] !== undefined) {
        categoryTotals[item.category] += parseFloat(item.price) * item.units;
      }
    });
  });

  const maxVal = Math.max(...Object.values(categoryTotals), 0.01);

  return (
    <div className="relative w-full md:w-1/2 xl:w-full card font-poppins px-6 py-6 flex flex-col gap-4 overflow-hidden flex-1">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
            Spending
          </p>
          <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
            By Category
          </h2>
        </div>
        <div className="px-3 py-1 rounded-xl bg-white/4 border border-outline">
          <span className="text-xs font-medium text-textPrimary/50">
            {new Date(0, budget.month - 1).toLocaleString("en", {
              month: "long",
            })}{" "}
            {budget.year}
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-outline/50" />

      {/* Category bars — flex-1 so they fill remaining height evenly */}
      <div className="flex flex-col flex-1 justify-evenly">
        {Object.entries(CATEGORY_MAP).map(([cat, { label, color }]) => {
          const total = categoryTotals[cat];
          const pct = (total / maxVal) * 100;
          return (
            <div key={cat} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <span className="text-xs text-textPrimary/60">{label}</span>
                </div>
                <span className="text-xs font-semibold text-textPrimary/70">
                  {total > 0 ? `£${total.toFixed(2)}` : "—"}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                {/* <div
                  className="h-full rounded-full transition-all duration-700 progress-bar"
                  style={{
                    width: `${pct}%`,
                    background: color,
                    boxShadow: total > 0 ? `0 0 6px ${color}` : "none",
                  }}
                /> */}
                <ProgressBar total={total} pct={pct} color={color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverviewCard;
