"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { TrendingUp, Filter, RefreshCw } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export const AlienBotPedestal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"funnel" | "demand">("funnel");
  const [demandMultiplier, setDemandMultiplier] = useState(1);
  const mounted = useIsMounted();

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Title Badge */}
      <div className="mb-6 flex justify-center">
        <HudBadge label="AETHER LOGISTICS & CUSTOMER INTELLIGENCE ENGINE" variant="cyan" />
      </div>

      {/* Main Holographic Pedestal Chamber */}
      <div className="relative w-full rounded-3xl border border-sky-200/80 bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(2,132,199,0.12)] overflow-hidden">
        
        {/* Soft Ambient Radial Light Filter */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-t from-sky-200/50 via-indigo-100/30 to-transparent blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Holographic Projection: 3D Conversion Funnel */}
          <motion.div
            initial={mounted ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 space-y-4"
          >
            <HolographicCard glowColor="cyan" className="p-5 bg-white border border-sky-200 shadow-md">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2.5">
                <Filter className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-mono font-bold text-slate-800 uppercase">User Journey Funnel</span>
              </div>
              <div className="space-y-3 font-mono text-[11px]">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>1. Discovery</span>
                    <span className="text-sky-600 font-bold">100% (124k)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="bg-sky-500 h-full rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>2. Consideration</span>
                    <span className="text-indigo-600 font-bold">50% (62k)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ duration: 1 }} className="bg-indigo-500 h-full rounded-full" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="flex justify-between text-rose-700 font-bold mb-1">
                    <span>3. Cart Drop-off</span>
                    <span>-68% Drop</span>
                  </div>
                  <div className="w-full bg-rose-200/60 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 1 }} className="bg-rose-500 h-full rounded-full" />
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Center Programmatic Animated Bioluminescent Alien Bot */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-6">
            
            {/* Animated Energy Orbit Rings */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              
              {/* Outer Counter-Rotating Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-300 animate-spin-slow opacity-60" />
              
              {/* Inner Counter-Rotating Ring */}
              <div className="absolute inset-4 rounded-full border border-indigo-300 animate-spin-reverse opacity-70" />

              {/* Pedestal Base Laser Beams */}
              <div className="absolute bottom-2 w-48 h-32 bg-gradient-to-t from-sky-400/40 via-indigo-300/20 to-transparent blur-md animate-beam" />

              {/* Programmatic SVG Alien Entity Head & Core */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [0, 1.5, 0, -1.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(2,132,199,0.3)]">
                  {/* Alien Crown / Head Nodes */}
                  <path d="M70 15 L95 40 L70 65 L45 40 Z" fill="url(#crownGlow)" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="70" cy="40" r="10" fill="#38BDF8" className="animate-pulse" />
                  
                  {/* Eyes / Telemetry Sensors */}
                  <circle cx="58" cy="38" r="3" fill="#FFFFFF" />
                  <circle cx="82" cy="38" r="3" fill="#FFFFFF" />

                  {/* Energy Spine / Core */}
                  <rect x="67" y="65" width="6" height="40" rx="3" fill="#4F46E5" />
                  <circle cx="70" cy="85" r="14" fill="url(#coreGlow)" className="animate-ping opacity-75" />
                  <circle cx="70" cy="85" r="8" fill="#D946EF" />

                  <defs>
                    <linearGradient id="crownGlow" x1="45" y1="15" x2="95" y2="65" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0284C7" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#4F46E5" stopOpacity="0.9" />
                    </linearGradient>
                    <radialGradient id="coreGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(70 85) scale(14)">
                      <stop stopColor="#D946EF" />
                      <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Floating Telemetry Text Bubble */}
                <div className="mt-2 px-3.5 py-1 rounded-full bg-slate-900 text-white font-mono text-[10px] tracking-wide border border-sky-400 shadow-md">
                  AETHER-BOT // TELEMETRY ACTIVE
                </div>
              </motion.div>
            </div>

            {/* Interactive Pedestal Controls */}
            <div className="mt-4 flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-md">
              <button
                onClick={() => setActiveTab("funnel")}
                className={`px-4 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === "funnel"
                    ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-500/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Conversion Funnel
              </button>
              <button
                onClick={() => setActiveTab("demand")}
                className={`px-4 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === "demand"
                    ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Demand Forecast
              </button>
            </div>
          </div>

          {/* Right Holographic Projection: Predicted Demand Spikes */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 30 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 space-y-4"
          >
            <HolographicCard glowColor="indigo" className="p-5 bg-white border border-indigo-200 shadow-md">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase">Demand Forecast</span>
                </div>
                <button
                  onClick={() => setDemandMultiplier((prev) => (prev === 1 ? 1.4 : 1))}
                  className="p-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Q3 Spike Prediction</span>
                  <span className="text-emerald-600 font-bold">
                    +{(28.4 * demandMultiplier).toFixed(1)}%
                  </span>
                </div>

                <div className="h-20 w-full bg-slate-50 rounded-xl p-2 flex items-end gap-1.5 border border-slate-200">
                  {[35, 55, 75, 50, 85, 110, 140].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${(h * demandMultiplier) / 1.6}%` }}
                      transition={{ duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-indigo-500 to-sky-400 rounded-t"
                    />
                  ))}
                </div>

                <div className="text-[10px] text-slate-500">
                  Peak Velocity: Sector 4 ({(14.2 * demandMultiplier).toFixed(1)}k units)
                </div>
              </div>
            </HolographicCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
