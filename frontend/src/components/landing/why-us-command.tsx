"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { ShieldCheck, Cpu, Zap, Lock, Sparkles, RefreshCw } from "lucide-react";

export const WhyUsCommandSection: React.FC = () => {
  const points = [
    {
      title: "Zero-Latency Stream Ingestion",
      desc: "Designed to process high-frequency e-commerce transactional data with minimal CPU overhead.",
      icon: Zap,
      glow: "cyan" as const,
    },
    {
      title: "Enterprise Data Profiling",
      desc: "Automated statistical profiling detects anomalies, missing fields, and duplicate records instantly.",
      icon: Cpu,
      glow: "indigo" as const,
    },
    {
      title: "Strict TypeScript Safety",
      desc: "Full end-to-end type safety eliminating runtime type mismatches across client and API bounds.",
      icon: ShieldCheck,
      glow: "emerald" as const,
    },
    {
      title: "Production Containerization",
      desc: "Docker Compose environment pre-configured for seamless local and cloud deployments.",
      icon: Lock,
      glow: "magenta" as const,
    },
    {
      title: "AETHER Holographic UI",
      desc: "Custom glassmorphism, scanning light sweeps, and fluid 60FPS Framer Motion animations.",
      icon: Sparkles,
      glow: "cyan" as const,
    },
    {
      title: "Continuous Pipeline Audit",
      desc: "Integrated data validation rules ensure data quality before feeding downstream analytics.",
      icon: RefreshCw,
      glow: "indigo" as const,
    },
  ];

  return (
    <SectionContainer id="why-us">
      <AnimatedHeading
        badge="Competitive Advantage"
        title="Why Enterprise Pioneers Choose"
        gradientTitle="IntelliCommerce"
        subtitle="Bridging the gap between raw e-commerce streams and autonomous decision intelligence."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((p) => {
          const Icon = p.icon;
          return (
            <HolographicCard key={p.title} glowColor={p.glow} className="p-6 bg-white border border-slate-200">
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 w-fit mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-mono mb-2">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{p.desc}</p>
            </HolographicCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
