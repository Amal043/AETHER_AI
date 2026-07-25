"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnomalyHeatmap } from "@/components/ml/AnomalyHeatmap";
import { fetchAnomalies } from "@/lib/api-client";
import { ShieldAlert, RefreshCw } from "lucide-react";

export default function AnomaliesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    fetchAnomalies()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200 shadow-sm mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              Isolation Forest and Threat Detection Matrix
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Pipeline Anomaly Detection
            </h1>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-rose-600 ${loading ? "animate-spin" : ""}`} />
            <span>SCAN PIPELINE STREAM</span>
          </button>
        </div>

        {data && data.anomalies ? (
          <AnomalyHeatmap anomalies={data.anomalies} threatLevel={data.threat_level} />
        ) : (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">Scanning real-time telemetry streams...</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
