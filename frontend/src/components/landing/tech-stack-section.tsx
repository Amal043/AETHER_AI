"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";

export const TechStackSection: React.FC = () => {
  const stack = [
    { category: "Frontend Framework", name: "Next.js 15 (App Router)", spec: "React 19 / TypeScript" },
    { category: "Styling & Tokens", name: "Tailwind CSS", spec: "Dark Luxury Palette & Glassmorphism" },
    { category: "Animation Engine", name: "Framer Motion & GSAP", spec: "Spring Physics & Parallax" },
    { category: "Backend API", name: "FastAPI", spec: "Python 3.11 Asynchronous Core" },
    { category: "ETL & Profiler", name: "Pandas + NumPy", spec: "Chunked CSV Ingestion & Profiling" },
    { category: "Validation & Config", name: "Pydantic v2 + Zod", spec: "Type Safety & Environment Settings" },
    { category: "Database Support", name: "SQLAlchemy 2.0", spec: "PostgreSQL Connection Config" },
    { category: "DevOps & Tooling", name: "Docker & GitHub Actions", spec: "Multi-stage Builds & CI Pipeline" },
  ];

  return (
    <SectionContainer id="tech-stack">
      <AnimatedHeading
        badge="Modern Tech Stack"
        title="Engineered with"
        gradientTitle="Best-in-Class Tools"
        subtitle="A bulletproof technology stack designed for scalability, zero runtime exceptions, and enterprise maintainability."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stack.map((item) => (
          <GlassCard key={item.name} glow="purple" className="p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white mb-2">{item.name}</h3>
              <p className="text-xs text-zinc-400 font-mono">{item.spec}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionContainer>
  );
};
