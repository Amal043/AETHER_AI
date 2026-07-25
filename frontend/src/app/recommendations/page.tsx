"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fetchRecommendations } from "@/lib/api-client";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";

export default function RecommendationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    fetchRecommendations()
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
              Dynamic Prescriptive Decision Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              AI Action Recommendations
            </h1>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${loading ? "animate-spin" : ""}`} />
            <span>RE-RUN DECISION ENGINE</span>
          </button>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {data && data.recommendations ? (
            data.recommendations.map((rec: any) => (
              <div key={rec.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md hover:border-indigo-400 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 uppercase">{rec.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-mono text-slate-500">Target: {rec.target_metric}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${rec.priority === "CRITICAL" ? "bg-rose-100 text-rose-700 border border-rose-200" : rec.priority === "HIGH" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-sky-100 text-sky-700 border border-sky-200"}`}>
                      {rec.priority} Priority
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {rec.impact_estimate}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-mono mb-2">{rec.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {rec.action}
                </p>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-100">
                  <span className="text-slate-400">Confidence Score: {(rec.confidence_score * 100).toFixed(0)}%</span>
                  <button className="flex items-center gap-1 text-indigo-600 font-bold hover:underline">
                    <span>Execute Action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">Generating data-driven recommendations...</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
