"use client";

import React from "react";

interface ConfusionMatrixProps {
  matrix: number[][];
}

export const ConfusionMatrixChart: React.FC<ConfusionMatrixProps> = ({ matrix }) => {
  if (!matrix || matrix.length < 2) {
    return (
      <div className="p-6 text-center text-xs font-mono text-slate-400 border border-dashed border-slate-200 rounded-xl">
        Standard binary confusion matrix requires 2x2 dimension array.
      </div>
    );
  }

  const tn = matrix[0][0] || 0;
  const fp = matrix[0][1] || 0;
  const fn = matrix[1][0] || 0;
  const tp = matrix[1][1] || 0;
  const total = tn + fp + fn + tp || 1;

  return (
    <div className="w-full">
      <div className="text-xs font-mono text-slate-500 font-bold uppercase mb-4">Confusion Matrix Matrix Grid</div>
      <div className="grid grid-cols-2 gap-3 font-mono text-xs text-center">
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <div className="text-[10px] text-emerald-600 font-bold uppercase mb-1">True Negative (TN)</div>
          <div className="text-2xl font-extrabold text-emerald-800">{tn}</div>
          <div className="text-[10px] text-emerald-600 mt-1">{((tn / total) * 100).toFixed(1)}%</div>
        </div>
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200">
          <div className="text-[10px] text-rose-600 font-bold uppercase mb-1">False Positive (FP)</div>
          <div className="text-2xl font-extrabold text-rose-800">{fp}</div>
          <div className="text-[10px] text-rose-600 mt-1">{((fp / total) * 100).toFixed(1)}%</div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
          <div className="text-[10px] text-amber-600 font-bold uppercase mb-1">False Negative (FN)</div>
          <div className="text-2xl font-extrabold text-amber-800">{fn}</div>
          <div className="text-[10px] text-amber-600 mt-1">{((fn / total) * 100).toFixed(1)}%</div>
        </div>
        <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
          <div className="text-[10px] text-sky-600 font-bold uppercase mb-1">True Positive (TP)</div>
          <div className="text-2xl font-extrabold text-sky-800">{tp}</div>
          <div className="text-[10px] text-sky-600 mt-1">{((tp / total) * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};
