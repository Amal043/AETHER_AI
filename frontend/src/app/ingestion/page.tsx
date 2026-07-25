"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { uploadCsvFile, fetchEtlLogs } from "@/lib/api-client";
import { UploadCloud, CheckCircle2, AlertTriangle, FileText, Activity } from "lucide-react";

export default function IngestionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    fetchEtlLogs().then((res) => setLogs(res.data)).catch(console.error);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setReport(null);
    try {
      const res = await uploadCsvFile(file);
      setReport(res.data);
      loadLogs();
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
            <UploadCloud className="w-3.5 h-3.5 text-sky-500" />
            Automated Ingestion & Quality Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
            ETL Data Pipeline Upload & Audit
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* UPLOAD PANEL */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" /> CSV Dataset Ingestion
            </h3>
            <p className="text-xs text-slate-500 mb-6">Drag & drop raw sales or customer CSV for bulk processing</p>

            <div className="border-2 border-dashed border-sky-300 rounded-2xl p-8 text-center bg-sky-50/40 hover:bg-sky-50 transition-all mb-6">
              <UploadCloud className="w-10 h-10 text-sky-600 mx-auto mb-3 animate-bounce" />
              <input
                type="file"
                accept=".csv"
                id="fileUploadInput"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="fileUploadInput"
                className="cursor-pointer text-xs font-mono font-bold text-sky-700 underline"
              >
                Choose CSV File
              </label>
              {file && (
                <div className="mt-3 text-xs font-mono font-bold text-slate-800 bg-white p-2 rounded-xl border border-slate-200 inline-block shadow-sm">
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>

            <button
              disabled={!file || uploading}
              onClick={handleUpload}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-mono font-bold text-sm shadow-md shadow-sky-500/20 disabled:opacity-50 hover:shadow-lg transition-all"
            >
              {uploading ? "Ingesting & Validating ETL Pipeline..." : "Execute Bulk Ingestion"}
            </button>

            {/* REPORT SUMMARY */}
            {report && (
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Ingestion Completed
                </div>
                <div>Execution Time: {report.execution_time_seconds}s</div>
                <div>Quality Score: {report.quality_score}/100</div>
                <div>Imported Rows: {report.summary.imported_rows}</div>
                <div>Rejected Rows: {report.summary.rejected_rows}</div>
              </div>
            )}
          </div>

          {/* ETL SYSTEM LOG AUDIT */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" /> Pipeline Execution Audit Logs
            </h3>
            <p className="text-xs text-slate-500 mb-6">Real-time system log stream</p>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold ${log.level === "WARNING" ? "text-amber-600" : "text-sky-700"}`}>
                        [{log.level}] {log.component}
                      </span>
                      <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                    </div>
                    <div className="text-slate-700">{log.message}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">Loading execution audit...</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
