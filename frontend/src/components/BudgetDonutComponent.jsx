"use client";

import React, { useRef, useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const BudgetDonutComponent = ({ COLORS, data }) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
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
                cx,
                cy,
                innerRadius,
                outerRadius,
                startAngle,
                endAngle,
                index,
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
    </div>
  );
};

export default BudgetDonutComponent;
