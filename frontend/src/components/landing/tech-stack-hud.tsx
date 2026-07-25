"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";

export const TechStackHudSection: React.FC = () => {
  const stack = [
    { category: "Frontend Framework", name: "Next.js 15 (App Router)", spec: "React 19 / TypeScript 5" },
    { category: "Styling & System", name: "Tailwind CSS + Human Design", spec: "Porcelain & Light Glass UI" },
    { category: "Animation Engine", name: "Framer Motion & SVG Core", spec: "GPU-Accelerated 60FPS Physics" },
    { category: "Backend API Gateway", name: "FastAPI + Pydantic v2", spec: "Python 3.11 Asynchronous Core" },
    { category: "ETL & Profiler Engine", name: "Pandas + NumPy", spec: "Chunked CSV Stream Profiling" },
    { category: "Validation & Config", name: "Pydantic Settings + Zod", spec: "End-to-End Type Safety" },
    { category: "Database Configuration", name: "SQLAlchemy 2.0", spec: "PostgreSQL Pool Architecture" },
    { category: "DevOps & CI/CD", name: "Docker Compose & GitHub Actions", spec: "Multi-stage Production Builds" },
  ];

  return (
    <SectionContainer id="tech-stack">
      <AnimatedHeading
        badge="Quantum Tech Matrix"
        title="Engineered with"
        gradientTitle="Best-in-Class Foundation"
        subtitle="A bulletproof technology stack designed for enterprise scale, zero runtime exceptions, and maintainability."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stack.map((item) => (
          <HolographicCard key={item.name} glowColor="indigo" className="p-5 bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 font-bold block mb-1">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 font-mono mb-2">{item.name}</h3>
              <p className="text-xs text-slate-600 font-mono font-medium">{item.spec}</p>
            </div>
          </HolographicCard>
        ))}
      </div>
    </SectionContainer>
  );
};
