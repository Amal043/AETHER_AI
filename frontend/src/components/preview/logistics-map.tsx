"use client";

import React, { useEffect, useState } from "react";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { Globe, Activity, Truck } from "lucide-react";
import { fetchLogisticsAnalytics } from "@/lib/api-client";

export const LogisticsMapWidget: React.FC = () => {
  const [carriers, setCarriers] = useState<any[]>([]);
  const [totalShipments, setTotalShipments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLogisticsAnalytics()
      .then((res) => {
        if (res && res.data) {
          setCarriers(res.data.carriers || []);
          setTotalShipments(res.data.total_shipments || 0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hasData = totalShipments > 0;

  return (
    <HolographicCard glowColor="cyan" className="p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-cyan-400 animate-spin-slow" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Logistics &amp; Carrier Telemetry
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Real-Time Ingested Shipping Stream</span>
          </div>
        </div>
        <HudBadge label={hasData ? `${totalShipments} Active Shipments` : "Awaiting Shipping Data"} variant={hasData ? "cyan" : "indigo"} />
      </div>

      {hasData ? (
        <div className="space-y-3 font-mono text-xs">
          <div className="text-[11px] text-cyan-400 font-bold uppercase mb-2">Carrier Dispatch Breakdown:</div>
          {carriers.map((c: any, idx: number) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">{c.carrier}</span>
              </div>
              <span className="text-cyan-300 font-bold">{c.count} Packages</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400 font-mono text-xs space-y-2">
          <div>No shipping or carrier telemetry uploaded yet.</div>
          <div className="text-[11px] text-slate-500">Upload CSV with carrier and delivery dates to activate shipping telemetry map.</div>
        </div>
      )}
    </HolographicCard>
  );
};
