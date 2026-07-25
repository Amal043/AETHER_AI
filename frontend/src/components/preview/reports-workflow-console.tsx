"use client";

import React from "react";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import { FileText, Cpu, Database, ShieldCheck } from "lucide-react";

export const ReportsWorkflowConsole: React.FC = () => {
  const workflowNodes = [
    { step: "01", title: "Raw Data Ingestion", desc: "Multi-channel CSV streams", icon: Database, color: "bg-sky-50 border-sky-200 text-sky-700" },
    { step: "02", title: "Schema Inferencer", desc: "Type & null ratio detector", icon: Cpu, color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
    { step: "03", title: "Quality & Duplicate Profiler", desc: "Anomaly & duplicate auditor", icon: ShieldCheck, color: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700" },
    { step: "04", title: "Executive Report Output", desc: "AI synthesis & recommendations", icon: FileText, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>AI-POWERED BUSINESS REPORTS & WORKFLOW CONSOLE</span>
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Automated Executive Telemetry Synthesis & Workflow Pipeline Nodes
          </p>
        </div>
        <HudBadge label="WORKFLOW MATRIX IN-SYNC" variant="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Workflow Flowchart Matrix */}
        <div className="lg:col-span-7">
          <HolographicCard glowColor="indigo" className="p-6 h-full bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase">Automated Pipeline Node Flowchart</span>
              <span className="text-[10px] font-mono text-sky-600 font-bold">4 Active Nodes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {workflowNodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.step} className={`p-4 rounded-xl border ${node.color} space-y-2 relative group hover:shadow-md transition-all`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] font-bold">{node.step}</span>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">{node.title}</div>
                    <p className="text-[11px] text-slate-600 font-sans">{node.desc}</p>
                  </div>
                );
              })}
            </div>
          </HolographicCard>
        </div>

        {/* Right: Executive AI Synthesis Report Screen */}
        <div className="lg:col-span-5">
          <HolographicCard glowColor="emerald" className="p-6 bg-white border border-slate-200 shadow-md font-mono">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 uppercase">Executive AI Synthesis</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                Score: 98.4/100
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-sans text-xs leading-relaxed">
                <span className="font-mono text-emerald-700 font-bold block mb-1">AETHER Synthesis Summary:</span>
                Multi-channel transactional stream ingested successfully. Zero critical null anomalies detected. Recommended action: allocate +15% safety stock to Sector 75 node.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-[10px] text-slate-500 font-sans">Projected GMV Lift</div>
                  <div className="text-xl font-bold text-sky-700 font-mono">+18.4%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="text-[10px] text-slate-500 font-sans">Data Completeness</div>
                  <div className="text-xl font-bold text-emerald-700 font-mono">99.85%</div>
                </div>
              </div>
            </div>
          </HolographicCard>
        </div>

      </div>
    </div>
  );
};
