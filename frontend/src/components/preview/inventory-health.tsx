"use client";

import React, { useEffect, useState } from "react";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Boxes } from "lucide-react";
import { fetchInventoryAnalytics } from "@/lib/api-client";

export const InventoryHealthWidget: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInventoryAnalytics()
      .then((res) => {
        if (res && res.data) {
          setAlerts(res.data.low_stock_alerts || []);
          setTotalProducts(res.data.total_products || 0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hasData = totalProducts > 0;

  return (
    <HolographicCard glowColor="emerald" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Boxes className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Inventory Health Matrix
          </h3>
        </div>
        <HudBadge label={hasData ? `${totalProducts} Products Ingested` : "Awaiting Data Upload"} variant={hasData ? "emerald" : "indigo"} />
      </div>

      {hasData ? (
        <div className="space-y-3 font-mono text-xs">
          {alerts.length > 0 ? (
            alerts.slice(0, 3).map((p: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{p.title}</div>
                  <div className="text-slate-400 text-[10px]">Stock Level: {p.stock_qty} units</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded border bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold">
                    Low Stock Alert
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-emerald-400 font-mono text-xs">
              All {totalProducts} uploaded products maintain optimal stock levels (&gt; 50 units).
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 font-mono text-xs space-y-2">
          <div>No product inventory telemetry uploaded yet.</div>
          <div className="text-[11px] text-slate-500">Upload CSV with stock_qty and product titles to monitor stock matrix.</div>
        </div>
      )}
    </HolographicCard>
  );
};
