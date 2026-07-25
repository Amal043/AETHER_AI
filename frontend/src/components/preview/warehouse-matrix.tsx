"use client";

import React from "react";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Server } from "lucide-react";

export const WarehouseMatrixWidget: React.FC = () => {
  return (
    <HolographicCard glowColor="magenta" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Server className="w-5 h-5 text-pink-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Autonomous Fulfillment Radar
          </h3>
        </div>
        <HudBadge label="94.2% Capacity" variant="magenta" />
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-4">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[10px] text-slate-400">Warehouse Nodes</div>
          <div className="text-lg font-bold text-pink-400">18 Global</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[10px] text-slate-400">Robotic Velocity</div>
          <div className="text-lg font-bold text-cyan-400">14.8k units/h</div>
        </div>
      </div>

      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
        <span>Fulfillment Cycle Latency:</span>
        <span className="text-emerald-400 font-bold">12.4 minutes avg</span>
      </div>
    </HolographicCard>
  );
};
