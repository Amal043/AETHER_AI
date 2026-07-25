"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { AnimatedButton } from "@/components/ui/animated-button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { uploadAndIngestCSV, IngestionReportResponse } from "@/lib/api-client";
import { Upload, FileCheck, AlertTriangle, RefreshCw, Code, Terminal } from "lucide-react";

export const PipelineCommandSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<IngestionReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"summary" | "json">("summary");

  const handleDemoRun = async () => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const realDatasetStream = `order_id,customer_id,category,sales_amount,quantity,order_date
ORD-8801,CUST-901,Electronics,499.99,1,2026-07-25 10:00:00
ORD-8802,CUST-902,Apparel,89.50,2,2026-07-25 11:30:00
ORD-8803,CUST-903,Home & Kitchen,145.00,1,2026-07-25 12:15:00
ORD-8804,CUST-904,Beauty,34.99,2,2026-07-25 14:00:00
ORD-8805,CUST-905,Electronics,1250.00,1,2026-07-25 15:45:00`;

      const file = new File([realDatasetStream], "telemetry_stream.csv", { type: "text/csv" });
      const res = await uploadAndIngestCSV(file);
      setReport(res.data || res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Backend server is waking up on Render. Please retry in a few seconds.";
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
    setReport(null);
    try {
      const res = await uploadAndIngestCSV(file);
      setReport(res.data || res);
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
        badge="Live Telemetry Engine"
        title="Execute Real-Time Pipeline &"
        gradientTitle="Data Quality Audit"
        subtitle="Test the backend CSV loader, dynamic schema inferencer, and quality scorer directly against live REST endpoints."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <HolographicCard glowColor="cyan" className="p-6 bg-white border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-mono mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-sky-600" />
              <span>Pipeline Stream Ingestion</span>
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Upload a custom CSV file or trigger a synthetic multi-column e-commerce dataset for real-time profiling.
            </p>

            <div className="space-y-4">
              <AnimatedButton
                variant="glow"
                className="w-full justify-center py-3 font-mono text-xs tracking-wider"
                onClick={handleDemoRun}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>PROFILING STREAM...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>RUN SYNTHETIC INGESTION STREAM</span>
                  </>
                )}
              </AnimatedButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase font-mono">
                  <span className="bg-white px-3 text-slate-400 font-semibold">OR Upload Local CSV File</span>
                </div>
              </div>

              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100/60 transition-all text-center">
                <FileCheck className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs text-slate-700 font-mono font-bold">Select .CSV Dataset File</span>
                <span className="text-[10px] text-slate-500 font-mono mt-1">Chunked up to 50MB</span>
                <input
                  type="file"
                  accept=".csv, .txt, .xlsx, .xls, */*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </label>
            </div>

            {error && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}
          </HolographicCard>
        </div>

        {/* Profiler Output Report */}
        <div className="lg:col-span-7">
          <HolographicCard glowColor="indigo" className="p-6 bg-white border border-slate-200 min-h-[420px] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 mb-5 gap-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-mono text-slate-800 font-bold uppercase tracking-wider">
                    TELEMETRY REPORT OUTPUT
                  </span>
                </div>

                {report && (
                  <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-[11px] font-mono">
                      <button
                        onClick={() => setViewMode("summary")}
                        className={`px-2.5 py-0.5 rounded transition-all ${
                          viewMode === "summary" ? "bg-indigo-600 text-white font-bold" : "text-slate-600"
                        }`}
                      >
                        Summary
                      </button>
                      <button
                        onClick={() => setViewMode("json")}
                        className={`px-2.5 py-0.5 rounded transition-all ${
                          viewMode === "json" ? "bg-indigo-600 text-white font-bold" : "text-slate-600"
                        }`}
                      >
                        Raw JSON
                      </button>
                    </div>
                    <HudBadge label={report.status} variant="emerald" />
                  </div>
                )}
              </div>

              {report ? (
                viewMode === "summary" ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                        <div className="text-[10px] uppercase text-slate-500 font-semibold">Quality Score</div>
                        <div className="text-2xl font-bold text-sky-700">
                          {report.quality_score}/100
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                        <div className="text-[10px] uppercase text-slate-500 font-semibold">Total Rows</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {report.summary.total_rows}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                        <div className="text-[10px] uppercase text-slate-500 font-semibold">Completeness</div>
                        <div className="text-2xl font-bold text-emerald-700">
                          {report.summary.overall_completeness_pct}%
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                        <div className="text-[10px] uppercase text-slate-500 font-semibold">Duplicates</div>
                        <div className="text-2xl font-bold text-amber-700">
                          {report.summary.duplicate_rows_count}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase text-slate-700 mb-2 font-bold">Inferred Schema Details:</h4>
                      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                        {report.columns.map((col: any) => (
                          <div
                            key={col.name}
                            className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                          >
                            <span className="text-slate-900 font-bold">{col.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                                {col.inferred_type}
                              </span>
                              <span className="text-slate-500 font-semibold">{col.missing_percentage}% null</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-72">
                    {JSON.stringify(report, null, 2)}
                  </pre>
                )
              ) : (
                <div className="py-20 text-center text-slate-500 space-y-3 font-mono">
                  <Code className="w-10 h-10 mx-auto text-slate-400 animate-pulse" />
                  <p className="text-xs text-slate-600 font-medium">No dataset ingested yet. Click above to trigger live pipeline stream.</p>
                </div>
              )}
            </div>
          </HolographicCard>
        </div>
      </div>
    </SectionContainer>
  );
};
