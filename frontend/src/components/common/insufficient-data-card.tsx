"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, UploadCloud, FileSpreadsheet, ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

interface InsufficientDataCardProps {
  title: string;
  description?: string;
  requiredColumns: string[];
  suggestedAction?: string;
}

export const InsufficientDataCard: React.FC<InsufficientDataCardProps> = ({
  title,
  description = "No uploaded records were found matching the required data schema for this command module.",
  requiredColumns,
  suggestedAction = "Upload a CSV file containing the required column headers to unlock live analytics and predictions.",
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-200/80 shadow-sm backdrop-blur-md font-mono text-slate-800 my-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-3 flex-1">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300 mb-2">
              Insufficient Data Provided
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {description}
            </p>
          </div>

          {/* REQUIRED COLUMNS CHIPS */}
          <div className="pt-2 border-t border-amber-200/60">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-700" /> Required CSV Columns for this Feature:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {requiredColumns.map((col, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-bold text-slate-800 shadow-2xs font-mono"
                >
                  `{col}`
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-600 italic">
            {suggestedAction}
          </p>

          <div className="pt-2">
            <Link href="/ingestion">
              <AnimatedButton variant="glow" size="sm" className="inline-flex items-center gap-2">
                <UploadCloud className="w-4 h-4" />
                <span>Upload CSV Dataset</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
