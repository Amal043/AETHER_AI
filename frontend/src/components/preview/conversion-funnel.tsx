"use client";

import React from "react";
import { motion } from "framer-motion";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Filter } from "lucide-react";

export const ConversionFunnelWidget: React.FC = () => {
  const steps = [
    { label: "1. Impression Traffic", count: "1,248,500", pct: 100, color: "bg-indigo-500" },
    { label: "2. Product Engagement", count: "482,100", pct: 38.6, color: "bg-cyan-500" },
    { label: "3. Cart Additions", count: "128,400", pct: 10.2, color: "bg-pink-500" },
    { label: "4. Checkout Conversion", count: "42,850", pct: 3.43, color: "bg-emerald-500" },
  ];

  return (
    <HolographicCard glowColor="indigo" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Filter className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Quantum Conversion Funnel
          </h3>
        </div>
        <HudBadge label="3.43% Conversion" variant="indigo" />
      </div>

      <div className="space-y-4 font-mono text-xs">
        {steps.map((step) => (
          <div key={step.label} className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>{step.label}</span>
              <span className="text-white font-bold">{step.count} ({step.pct}%)</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${step.pct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${step.color} shadow-[0_0_12px_rgba(99,102,241,0.5)]`}
              />
            </div>
          </div>
        ))}
      </div>
    </HolographicCard>
  );
};
