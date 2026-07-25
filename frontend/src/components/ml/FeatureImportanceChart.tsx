"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface FeatureImportanceProps {
  data: { feature: string; importance: number }[];
}

export const FeatureImportanceChart: React.FC<FeatureImportanceProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-xs font-mono text-slate-400">No feature importances available.</div>;
  }

  const colors = ["#0284C7", "#4F46E5", "#D946EF", "#059669", "#EA580C", "#0284C7"];

  return (
    <div className="w-full">
      <div className="text-xs font-mono text-slate-500 font-bold uppercase mb-4">Feature Weight Importance</div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
            <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} />
            <YAxis dataKey="feature" type="category" tick={{ fontSize: 10, fill: "#334155", fontWeight: "bold" }} width={90} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#F8FAFC", fontSize: "11px" }}
            />
            <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
