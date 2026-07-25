"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Server, Database, Cpu, Layout, CheckCircle2 } from "lucide-react";

export const ArchitectureSection: React.FC = () => {
  const layers = [
    {
      step: "01",
      title: "Client & Presentation Layer",
      tech: "Next.js 15 (App Router) + TypeScript + Framer Motion",
      desc: "Delivers a zero-hydration-error, ultra-responsive UI inspired by Linear, Stripe, and Vercel design systems.",
      icon: Layout,
    },
    {
      step: "02",
      title: "Backend API Foundation",
      tech: "FastAPI + Pydantic Settings + Structured Logging",
      desc: "High-performance asynchronous REST backend providing system health checks, CORS policy control, and error handling.",
      icon: Server,
    },
    {
      step: "03",
      title: "ETL & Profiling Engine",
      tech: "Pandas + Custom Schema & Quality Detectors",
      desc: "Processes CSV streams, detects delimiters and encodings, calculates duplicate ratios, and assesses data completeness.",
      icon: Cpu,
    },
    {
      step: "04",
      title: "Data Store Configuration",
      tech: "SQLAlchemy 2.0 + PostgreSQL Support",
      desc: "Enterprise relational database connection pool configured for high-availability transactional persistence.",
      icon: Database,
    },
  ];

  return (
    <SectionContainer id="architecture" gridBg={true}>
      <AnimatedHeading
        badge="Enterprise Blueprint"
        title="Built on Clean"
        gradientTitle="Production Architecture"
        subtitle="Adheres to Clean Architecture, SOLID principles, reusable component design, and zero-compromise TypeScript typing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <GlassCard key={layer.step} glow="blue" className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold font-mono text-zinc-700">{layer.step}</span>
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{layer.title}</h3>
                <div className="text-xs font-mono text-cyan-400 mb-4 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 inline-block">
                  {layer.tech}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{layer.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Clean Architecture Standard</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
