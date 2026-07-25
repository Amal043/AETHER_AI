"use client";

import React from "react";
import { AlertTriangle, ShieldAlert, CheckCircle, Flame } from "lucide-react";

interface AnomalyItem {
  id: string;
  category: string;
  title: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  metric: string;
  expected_range: string;
  confidence_score: number;
  timestamp: string;
  details: string;
}

interface AnomalyHeatmapProps {
  anomalies: AnomalyItem[];
  threatLevel: string;
}

export const AnomalyHeatmap: React.FC<AnomalyHeatmapProps> = ({ anomalies, threatLevel }) => {
  return (
    <div className="w-full space-y-6">
      {/* Header Matrix Summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${threatLevel === "Elevated" ? "bg-rose-50 border border-rose-200 text-rose-600" : "bg-emerald-50 border border-emerald-200 text-emerald-600"}`}>
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase">System Pipeline Threat Status</div>
            <div className="text-xl font-mono font-extrabold text-slate-900 flex items-center gap-2">
              <span>{threatLevel} Threat Matrix</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${threatLevel === "Elevated" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                {anomalies.length} Flagged Pipeline Nodes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="space-y-3">
        {anomalies.map((item) => {
          const isCritical = item.severity === "CRITICAL";
          const isWarning = item.severity === "WARNING";

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-white border backdrop-blur-md transition-all duration-200 shadow-sm hover:shadow-md ${
                isCritical
                  ? "border-rose-200 hover:border-rose-400 bg-rose-50/30"
                  : isWarning
                  ? "border-amber-200 hover:border-amber-400 bg-amber-50/30"
                  : "border-sky-200 hover:border-sky-400"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {isCritical ? (
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-sky-600" />
                  )}
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase">{item.category}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${isCritical ? "bg-rose-100 text-rose-700 border border-rose-200" : isWarning ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-sky-100 text-sky-700 border border-sky-200"}`}>
                    {item.severity}
                  </span>
                  <span className="text-slate-400">Confidence: {(item.confidence_score * 100).toFixed(0)}%</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 font-mono mb-1">{item.title}</h4>
              <p className="text-xs text-slate-600 mb-3 font-sans leading-relaxed">{item.details}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2 border-t border-slate-100">
                <div className="text-slate-500">
                  Metric: <span className="font-bold text-slate-900">{item.metric}</span>
                </div>
                <div className="text-slate-500">
                  Baseline Target: <span className="font-bold text-slate-700">{item.expected_range}</span>
                </div>
                <div className="text-slate-400 ml-auto">{item.timestamp}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
