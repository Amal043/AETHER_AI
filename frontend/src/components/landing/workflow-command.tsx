"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { Upload, FileSearch, ShieldAlert, FileText } from "lucide-react";

export const WorkflowCommandSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Data Stream Ingestion",
      desc: "Upload CSV data streams or connect external API feeds. Automated delimiter and encoding detection handles raw multi-channel files.",
      icon: Upload,
      glow: "cyan" as const,
    },
    {
      num: "02",
      title: "Dynamic Schema Detection",
      desc: "Columns are categorized into granular data types (numeric, datetime, categorical, boolean, text) along with null ratio calculation.",
      icon: FileSearch,
      glow: "indigo" as const,
    },
    {
      num: "03",
      title: "Quality Profiling & Anomaly Checks",
      desc: "Detect duplicate rows, compute completeness scores, evaluate memory footprint, and flag critical schema violations.",
      icon: ShieldAlert,
      glow: "magenta" as const,
    },
    {
      num: "04",
      title: "Structured Telemetry Report",
      desc: "Produces clean JSON data quality reports with actionable recommendations ready for executive review or downstream ETL.",
      icon: FileText,
      glow: "emerald" as const,
    },
  ];

  return (
    <SectionContainer id="workflow">
      <AnimatedHeading
        badge="Execution Telemetry"
        title="End-to-End Analytics"
        gradientTitle="Pipeline Workflow"
        subtitle="How IntelliCommerce transforms raw e-commerce streams into structured, validated intelligence."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <HolographicCard key={step.num} glowColor={step.glow} className="p-6 bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-mono text-sky-600">{step.num}</span>
                  <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-mono mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.desc}</p>
              </div>
            </HolographicCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
