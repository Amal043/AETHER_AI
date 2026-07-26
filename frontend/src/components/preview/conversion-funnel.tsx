"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Filter } from "lucide-react";
import { fetchCustomerAnalytics } from "@/lib/api-client";

export const ConversionFunnelWidget: React.FC = () => {
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCustomerAnalytics()
      .then((res) => setFunnelData(res?.data?.funnel || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hasData = funnelData.some((f) => f.count > 0);

  return (
    <HolographicCard glowColor="indigo" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Filter className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Session Conversion Funnel
          </h3>
        </div>
        <HudBadge label={hasData ? "Live Session Telemetry" : "Awaiting Data Upload"} variant={hasData ? "emerald" : "indigo"} />
      </div>

      {hasData ? (
        <div className="space-y-4 font-mono text-xs">
          {funnelData.map((step) => (
            <div key={step.stage} className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>{step.stage}</span>
                <span className="text-white font-bold">{step.count.toLocaleString()} ({step.pct}%)</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(5, step.pct)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 font-mono text-xs space-y-2">
          <div>No web/app session telemetry uploaded yet.</div>
          <div className="text-[11px] text-slate-500">Upload CSV with session columns to view live conversion cohorts.</div>
        </div>
      )}
    </HolographicCard>
  );
};
