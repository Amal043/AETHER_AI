"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { uploadCsvFile, fetchEtlLogs } from "@/lib/api-client";
import { UploadCloud, CheckCircle2, FileText, Clipboard, Sparkles } from "lucide-react";

export default function IngestionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pastedCsvText, setPastedCsvText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"file" | "paste">("file");
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
    let targetFile = file;

    if (activeTab === "paste") {
      if (!pastedCsvText.trim()) {
        alert("Please paste your raw CSV content before executing upload.");
        return;
      }
      targetFile = new File([pastedCsvText], "pasted_dataset.csv", { type: "text/csv" });
    }

    if (!targetFile) return;

    setUploading(true);
    setReport(null);
    try {
      const res = await uploadCsvFile(targetFile);
      setReport(res.data || res);
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
            Automated Ingestion &amp; Quality Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
            ETL Data Pipeline Upload &amp; Audit
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* UPLOAD PANEL */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" /> CSV Dataset Ingestion
              </h3>

              {/* Mode Toggle Selector */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 font-mono text-[11px] font-bold">
                <button
                  onClick={() => setActiveTab("file")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${activeTab === "file" ? "bg-white text-sky-700 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                >
                  Choose File
                </button>
                <button
                  onClick={() => setActiveTab("paste")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${activeTab === "paste" ? "bg-white text-sky-700 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                >
                  Paste CSV Text
                </button>
              </div>
            </div>

            {activeTab === "file" ? (
              <div className="border-2 border-dashed border-sky-300 rounded-2xl p-8 text-center bg-sky-50/40 hover:bg-sky-50 transition-all mb-6">
                <UploadCloud className="w-10 h-10 text-sky-600 mx-auto mb-3 animate-bounce" />
                <input
                  type="file"
                  accept=".csv, text/csv, text/plain, application/vnd.ms-excel, */*"
                  id="fileUploadInput"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="fileUploadInput"
                  className="cursor-pointer text-xs font-mono font-bold text-sky-700 underline"
                >
                  Click to Browse Files (Supports .csv, .txt, all extensions)
                </label>
                {file && (
                  <div className="mt-3 text-xs font-mono font-bold text-slate-800 bg-white p-2 rounded-xl border border-slate-200 inline-block shadow-sm">
                    Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 mb-2">
                  <Clipboard className="w-3.5 h-3.5 text-indigo-600" /> Paste Raw CSV Content Below:
                </div>
                <textarea
                  rows={7}
                  value={pastedCsvText}
                  onChange={(e) => setPastedCsvText(e.target.value)}
                  placeholder={`order_id,customer_id,total_amount,order_date\n1001,5,450.00,2026-07-20\n1002,12,1250.50,2026-07-21`}
                  className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>
            )}

            <button
              disabled={(activeTab === "file" && !file) || (activeTab === "paste" && !pastedCsvText.trim()) || uploading}
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

          {/* AUDIT LOGS */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Pipeline Execution Audit Logs
              </h3>
              <p className="text-xs text-slate-500 mb-6">Real-time ETL execution history and validation reports</p>

              <div className="space-y-3 font-mono text-xs max-h-96 overflow-y-auto pr-2">
                {logs.length > 0 ? (
                  logs.map((log: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>{log.filename}</span>
                        <span className="text-emerald-600">Score: {log.quality_score}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Imported: {log.imported_rows} rows • Processed {log.timestamp}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 font-mono text-xs">No ETL execution logs recorded yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
