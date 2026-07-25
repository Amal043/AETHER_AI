"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ForecastChart } from "@/components/ml/ForecastChart";
import { fetchForecastSummary } from "@/lib/api-client";
import { TrendingUp, Calendar, DollarSign, ShoppingBag } from "lucide-react";

export default function ForecastPage() {
  const [horizon, setHorizon] = useState<number>(30);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchForecastSummary(horizon)
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [horizon]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              Multi-Horizon Predictive Telemetry Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Forecast Command Hub
            </h1>
          </div>

          {/* Multi-Horizon Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 shadow-sm font-mono text-xs">
            {[7, 30, 90, 365].map((d) => (
              <button
                key={d}
                onClick={() => setHorizon(d)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  horizon === d ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Summary Metric Strip */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-600" /> Project Revenue ({horizon} Days)
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                ${data.summary.total_projected_revenue.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-600 font-mono mt-1 font-bold">
                {data.summary.projected_growth_pct >= 0 ? "+" : ""}{data.summary.projected_growth_pct}% Projected Trajectory
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 mb-1">
                <ShoppingBag className="w-4 h-4 text-sky-600" /> Projected Orders ({horizon} Days)
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {data.summary.total_projected_orders.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-1">High-Throughput Order Projection</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 mb-1">
                <Calendar className="w-4 h-4 text-indigo-600" /> Confidence Interval Score
              </div>
              <div className="text-3xl font-extrabold text-indigo-600 font-mono">
                {(data.summary.confidence_score * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-slate-500 font-mono mt-1">Multi-variable Time Series Ensemble</div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        {data && data.metrics ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <ForecastChart data={data.metrics.revenue} metricName="Gross Revenue" colorHex="#059669" isCurrency={true} />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <ForecastChart data={data.metrics.orders} metricName="Order Volume" colorHex="#0284C7" />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <ForecastChart data={data.metrics.inventory} metricName="Stock Depletion" colorHex="#D946EF" />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <ForecastChart data={data.metrics.warehouse_capacity} metricName="Warehouse Load %" colorHex="#4F46E5" />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">Computing multi-horizon forecasting curves...</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
