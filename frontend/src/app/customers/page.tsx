"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalFilterBar } from "@/components/dashboard/global-filter-bar";
import { ExportBar } from "@/components/dashboard/export-bar";
import { ConversionFunnelChart } from "@/components/charts/ConversionFunnelChart";
import { fetchCustomerAnalytics } from "@/lib/api-client";
import { Users, Filter, PieChart } from "lucide-react";

export default function CustomersPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchCustomerAnalytics().then((res) => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <Users className="w-3.5 h-3.5 text-sky-500" />
              Customer & Funnel Analytics
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              User Behavior & Conversion Cohorts
            </h1>
          </div>
          <ExportBar data={data ? data.funnel : []} filename="customer_funnel_report" />
        </div>

        <GlobalFilterBar />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <Filter className="w-4 h-4 text-sky-600" /> Session Conversion Funnel
            </h3>
            <p className="text-xs text-slate-500 mb-6">Discovery to Checkout Conversion Flow</p>
            <ConversionFunnelChart data={data ? data.funnel : []} />
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" /> Customer Segment Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-6">Distribution across enterprise buyer tiers</p>

            <div className="space-y-4 pt-4">
              {data && data.segments ? (
                data.segments.map((seg: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-mono text-xs font-bold text-slate-800">{seg.segment}</span>
                    <span className="font-mono text-xs font-bold text-sky-700">{seg.count} Accounts</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">Loading customer cohorts...</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
