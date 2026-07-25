"use client";

import React from "react";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Boxes } from "lucide-react";

export const InventoryHealthWidget: React.FC = () => {
  const skus = [
    { name: "SKU-9921 Quantum Core", stock: "14,200", status: "Optimal", health: 98 },
    { name: "SKU-4412 Neural Sensor", stock: "1,150", status: "Low Stock", health: 42 },
    { name: "SKU-8810 Flux Node", stock: "8,900", status: "Optimal", health: 94 },
  ];

  return (
    <HolographicCard glowColor="emerald" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Boxes className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Inventory Health Matrix
          </h3>
        </div>
        <HudBadge label="Stock In-Sync" variant="emerald" />
      </div>

      <div className="space-y-3 font-mono text-xs">
        {skus.map((sku) => (
          <div key={sku.name} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-white font-bold">{sku.name}</div>
              <div className="text-slate-400 text-[10px]">Stock Level: {sku.stock} units</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                sku.health < 50 ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}>
                {sku.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </HolographicCard>
  );
};
