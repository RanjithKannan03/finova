"use client";

import React from "react";
import { PieChart, Pie, Sector, Tooltip, ResponsiveContainer } from "recharts";

const BudgetDonutComponent = ({ COLORS, data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div
          className="px-3 py-2 rounded-xl border border-outline bg-foreground font-poppins pointer-events-none"
          style={{ transform: "translate(8px, -50%)" }}
        >
          <p className="text-[10px] uppercase tracking-wider text-textPrimary/40">
            {payload[0].name}
          </p>
          <p className="text-sm font-semibold text-textPrimary/80">
            £{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={0}
          style={{ outline: "none", border: "none" }}
          activeIndex={null}
          shape={(props) => {
            const {
              index,
              cx,
              cy,
              innerRadius,
              outerRadius,
              startAngle,
              endAngle,
              fill,
            } = props;
            return (
              <Sector
                {...props}
                fill={COLORS[index]}
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
              />
            );
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          isAnimationActive={false}
          position={{ x: "auto", y: "auto" }}
          wrapperStyle={{ transition: "none", outline: "none" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetDonutComponent;
