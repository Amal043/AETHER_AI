"use client";

import React from "react";
import Link from "next/link";
import { Database, UploadCloud, RefreshCw, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onRefresh?: () => void;
  icon?: React.ElementType;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Dataset Available",
  description = "No uploaded dataset or database records were detected. Please upload a CSV dataset via the Ingestion ETL pipeline to activate live telemetry.",
  actionText = "LAUNCH CSV INGESTION PIPELINE",
  actionHref = "/ingestion",
  onRefresh,
  icon: Icon = Database,
}) => {
  return (
    <div className="w-full p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-8">
      <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 mb-4 shadow-inner">
        <Icon className="w-8 h-8 animate-pulse text-sky-600" />
      </div>

      <h3 className="text-xl font-bold font-mono text-slate-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-md mb-6">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-mono text-xs font-bold shadow-md shadow-sky-500/20 hover:shadow-lg transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{actionText}</span>
          </Link>
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-sky-600" />
            <span>RE-SCAN DATABASE</span>
          </button>
        )}
      </div>
    </div>
  );
};
