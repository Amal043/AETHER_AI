"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { HolographicCard } from "@/components/hud/holographic-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { HudBadge } from "@/components/hud/hud-badge";
import { ArrowRight, Database } from "lucide-react";

export const CTACommandSection: React.FC = () => {
  return (
    <SectionContainer id="cta">
      <HolographicCard glowColor="cyan" className="p-10 sm:p-14 text-center max-w-4xl mx-auto bg-white border border-sky-200 shadow-xl">
        <div className="flex justify-center mb-6">
          <HudBadge label="AETHER INTELLIGENCE ENGINE" variant="cyan" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight font-mono">
          READY TO INITIALIZE YOUR <br />
          <span className="cyan-text-gradient">COMMERCE STREAM?</span>
        </h2>

        <p className="text-sm sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed font-sans">
          Test the real-time CSV ingestion engine, review data profiling metrics, and explore our enterprise architecture specs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedButton
            variant="glow"
            size="lg"
            onClick={() => {
              document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>RUN LIVE PIPELINE DEMO</span>
            <ArrowRight className="w-5 h-5" />
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Database className="w-4 h-4 text-sky-600" />
            <span>COMMAND SPECS</span>
          </AnimatedButton>
        </div>
      </HolographicCard>
    </SectionContainer>
  );
};
