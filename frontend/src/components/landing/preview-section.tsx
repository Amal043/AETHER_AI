"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Terminal, Activity } from "lucide-react";

export const PreviewSection: React.FC = () => {
  return (
    <SectionContainer id="preview">
      <AnimatedHeading
        badge="Platform Sneak Peek"
        title="Designed for Enterprise"
        gradientTitle="Power Users"
        subtitle="Sleek dark-mode aesthetic built to provide maximum signal with zero visual noise."
      />

      <GlassCard glow="cyan" className="p-8 max-w-5xl mx-auto border border-white/10">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-mono text-zinc-300 font-semibold">
              intellicommerce-cli // pipeline-status --verbose
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>SYSTEM STABLE</span>
          </div>
        </div>

        <div className="bg-zinc-950 font-mono text-xs p-6 rounded-xl border border-zinc-800 text-zinc-300 space-y-3 overflow-x-auto">
          <div className="text-zinc-500"># System Audit Log - Phase 1 Deliverables</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SUCCESS]</span>
            <span className="text-white">FastAPI Core Backend Initialized</span>
            <span className="text-zinc-500">... (0.012s)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SUCCESS]</span>
            <span className="text-white">CSVLoader Engine + SchemaDetector Ready</span>
            <span className="text-zinc-500">... (0.008s)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SUCCESS]</span>
            <span className="text-white">DataProfiler Quality Scoring Engine Active</span>
            <span className="text-zinc-500">... (0.005s)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">[SUCCESS]</span>
            <span className="text-white">Next.js 15 App Router Frontend Rendered</span>
            <span className="text-zinc-500">... (0.002s)</span>
          </div>
          <div className="text-cyan-400 pt-2">
            &gt; IntelliCommerce Analytics Phase 1 Engine status: 100% Operational. Awaiting Phase 2 trigger.
          </div>
        </div>
      </GlassCard>
    </SectionContainer>
  );
};
