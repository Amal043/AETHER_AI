"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fetchMlModels, API_BASE_URL } from "@/lib/api-client";
import { Cpu, Database, RefreshCw, CheckCircle2, Award, Zap } from "lucide-react";
import Link from "next/link";

export default function MLModelsPage() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [retraining, setRetraining] = useState(false);

  const loadModels = () => {
    setLoading(true);
    fetchMlModels()
      .then((res) => setModels(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleRetrain = async () => {
    setRetraining(true);
    try {
      await fetch(`${API_BASE_URL}/api/v1/ml/train`, { method: "POST" });
      loadModels();
    } catch (err) {
      console.error(err);
    } finally {
      setRetraining(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <Cpu className="w-3.5 h-3.5 text-sky-500" />
              Machine Learning Model Registry Matrix
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Production ML Engine Directory
            </h1>
          </div>

          <button
            onClick={handleRetrain}
            disabled={retraining}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-mono font-bold shadow-md shadow-sky-500/20 hover:shadow-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${retraining ? "animate-spin" : ""}`} />
            <span>{retraining ? "TRAINING 10 MODELS..." : "TRIGGER PIPELINE RETRAIN"}</span>
          </button>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((m) => {
            const isClassification = m.metrics.accuracy !== undefined;

            return (
              <div key={m.model_id} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm backdrop-blur-md hover:border-sky-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                      {m.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      v{m.version} Active
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-mono mb-1">{m.name}</h3>
                  <div className="text-xs font-mono text-sky-600 mb-4">{m.algorithm}</div>

                  {/* Metrics Summary */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 font-mono text-xs mb-4">
                    {isClassification ? (
                      <>
                        <div className="flex justify-between text-slate-600"><span>Accuracy</span><span className="font-bold text-slate-900">{(m.metrics.accuracy * 100).toFixed(1)}%</span></div>
                        <div className="flex justify-between text-slate-600"><span>Precision</span><span className="font-bold text-slate-900">{(m.metrics.precision * 100).toFixed(1)}%</span></div>
                        <div className="flex justify-between text-slate-600"><span>ROC AUC</span><span className="font-bold text-sky-600">{(m.metrics.roc_auc * 100).toFixed(1)}%</span></div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-slate-600"><span>MAE</span><span className="font-bold text-slate-900">{m.metrics.mae}</span></div>
                        <div className="flex justify-between text-slate-600"><span>RMSE</span><span className="font-bold text-slate-900">{m.metrics.rmse}</span></div>
                        <div className="flex justify-between text-slate-600"><span>R² Score</span><span className="font-bold text-emerald-600">{(m.metrics.r2_score * 100).toFixed(1)}%</span></div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[10px]">{m.filename}</span>
                  <Link href={`/model-performance?model=${m.model_id}`} className="text-sky-600 font-bold hover:underline">
                    View Performance →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
