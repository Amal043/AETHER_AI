"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { GradientText } from "@/components/ui/gradient-text";
import { ArrowRight, Sparkles, Database } from "lucide-react";

export const CTASection: React.FC = () => {
  return (
    <SectionContainer id="cta">
      <GlassCard glow="blue" className="p-10 sm:p-14 text-center max-w-4xl mx-auto border border-blue-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PHASE 1 COMPLETE FOUNDATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Ready to Elevate Your <GradientText variant="blue-cyan">Analytics Stream?</GradientText>
        </h2>

        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Test the real-time CSV ingestion engine, review data profiling metrics, and explore our enterprise architecture docs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedButton
            variant="glow"
            size="lg"
            onClick={() => {
              document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Run Live Pipeline Demo</span>
            <ArrowRight className="w-5 h-5" />
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Read Architecture Docs</span>
          </AnimatedButton>
        </div>
      </GlassCard>
    </SectionContainer>
  );
};
