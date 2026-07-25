"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { ConversionLogisticsCommand } from "@/components/preview/conversion-logistics-command";
import { ReportsWorkflowConsole } from "@/components/preview/reports-workflow-console";
import { Terminal, Activity } from "lucide-react";

export const PreviewCommandSection: React.FC = () => {
  return (
    <SectionContainer id="preview">
      <AnimatedHeading
        badge="Command Center Telemetry"
        title="AETHER Conversion & Logistics"
        gradientTitle="Command System"
        subtitle="Sleek human-crafted light interface providing maximum visual signal with zero noise."
      />

      {/* Reference Image Section 2: Conversion & Logistics Command */}
      <div className="mb-16">
        <ConversionLogisticsCommand />
      </div>

      {/* Reference Image Section 3: AI-Powered Reports & Workflows */}
      <div className="mb-16">
        <ReportsWorkflowConsole />
      </div>

      {/* Terminal Audit Log */}
      <HolographicCard glowColor="cyan" className="p-8 max-w-5xl mx-auto bg-slate-900 border border-slate-800 text-slate-100 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-mono text-sky-300 font-semibold">
              aether-cli // alien-command-status --verbose
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>AETHER BOT CORE ACTIVE</span>
          </div>
        </div>

        <div className="bg-slate-950 font-mono text-xs p-6 rounded-xl border border-slate-800 text-slate-300 space-y-3 overflow-x-auto">
          <div className="text-slate-500"># System Audit Log - AETHER Alien Intelligence Engine</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SYSTEM]</span>
            <span className="text-white">FastAPI Core Backend REST Gateway Active</span>
            <span className="text-slate-500">... (0.008s)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SYSTEM]</span>
            <span className="text-white">CSVLoader Engine + SchemaDetector Operational</span>
            <span className="text-slate-500">... (0.005s)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SYSTEM]</span>
            <span className="text-white">AETHER Holographic Alien Analytics Bot Rendered</span>
            <span className="text-slate-500">... (0.002s)</span>
          </div>
          <div className="text-sky-400 pt-2">
            &gt; AETHER Engine status: 100% Operational. Awaiting Phase 2 trigger.
          </div>
        </div>
      </HolographicCard>
    </SectionContainer>
  );
};
