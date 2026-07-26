"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalFilterBar } from "@/components/dashboard/global-filter-bar";
import { ExportBar } from "@/components/dashboard/export-bar";
import { fetchLogisticsAnalytics } from "@/lib/api-client";
import { Truck, ShieldCheck, Clock } from "lucide-react";

import { InsufficientDataCard } from "@/components/common/insufficient-data-card";

export default function LogisticsPage() {
  const [logistics, setLogistics] = useState<any>(null);

  useEffect(() => {
    fetchLogisticsAnalytics().then((res) => setLogistics(res.data)).catch(console.error);
  }, []);

  const hasShipments = logistics && logistics.total_shipments > 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <Truck className="w-3.5 h-3.5 text-sky-500" />
              Logistics & Fulfillment Node
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Shipment Telemetry & Carrier Performance
            </h1>
          </div>
          <ExportBar data={logistics ? logistics.carriers : []} filename="logistics_carrier_report" />
        </div>

        <GlobalFilterBar />

        {logistics && !hasShipments && (
          <InsufficientDataCard
            title="Carrier Logistics & Shipment Telemetry Missing"
            description="To profile carrier partner volumes, transit durations, and package fulfillment statuses, the dataset must include shipping records."
            requiredColumns={["shipment_id / tracking_number", "carrier (e.g. UPS/FedEx/DHL)", "deliver_status / status", "estimated_delivery", "actual_delivery"]}
            suggestedAction="Upload a logistics CSV dataset with carrier and delivery dates to analyze shipping bottlenecks and delivery speeds."
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Carrier Partner Volumes
            </h3>
            <p className="text-xs text-slate-500 mb-6">Distribution across global logistics networks</p>

            <div className="space-y-4">
              {logistics && logistics.carriers ? (
                logistics.carriers.map((c: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono text-sm font-bold text-slate-900">{c.carrier}</span>
                    <span className="font-mono text-xs font-bold text-sky-700">{c.count} Shipments</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">Loading logistics telemetry...</div>
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" /> Shipment Status Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-6">Live state of dispatched order packages</p>

            <div className="space-y-4">
              {logistics && logistics.statuses ? (
                logistics.statuses.map((s: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono text-sm font-bold text-slate-900">{s.status}</span>
                    <span className="font-mono text-xs font-bold text-emerald-700">{s.count} Packages</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">Loading package status...</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
