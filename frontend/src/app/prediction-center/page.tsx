"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fetchMlModels, predictModel } from "@/lib/api-client";
import { Cpu, Zap, Sliders, ArrowRight } from "lucide-react";

export default function PredictionCenterPage() {
  const [models, setModels] = useState<any[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string>("customer_purchase");
  const [activeModel, setActiveModel] = useState<any>(null);
  const [featureInputs, setFeatureInputs] = useState<Record<string, number>>({});
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    fetchMlModels().then((res) => {
      setModels(res.data);
      if (res.data.length > 0) {
        const initial = res.data[0];
        setSelectedModelId(initial.model_id);
        setActiveModel(initial);
        initInputs(initial);
      }
    });
  }, []);

  const initInputs = (model: any) => {
    const defaults: Record<string, number> = {};
    (model.feature_names || []).forEach((feat: string) => {
      defaults[feat] = 10;
    });
    setFeatureInputs(defaults);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const found = models.find((m) => m.model_id === modelId);
    if (found) {
      setActiveModel(found);
      initInputs(found);
      setPredictionResult(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedModelId) return;
    setPredicting(true);
    try {
      const res = await predictModel(selectedModelId, featureInputs);
      setPredictionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm mb-3">
              <Zap className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Real-Time Inference and Vector Sandbox
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Prediction Command Center
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-500 font-semibold">Select Model:</span>
            <select
              value={selectedModelId}
              onChange={(e) => handleModelChange(e.target.value)}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Vector Controls */}
          <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold font-mono text-slate-900 mb-1 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" /> Vector Feature Controls
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-mono">
              Adjust input vector dimensions for model inference
            </p>

            {activeModel && (
              <div className="space-y-4 mb-6">
                {activeModel.feature_names?.map((feat: string) => (
                  <div key={feat} className="font-mono text-xs">
                    <div className="flex justify-between text-slate-700 mb-1">
                      <span className="font-bold uppercase">{feat}</span>
                      <span className="text-indigo-600 font-bold">{featureInputs[feat] ?? 0}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={2000}
                      value={featureInputs[feat] ?? 0}
                      onChange={(e) =>
                        setFeatureInputs({
                          ...featureInputs,
                          [feat]: Number(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={predicting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-mono text-xs font-bold shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{predicting ? "RUNNING MODEL INFERENCE..." : "EXECUTE REAL-TIME PREDICTION"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Prediction Telemetry Output */}
          <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold font-mono text-slate-900 mb-1 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-600" /> Prediction Output and Telemetry
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-mono">
                Model confidence score and predicted target class
              </p>

              {predictionResult ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md font-mono text-center">
                    <div className="text-xs text-indigo-300 font-bold uppercase mb-2">Predicted Model Value</div>
                    <div className="text-4xl font-extrabold text-white mb-2">
                      {predictionResult.prediction}
                    </div>
                    <div className="text-xs text-emerald-400 font-bold">
                      Confidence Score: {(predictionResult.confidence_score * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 font-mono text-xs">
                    <div className="text-slate-500 font-bold uppercase mb-2">Input Vector Payload Used:</div>
                    <pre className="text-[11px] text-slate-700 overflow-x-auto">
                      {JSON.stringify(predictionResult.features_used, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400 font-mono text-xs">
                  Adjust features on the left and click execute to run inference.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
