"use client";

import React from "react";
import { motion } from "framer-motion";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Globe, Activity } from "lucide-react";

export const LogisticsMapWidget: React.FC = () => {
  const nodes = [
    { id: "NODE-NA-01", name: "North America Hub", status: "Active", latency: "14ms", coords: { x: "25%", y: "35%" } },
    { id: "NODE-EU-04", name: "Europe Central", status: "Active", latency: "22ms", coords: { x: "52%", y: "28%" } },
    { id: "NODE-AP-09", name: "Asia Pacific Core", status: "Optimal", latency: "18ms", coords: { x: "78%", y: "42%" } },
    { id: "NODE-SA-02", name: "South America Node", status: "Active", latency: "31ms", coords: { x: "36%", y: "68%" } },
  ];

  return (
    <HolographicCard glowColor="cyan" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-cyan-400 animate-spin-slow" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Global Autonomous Shipping Mesh
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Real-time Node Telemetry</span>
          </div>
        </div>
        <HudBadge label="4/4 Nodes Active" variant="cyan" />
      </div>

      {/* Holographic World Map Canvas Container */}
      <div className="relative h-60 w-full bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* Animated Curved Vector Route Streams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <motion.path
            d="M 120 80 Q 250 40 380 70"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 380 70 Q 500 110 600 90"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Node Telemetry Markers */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            style={{ left: node.coords.x, top: node.coords.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            whileHover={{ scale: 1.2 }}
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400 shadow-[0_0_12px_#06b6d4]" />
            </div>

            {/* Hover Tooltip Card */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-slate-900/95 border border-cyan-500/40 px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-mono whitespace-nowrap text-cyan-200 z-30">
              <div className="font-bold text-white">{node.name}</div>
              <div className="text-emerald-400">Latency: {node.latency}</div>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500 flex items-center gap-2">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Routing Stream: 1.48 TB/sec</span>
        </div>
      </div>
    </HolographicCard>
  );
};
