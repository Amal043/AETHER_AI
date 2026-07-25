"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { Server, Database, Cpu, Layout, CheckCircle2 } from "lucide-react";

export const ArchitectureHudSection: React.FC = () => {
  const layers = [
    {
      step: "PHASE 01",
      title: "Holographic Client HUD",
      tech: "Next.js 15 (App Router) + TypeScript + Framer Motion + Tailwind",
      desc: "Delivers zero-hydration-error, ultra-responsive UI inspired by Apple and Stripe human design systems.",
      icon: Layout,
      glow: "cyan" as const,
    },
    {
      step: "PHASE 02",
      title: "Asynchronous REST Gateway",
      tech: "FastAPI + Pydantic Settings + JSON Logger Middleware",
      desc: "High-performance Python 3.11 backend providing system health checks, CORS security rules, and custom exception handling.",
      icon: Server,
      glow: "indigo" as const,
    },
    {
      step: "PHASE 03",
      title: "ETL Stream & Quality Profiler",
      tech: "Pandas + Custom Delimiter & Encoding Inferencers",
      desc: "Processes CSV streams, detects delimiters and encodings, calculates duplicate ratios, and assesses data completeness.",
      icon: Cpu,
      glow: "magenta" as const,
    },
    {
      step: "PHASE 04",
      title: "Enterprise Relational Configuration",
      tech: "SQLAlchemy 2.0 + PostgreSQL Connection Pool",
      desc: "High-availability relational database connection pool configured for transactional persistence and query safety.",
      icon: Database,
      glow: "emerald" as const,
    },
  ];

  return (
    <SectionContainer id="architecture">
      <AnimatedHeading
        badge="Architectural Matrix"
        title="Engineered with Clean"
        gradientTitle="Production Foundations"
        subtitle="Adheres strictly to Clean Architecture, SOLID principles, reusable HUD component design, and zero-compromise TypeScript typing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <HolographicCard key={layer.step} glowColor={layer.glow} className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold font-mono text-slate-400">{layer.step}</span>
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-mono mb-2">{layer.title}</h3>
                <div className="text-xs font-mono text-sky-700 mb-4 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 inline-block font-semibold">
                  {layer.tech}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{layer.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Clean Architecture Standard</span>
              </div>
            </HolographicCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
