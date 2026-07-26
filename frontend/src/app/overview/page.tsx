"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalFilterBar } from "@/components/dashboard/global-filter-bar";
import { ExportBar } from "@/components/dashboard/export-bar";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import { CategoryBarChart } from "@/components/charts/CategoryBarChart";
import { useFilters } from "@/context/FilterContext";
import { fetchKpis, fetchRevenueTrends, fetchSalesAnalytics } from "@/lib/api-client";
import { DollarSign, ShoppingCart, Users, TrendingUp, Sparkles, Activity } from "lucide-react";

export default function OverviewPage() {
  const { filters } = useFilters();
  const [kpis, setKpis] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [salesData, setSalesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [kpiRes, revRes, salesRes] = await Promise.all([
          fetchKpis(filters),
          fetchRevenueTrends(),
          fetchSalesAnalytics(),
        ]);
        setKpis(kpiRes.data);
        setRevenueData(revRes.data);
        setSalesData(salesRes.data);
      } catch (err) {
        console.error("Error loading overview telemetry:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
              Executive Command Overview
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Live Business Telemetry
            </h1>
          </div>
          <ExportBar data={revenueData} filename="executive_overview_telemetry" />
        </div>

        <GlobalFilterBar />

        {/* KPI CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Gross Revenue</span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              ${kpis ? kpis.financial.total_revenue.toLocaleString() : "..."}
            </div>
            <div className="text-[11px] font-mono mt-1 flex items-center gap-1 font-bold text-slate-600">
              {kpis && kpis.financial.monthly_growth_pct !== 0 ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {kpis.financial.monthly_growth_pct > 0 ? "+" : ""}{kpis.financial.monthly_growth_pct}% Period Growth
                </span>
              ) : (
                <span className="text-slate-500 font-semibold">
                  Source: {kpis?.meta?.data_source || "Uploaded Data"}
                </span>
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Orders Volume</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {kpis ? kpis.financial.total_orders.toLocaleString() : "..."}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              AOV: ${kpis ? kpis.financial.average_order_value : "..."}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Conversion Rate</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {kpis ? kpis.conversion.conversion_rate_pct : "..."}%
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Cart Abandonment: {kpis ? kpis.conversion.cart_abandonment_pct : "..."}%
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Active Customers</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {kpis ? kpis.customers.total_customers : "..."}
            </div>
            <div className="text-[11px] text-purple-600 font-mono mt-1 font-bold">
              {kpis ? kpis.customers.customer_retention_pct : "..."}% Retention Rate
            </div>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono">Time-Series Revenue Trajectory</h3>
            <p className="text-xs text-slate-500 mb-6">Historical revenue aggregation across active order streams</p>
            <RevenueTrendChart data={revenueData} />
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono">Category Revenue Breakdown</h3>
            <p className="text-xs text-slate-500 mb-6">Sales distribution across key product segments</p>
            <CategoryBarChart data={salesData ? salesData.categories : []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
