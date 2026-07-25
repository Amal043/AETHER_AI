"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClusterScatterChart } from "@/components/ml/ClusterScatterChart";
import { fetchSegmentationClusters } from "@/lib/api-client";
import { Users } from "lucide-react";

export default function SegmentationPage() {
  const [data, setData] = useState<any>(null);
  const [clustersCount, setClustersCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSegmentationClusters(clustersCount)
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clustersCount]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 shadow-sm mb-3">
              <Users className="w-3.5 h-3.5 text-fuchsia-500" />
              Behavioral RFM and K-Means Cluster Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Customer Behavioral Segmentation
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-500 font-semibold">Clusters K:</span>
            <select
              value={clustersCount}
              onChange={(e) => setClustersCount(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm font-bold text-slate-800"
            >
              {[3, 4, 5, 6, 7].map((k) => (
                <option key={k} value={k}>
                  K = {k} Clusters
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2D Scatter Matrix */}
        {data && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mb-10">
            <ClusterScatterChart coordinates={data.coordinates} />
          </div>
        )}

        {/* Clusters Breakdown List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.clusters ? (
            data.clusters.map((c: any) => (
              <div key={c.cluster_id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md hover:border-fuchsia-400 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase text-slate-500">Cluster {c.cluster_id + 1}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${c.risk_level === "High" ? "bg-rose-100 text-rose-700 border border-rose-200" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                    {c.risk_level} Risk
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-mono mb-2">{c.label}</h3>

                <div className="space-y-2 text-xs font-mono p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                  <div className="flex justify-between text-slate-600"><span>Accounts Count</span><span className="font-bold text-slate-900">{c.customer_count} ({c.pct_of_total}%)</span></div>
                  <div className="flex justify-between text-slate-600"><span>Avg Spent</span><span className="font-bold text-sky-700">${c.avg_spent.toLocaleString()}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Avg Recency</span><span className="font-bold text-slate-800">{c.avg_recency_days} days</span></div>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Sample: {c.sample_customers.join(", ")}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-slate-400 font-mono text-xs">Computing behavioral clusters...</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
