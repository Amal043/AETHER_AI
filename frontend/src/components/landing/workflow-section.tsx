"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Upload, FileSearch, ShieldAlert, FileText } from "lucide-react";

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Data Stream Ingestion",
      desc: "Upload CSV data streams or connect external API feeds. Automated delimiter and encoding detection handles messy raw files.",
      icon: Upload,
    },
    {
      num: "02",
      title: "Dynamic Schema Detection",
      desc: "Columns are categorized into granular data types (numeric, datetime, categorical, boolean, text) along with null ratio calculation.",
      icon: FileSearch,
    },
    {
      num: "03",
      title: "Quality Profiling & Anomaly Checks",
      desc: "Detect duplicate rows, compute completeness scores, evaluate memory footprint, and flag critical schema violations.",
      icon: ShieldAlert,
    },
    {
      num: "04",
      title: "Structured Report Generation",
      desc: "Produces clean JSON data quality reports with actionable recommendations ready for executive review or downstream ETL.",
      icon: FileText,
    },
  ];

  return (
    <SectionContainer id="workflow" gridBg={true}>
      <AnimatedHeading
        badge="Execution Steps"
        title="End-to-End Analytics"
        gradientTitle="Pipeline Workflow"
        subtitle="How IntelliCommerce transforms messy e-commerce streams into structured, validated intelligence."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <GlassCard key={step.num} glow="blue" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-mono text-blue-400">{step.num}</span>
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
