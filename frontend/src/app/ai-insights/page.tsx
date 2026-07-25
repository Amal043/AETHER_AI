"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fetchExecutiveInsights } from "@/lib/api-client";
import { Sparkles, Brain, RefreshCw } from "lucide-react";

export default function AIInsightsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    fetchExecutiveInsights()
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Executive Telemetry and AI Briefing Node
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              AI Executive Insights Engine
            </h1>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${loading ? "animate-spin" : ""}`} />
            <span>RE-SYNTHESIZE DIGEST</span>
          </button>
        </div>

        {/* AI Holographic Narrative Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl mb-10 relative overflow-hidden border border-indigo-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase">
                <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span>Executive Neural Synthesis // Live Broadcast</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{data ? data.ai_engine_version : "AETHER AI v3.0"}</span>
            </div>

            <p className="text-lg sm:text-xl font-sans text-slate-100 leading-relaxed max-w-4xl">
              {data ? data.narrative_summary : "Synthesizing dynamic business telemetry, forecasts, and anomaly signals..."}
            </p>

            {data && (
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div>
                  Threat Level: <span className="font-bold text-rose-400">{data.threat_matrix.overall_threat}</span>
                </div>
                <div>
                  Pipeline Anomalies: <span className="font-bold text-amber-400">{data.threat_matrix.anomalies_count}</span>
                </div>
                <div>
                  Action Recommendations: <span className="font-bold text-emerald-400">{data.threat_matrix.recommendations_count}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data && data.insights ? (
            data.insights.map((ins: any) => (
              <div key={ins.id} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm backdrop-blur-md hover:border-indigo-400 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-indigo-600 uppercase">{ins.category}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${ins.importance === "CRITICAL" ? "bg-rose-100 text-rose-700 border border-rose-200" : "bg-indigo-50 text-indigo-700 border border-indigo-200"}`}>
                    {ins.importance}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-mono mb-2">{ins.headline}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{ins.content}</p>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-slate-400 font-mono text-xs">
              Synthesizing live executive intelligence...
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
