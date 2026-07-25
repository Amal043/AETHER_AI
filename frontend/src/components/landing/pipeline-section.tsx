"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { uploadAndIngestCSV, IngestionReportResponse } from "@/lib/api-client";
import { Upload, FileCheck, AlertTriangle, Database, RefreshCw, CheckCircle2, Code } from "lucide-react";

export const PipelineSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<IngestionReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"summary" | "json">("summary");

  const handleDemoRun = async () => {
    setLoading(true);
    setError(null);
    try {
      const demoCsvContent = `order_id,customer_id,category,sales_amount,quantity,order_date
ORD-1001,CUST-501,Electronics,299.99,1,2026-07-01 10:00:00
ORD-1002,CUST-502,Apparel,49.50,2,2026-07-01 11:30:00
ORD-1003,CUST-503,Home & Kitchen,,1,2026-07-01 12:15:00
ORD-1004,CUST-504,Beauty,19.99,3,2026-07-01 14:00:00
ORD-1004,CUST-504,Beauty,19.99,3,2026-07-01 14:00:00
ORD-1005,CUST-505,Electronics,1250.00,1,2026-07-01 15:45:00`;

      const file = new File([demoCsvContent], "demo_stream.csv", { type: "text/csv" });
      const res = await uploadAndIngestCSV(file);
      setReport(res.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Pipeline execution failed. Ensure backend API is active.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLoading(true);
    setError(null);
    try {
      const res = await uploadAndIngestCSV(file);
      setReport(res.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to parse CSV dataset.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer id="pipeline">
      <AnimatedHeading
        badge="Live Interactive Engine"
        title="Execute Data Pipeline &"
        gradientTitle="Quality Profiler"
        subtitle="Test the backend CSV loader, dynamic schema inferencer, and data quality scorer directly in real time."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Ingestion Controls */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glow="cyan" className="p-6 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              <span>Pipeline Ingestion Trigger</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Upload a custom CSV file or trigger a synthetic multi-column e-commerce dataset for profiling.
            </p>

            <div className="space-y-4">
              <AnimatedButton
                variant="glow"
                className="w-full justify-center py-3"
                onClick={handleDemoRun}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Profiling Stream...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Run Synthetic Ingestion Pipeline</span>
                  </>
                )}
              </AnimatedButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase font-mono">
                  <span className="bg-[#0A0D18] px-3 text-slate-500">OR Upload Local CSV</span>
                </div>
              </div>

              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl cursor-pointer bg-slate-950/50 hover:bg-slate-900/50 transition-all text-center">
                <FileCheck className="w-8 h-8 text-slate-500 mb-2" />
                <span className="text-xs text-slate-300 font-medium">Select .CSV Dataset File</span>
                <span className="text-[10px] text-slate-500 font-mono mt-1">Up to 50MB per chunk</span>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </label>
            </div>

            {error && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Profiler Output Report */}
        <div className="lg:col-span-7">
          <GlassCard glow="indigo" className="p-6 min-h-[420px] flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                    PIPELINE PROFILER REPORT
                  </span>
                </div>

                {report && (
                  <div className="flex items-center gap-2">
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                      <button
                        onClick={() => setViewMode("summary")}
                        className={`px-2.5 py-0.5 rounded transition-all ${
                          viewMode === "summary" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"
                        }`}
                      >
                        Summary
                      </button>
                      <button
                        onClick={() => setViewMode("json")}
                        className={`px-2.5 py-0.5 rounded transition-all ${
                          viewMode === "json" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"
                        }`}
                      >
                        Raw JSON
                      </button>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {report.status}
                    </span>
                  </div>
                )}
              </div>

              {report ? (
                viewMode === "summary" ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-400">Quality Score</div>
                        <div className="text-2xl font-bold text-cyan-400 font-mono">
                          {report.quality_score}/100
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-400">Total Rows</div>
                        <div className="text-2xl font-bold text-white font-mono">
                          {report.summary.total_rows}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-400">Completeness</div>
                        <div className="text-2xl font-bold text-emerald-400 font-mono">
                          {report.summary.overall_completeness_pct}%
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-400">Duplicates</div>
                        <div className="text-2xl font-bold text-amber-400 font-mono">
                          {report.summary.duplicate_rows_count}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">Inferred Schema Details:</h4>
                      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                        {report.columns.map((col: any) => (
                          <div
                            key={col.name}
                            className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 font-mono"
                          >
                            <span className="text-slate-100 font-semibold">{col.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {col.inferred_type}
                              </span>
                              <span className="text-slate-400">{col.missing_percentage}% null</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-72">
                    {JSON.stringify(report, null, 2)}
                  </pre>
                )
              ) : (
                <div className="py-20 text-center text-slate-400 space-y-3">
                  <Code className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
                  <p className="text-sm font-mono text-slate-400">No dataset ingested yet. Click above to trigger live pipeline execution.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionContainer>
  );
};
