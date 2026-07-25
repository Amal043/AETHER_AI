"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Filter, Globe, AlertTriangle, TrendingUp, Navigation, Sliders } from "lucide-react";

export const ConversionLogisticsCommand: React.FC = () => {
  const [sliderVal, setSliderVal] = useState<number>(68);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-600" />
            <span>CONVERSION & LOGISTICS COMMAND CENTER</span>
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            AETHER Neural Flow Engine // Real-time Journey Drop-offs & Node Anomalies
          </p>
        </div>
        <HudBadge label="AETHER LOGISTICS MATRIX ACTIVE" variant="cyan" />
      </div>

      {/* Main Dual Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Conversion Bottlenecks Flow */}
        <div className="lg:col-span-5">
          <HolographicCard glowColor="cyan" className="p-6 h-full bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-mono font-bold text-slate-800 uppercase">Conversion Bottlenecks</span>
              </div>
              <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-semibold">
                Cart Abandonment Bottleneck
              </span>
            </div>

            {/* Journey Flow Steps */}
            <div className="space-y-5 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>Discovery Phase</span>
                  <span className="text-sky-600 font-bold">124,800 users</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-sky-500 rounded-full" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>Consideration Phase</span>
                  <span className="text-indigo-600 font-bold">62,400 users (50%)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ duration: 1 }} className="h-full bg-indigo-500 rounded-full" />
                </div>
              </div>

              {/* Highlighted Red Bottleneck Box */}
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3 relative overflow-hidden shadow-sm">
                <div className="flex justify-between text-rose-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Cart Abandonment Bottleneck</span>
                  </span>
                  <span className="text-rose-600 font-mono">-{sliderVal}% Drop-off</span>
                </div>
                <div className="h-2.5 w-full bg-rose-200/80 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${sliderVal}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-rose-600 rounded-full shadow-sm"
                  />
                </div>

                {/* Interactive Slider */}
                <div className="pt-2 border-t border-rose-200/80 flex items-center justify-between text-[11px] text-rose-900">
                  <span className="flex items-center gap-1 font-mono">
                    <Sliders className="w-3.5 h-3.5 text-rose-600" />
                    <span>Simulate Drop-off Rate:</span>
                  </span>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-28 accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>Completed Purchase</span>
                  <span className="text-emerald-600 font-bold">14,200 users</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "11.3%" }} transition={{ duration: 1 }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </HolographicCard>
        </div>

        {/* Right Panel: Logistics & Anomalies Control */}
        <div className="lg:col-span-7 space-y-6">
          <HolographicCard glowColor="indigo" className="p-6 bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-mono font-bold text-slate-800 uppercase">Logistics & Node Anomalies</span>
              </div>
              <HudBadge label="1 Anomaly Flagged" variant="magenta" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              
              {/* Anomaly Alert Light Card */}
              <div className="md:col-span-5 p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-amber-800 font-bold font-mono text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Sector 75 Anomaly Alert</span>
                </div>
                <p className="text-[11px] text-slate-700 font-sans leading-relaxed">
                  Stock Deficit detected in Sector 75 Warehouse Node. Expected delay: +48h.
                </p>
                <div className="h-12 w-full bg-white rounded-lg p-2 flex items-end gap-1 border border-amber-200">
                  {[20, 35, 95, 40, 25].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t ${i === 2 ? "bg-amber-500 shadow-sm" : "bg-slate-200"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Demand Forecast Chart Light Card */}
              <div className="md:col-span-7 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-800 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-sky-600" />
                    <span>Demand Forecast Curve</span>
                  </span>
                  <span className="text-sky-600 text-[10px] font-semibold">Optimal Trajectory</span>
                </div>
                <div className="h-24 w-full bg-white rounded-xl p-2.5 flex items-end gap-2 border border-slate-200">
                  {[35, 42, 50, 68, 85, 110, 145].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(h / 145) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-indigo-500 via-sky-500 to-sky-400 rounded-t"
                    />
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between font-semibold">
                  <span>Q1 Base</span>
                  <span>Q4 Peak Forecast</span>
                </div>
              </div>

            </div>
          </HolographicCard>
        </div>

      </div>
    </div>
  );
};
