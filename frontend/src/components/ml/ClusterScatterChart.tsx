"use client";

import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface ClusterScatterProps {
  coordinates: { customer_key: string; x: number; y: number; cluster_id: number; spent: number }[];
}

export const ClusterScatterChart: React.FC<ClusterScatterProps> = ({ coordinates }) => {
  const colors = ["#0284C7", "#4F46E5", "#D946EF", "#059669", "#EA580C"];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-500 font-bold uppercase">Behavioral Cluster Scatter (PCA Projection)</span>
        <span className="text-xs font-mono text-slate-400">Total Datapoints: {coordinates.length}</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis type="number" dataKey="x" name="Spent Scale (PC1)" tick={{ fontSize: 10, fill: "#64748B" }} />
            <YAxis type="number" dataKey="y" name="Recency Scale (PC2)" tick={{ fontSize: 10, fill: "#64748B" }} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#F8FAFC", fontSize: "11px" }}
              formatter={(value: any, name: any) => [value, name]}
            />
            <Scatter name="Customers" data={coordinates}>
              {coordinates.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.cluster_id % colors.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
