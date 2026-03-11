"use client";

import React from "react";
import { PieChart, Pie, Sector, Tooltip, ResponsiveContainer } from "recharts";

const BudgetDonutComponent = ({ COLORS, data }) => {
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
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetDonutComponent;
