"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ConversionFunnelChartProps {
  data: { stage: string; count: number; pct: number }[];
}

const FUNNEL_COLORS = ["#0284c7", "#3b82f6", "#6366f1", "#10b981"];

export const ConversionFunnelChart: React.FC<ConversionFunnelChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis type="category" dataKey="stage" stroke="#64748b" fontSize={11} tickLine={false} width={120} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#cbd5e1",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              fontFamily: "monospace",
            }}
            formatter={(value: any, name: any, item: any) => [`${value} sessions (${item.payload.pct}%)`, "Volume"]}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
