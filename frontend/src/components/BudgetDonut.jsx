import React from "react";
import BudgetDonutComponent from "./BudgetDonutComponent";
import { getCurrentMonthBudget } from "@/actions/budget-actions";

const BudgetDonut = async () => {
  //   const budget = {
  //     month: 3,
  //     year: 2026,
  //     amount: "40.00",
  //     total_available: 40.0,
  //     total_spent: 5.21,
  //     unspent: 34.79,
  //   };

  const budget = await getCurrentMonthBudget();
  const data = [
    { name: "Budget Remaining", value: budget.unspent },
    { name: "Budget Spent", value: budget.total_spent },
  ];

  const COLORS = ["rgba(99,102,241,0.9)", "rgba(34,211,238,0.9)"];
  const spentPct = (
    (budget.total_spent / budget.total_available) *
    100
  ).toFixed(1);

  return (
    <div className="relative w-full md:w-1/2 xl:w-full xl:h-1/2 card font-poppins px-6 py-6 flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
            This Month
          </p>
          <h2 className="text-lg font-semibold text-textPrimary/90 mt-0.5">
            Budget Split
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

      {/* Donut */}
      <div
        className="relative w-full h-[20vh] md:h-3/4 outline-none focus:outline-none"
        // style={{ outline: "none" }}
      >
        <BudgetDonutComponent data={data} COLORS={COLORS} />

        {/* Center label */}
        <div className="absolute z-0 inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-textPrimary/90">
            {spentPct}%
          </span>
          <span className="text-[10px] uppercase tracking-wider text-textPrimary/30">
            spent
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-outline/50" />

      {/* Legend */}
      <div className="flex flex-col gap-2.5">
        {data.map((entry, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ background: COLORS[i] }}
              />
              <span className="text-xs text-textPrimary/55">{entry.name}</span>
            </div>
            <span className="text-xs font-semibold text-textPrimary/70">
              £{entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetDonut;
