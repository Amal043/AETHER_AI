"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface ROCChartProps {
  fpr: number[];
  tpr: number[];
  auc: number;
}

export const ROCChart: React.FC<ROCChartProps> = ({ fpr, tpr, auc }) => {
  const data = fpr.map((x, idx) => ({
    fpr: x,
    tpr: tpr[idx] || 0,
    random: x,
  }));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-500 font-bold uppercase">ROC Curve Analysis</span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200">
          AUC: {(auc * 100).toFixed(1)}%
        </span>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="fpr" tick={{ fontSize: 10, fill: "#64748B" }} domain={[0, 1]} />
            <YAxis tick={{ fontSize: 10, fill: "#64748B" }} domain={[0, 1]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#F8FAFC", fontSize: "11px" }}
            />
            <ReferenceLine y={0} stroke="#CBD5E1" />
            <Line type="monotone" dataKey="tpr" stroke="#0284C7" strokeWidth={3} dot={{ r: 3, fill: "#0284C7" }} name="True Positive Rate" />
            <Line type="monotone" dataKey="random" stroke="#94A3B8" strokeDasharray="4 4" strokeWidth={1.5} name="Baseline Random" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
