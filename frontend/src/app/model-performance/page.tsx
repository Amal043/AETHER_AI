"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROCChart } from "@/components/ml/ROCChart";
import { ConfusionMatrixChart } from "@/components/ml/ConfusionMatrixChart";
import { FeatureImportanceChart } from "@/components/ml/FeatureImportanceChart";
import { fetchMlModels } from "@/lib/api-client";
import { Award } from "lucide-react";
import { useSearchParams } from "next/navigation";

function PerformanceContent() {
  const searchParams = useSearchParams();
  const selectedModelId = searchParams.get("model") || "customer_purchase";
  
  const [models, setModels] = useState<any[]>([]);
  const [activeModel, setActiveModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMlModels()
      .then((res) => {
        setModels(res.data);
        const found = res.data.find((m: any) => m.model_id === selectedModelId) || res.data[0];
        setActiveModel(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedModelId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
            <Award className="w-3.5 h-3.5 text-sky-500" />
            Machine Learning Model Evaluation Telemetry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
            Model Performance Suite
          </h1>
        </div>

        {/* Model Selector Dropdown */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-500 font-semibold">Active Model:</span>
          <select
            value={activeModel?.model_id || ""}
            onChange={(e) => {
              const found = models.find((m) => m.model_id === e.target.value);
              if (found) setActiveModel(found);
            }}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-sm font-bold text-slate-800"
          >
            {models.map((m) => (
              <option key={m.model_id} value={m.model_id}>
                {m.name} ({m.algorithm})
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeModel ? (
        <div className="space-y-8">
          {/* Header Specs Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <h2 className="text-xl font-bold font-mono text-slate-900">{activeModel.name}</h2>
                <div className="text-xs font-mono text-sky-600">{activeModel.algorithm} • Category: {activeModel.category}</div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Status: {activeModel.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  v{activeModel.version}
                </span>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              {activeModel.metrics.accuracy !== undefined ? (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">Accuracy</div>
                    <div className="text-lg font-bold text-slate-900">{(activeModel.metrics.accuracy * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">Precision</div>
                    <div className="text-lg font-bold text-slate-900">{(activeModel.metrics.precision * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">Recall</div>
                    <div className="text-lg font-bold text-slate-900">{(activeModel.metrics.recall * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">F1 Score</div>
                    <div className="text-lg font-bold text-sky-600">{(activeModel.metrics.f1_score * 100).toFixed(1)}%</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">MAE</div>
                    <div className="text-lg font-bold text-slate-900">{activeModel.metrics.mae}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">MSE</div>
                    <div className="text-lg font-bold text-slate-900">{activeModel.metrics.mse}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">RMSE</div>
                    <div className="text-lg font-bold text-slate-900">{activeModel.metrics.rmse}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-slate-500 mb-1">R² Score</div>
                    <div className="text-lg font-bold text-emerald-600">{(activeModel.metrics.r2_score * 100).toFixed(1)}%</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Evaluation Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeModel.metrics.roc_curve && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <ROCChart fpr={activeModel.metrics.roc_curve.fpr} tpr={activeModel.metrics.roc_curve.tpr} auc={activeModel.metrics.roc_auc} />
              </div>
            )}

            {activeModel.metrics.confusion_matrix && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <ConfusionMatrixChart matrix={activeModel.metrics.confusion_matrix} />
              </div>
            )}

            {activeModel.metrics.feature_importance && (
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <FeatureImportanceChart data={activeModel.metrics.feature_importance} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 font-mono text-xs">Loading model performance metrics...</div>
      )}
    </div>
  );
}

export default function ModelPerformancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <Suspense fallback={<div className="text-center py-32 text-slate-400 font-mono text-xs">Loading performance suite...</div>}>
        <PerformanceContent />
      </Suspense>
      <Footer />
    </div>
  );
}
