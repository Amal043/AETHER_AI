"use client";

import React from "react";
import { CommandNavbar } from "@/components/layout/command-navbar";
import { CommandFooter } from "@/components/layout/command-footer";
import { CommandBackground } from "@/components/common/command-bg";
import { HeroCommandSection } from "@/components/landing/hero-command";
import { FeaturesCommandSection } from "@/components/landing/features-command";
import { ArchitectureHudSection } from "@/components/landing/architecture-hud";
import { PipelineCommandSection } from "@/components/landing/pipeline-command";
import { WhyUsCommandSection } from "@/components/landing/why-us-command";
import { TechStackHudSection } from "@/components/landing/tech-stack-hud";
import { WorkflowCommandSection } from "@/components/landing/workflow-command";
import { PreviewCommandSection } from "@/components/landing/preview-command";
import { TestimonialsHudSection } from "@/components/landing/testimonials-hud";
import { CTACommandSection } from "@/components/landing/cta-command";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-sky-500 selection:text-white font-sans">
      <CommandNavbar />

      <main className="relative z-10">
        <div className="relative">
          <CommandBackground />
          <HeroCommandSection />
        </div>

        <FeaturesCommandSection />
        <ArchitectureHudSection />
        <PipelineCommandSection />
        <WhyUsCommandSection />
        <TechStackHudSection />
        <WorkflowCommandSection />
        <PreviewCommandSection />
        <TestimonialsHudSection />
        <CTACommandSection />
      </main>

      <CommandFooter />
    </div>
  );
}
