"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ForecastChartProps {
  data: { date: string; value: number; lower_bound?: number; upper_bound?: number }[];
  metricName: string;
  colorHex?: string;
  isCurrency?: boolean;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({
  data,
  metricName,
  colorHex = "#0284C7",
  isCurrency = false,
}) => {
  const formattedData = data.map((d) => ({
    ...d,
    formattedDate: d.date.slice(5),
  }));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-500 font-bold uppercase">{metricName} Multi-Horizon Trajectory</span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Confidence Interval 95%
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="forecastGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorHex} stopOpacity={0.4} />
                <stop offset="95%" stopColor={colorHex} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="formattedDate" tick={{ fontSize: 10, fill: "#64748B" }} />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748B" }}
              tickFormatter={(v) => (isCurrency ? `$${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#F8FAFC", fontSize: "11px" }}
              formatter={(val: any) => [isCurrency ? `$${Number(val).toLocaleString()}` : val, metricName]}
            />
            <Area type="monotone" dataKey="value" stroke={colorHex} strokeWidth={2.5} fillOpacity={1} fill="url(#forecastGlow)" />
            {data[0]?.upper_bound && (
              <Area type="monotone" dataKey="upper_bound" stroke="#CBD5E1" strokeDasharray="3 3" fill="none" strokeWidth={1} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
