"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { Star, Quote } from "lucide-react";

export const TestimonialsHudSection: React.FC = () => {
  const testimonials = [
    {
      name: "Elena Rostova",
      role: "VP of Global Supply Chain",
      company: "Apex Global Commerce",
      content: "IntelliCommerce transformed how we handle multi-country inventory streams. The real-time profiling engine caught critical null data before it corrupted our forecasts.",
      avatar: "ER",
      glow: "cyan" as const,
    },
    {
      name: "Marcus Vance",
      role: "Head of Data Engineering",
      company: "Strata Logistics",
      content: "The clean architecture and zero-hydration UI feel incredible. It performs at scale and cut our pipeline setup time down from weeks to a single afternoon.",
      avatar: "MV",
      glow: "indigo" as const,
    },
    {
      name: "Sophia Chen",
      role: "Director of Analytics",
      company: "Veloce Direct",
      content: "Finally a platform that feels like Apple and Stripe designed it. The data completeness scoring gives our executive team immediate confidence.",
      avatar: "SC",
      glow: "magenta" as const,
    },
  ];

  return (
    <SectionContainer id="testimonials">
      <AnimatedHeading
        badge="Enterprise Feedback"
        title="Trusted by Commerce"
        gradientTitle="AI Pioneers"
        subtitle="Fictional demo telemetry feedback from industry leaders."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <HolographicCard key={t.name} glowColor={t.glow} className="p-7 bg-white border border-slate-200 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-xs text-slate-700 italic leading-relaxed mb-6 font-sans">&quot;{t.content}&quot;</p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-md">
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 font-mono">{t.name}</div>
                <div className="text-[11px] text-slate-500">{t.role} · {t.company}</div>
              </div>
            </div>
          </HolographicCard>
        ))}
      </div>
    </SectionContainer>
  );
};
