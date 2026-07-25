"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, Cpu, Zap, Lock, Sparkles, RefreshCw } from "lucide-react";

export const WhyUsSection: React.FC = () => {
  const points = [
    {
      title: "Zero-Latency Stream Processing",
      desc: "Designed to ingest high-frequency e-commerce transactional data with minimal CPU overhead.",
      icon: Zap,
    },
    {
      title: "Enterprise Data Profiling",
      desc: "Automated statistical profiling detects anomalies, missing fields, and duplicate records instantly.",
      icon: Cpu,
    },
    {
      title: "Strict TypeScript Safety",
      desc: "Full end-to-end type safety eliminating runtime type mismatches across client and API bounds.",
      icon: ShieldCheck,
    },
    {
      title: "Production Containerization",
      desc: "Docker Compose environment pre-configured for seamless local and cloud deployments.",
      icon: Lock,
    },
    {
      title: "Subtle Futuristic Design",
      desc: "Custom glassmorphism, glowing micro-animations, and fluid Framer Motion spring physics.",
      icon: Sparkles,
    },
    {
      title: "Continuous Pipeline Validation",
      desc: "Integrated data validation rules ensure data quality before feeding downstream analytics.",
      icon: RefreshCw,
    },
  ];

  return (
    <SectionContainer id="why-us" gridBg={true}>
      <AnimatedHeading
        badge="Competitive Advantage"
        title="Why Enterprise Leaders Choose"
        gradientTitle="IntelliCommerce"
        subtitle="Bridging the gap between raw data streams and executive-ready decision intelligence."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((p) => {
          const Icon = p.icon;
          return (
            <GlassCard key={p.title} glow="cyan" className="p-6">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
            </GlassCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
