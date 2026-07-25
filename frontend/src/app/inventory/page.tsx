"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalFilterBar } from "@/components/dashboard/global-filter-bar";
import { ExportBar } from "@/components/dashboard/export-bar";
import { InventoryHealthChart } from "@/components/charts/InventoryHealthChart";
import { fetchInventoryAnalytics } from "@/lib/api-client";
import { Warehouse, AlertTriangle, PackageCheck } from "lucide-react";

export default function InventoryPage() {
  const [inv, setInv] = useState<any>(null);

  useEffect(() => {
    fetchInventoryAnalytics().then((res) => setInv(res.data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <Warehouse className="w-3.5 h-3.5 text-sky-500" />
              Supply Chain & Inventory Monitor
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Warehouse Health & Stock Velocity
            </h1>
          </div>
          <ExportBar data={inv ? inv.low_stock_alerts : []} filename="low_inventory_alerts" />
        </div>

        <GlobalFilterBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-sky-600" /> Regional Warehouse Utilization
            </h3>
            <p className="text-xs text-slate-500 mb-6">Occupied Capacity vs Maximum Unit Thresholds</p>
            <InventoryHealthChart data={inv ? inv.warehouses : []} />
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-amber-700 mb-1 font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Low Stock Alerts (&lt; 50 units)
            </h3>
            <p className="text-xs text-slate-500 mb-6">Prioritized restock queue</p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {inv && inv.low_stock_alerts ? (
                inv.low_stock_alerts.map((item: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.sku} • {item.category}</div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-amber-500 text-white font-bold text-xs">
                      {item.stock_qty} left
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">Checking stock levels...</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
