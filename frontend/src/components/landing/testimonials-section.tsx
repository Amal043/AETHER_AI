"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Elena Rostova",
      role: "VP of Global Supply Chain",
      company: "Apex Global Commerce",
      content: "IntelliCommerce transformed how we handle multi-country inventory streams. The real-time profiling engine caught critical null data before it corrupted our forecasts.",
      avatar: "ER",
    },
    {
      name: "Marcus Vance",
      role: "Head of Data Engineering",
      company: "Strata Logistics",
      content: "The clean architecture and zero-hydration UI feel incredible. It performs at scale and cut our pipeline setup time down from weeks to a single afternoon.",
      avatar: "MV",
    },
    {
      name: "Sophia Chen",
      role: "Director of Analytics",
      company: "Veloce Direct",
      content: "Finally a platform that feels like Apple and Stripe designed it. The data completeness scoring gives our executive team immediate confidence.",
      avatar: "SC",
    },
  ];

  return (
    <SectionContainer id="testimonials" gridBg={true}>
      <AnimatedHeading
        badge="Executive Feedback"
        title="Trusted by Data &"
        gradientTitle="Commerce Pioneers"
        subtitle="Fictional demo testimonials illustrating enterprise feedback from industry leaders."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <GlassCard key={t.name} glow="purple" className="p-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-zinc-700 mb-3" />
              <p className="text-sm text-zinc-300 italic leading-relaxed mb-6">&quot;{t.content}&quot;</p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs text-zinc-500">{t.role} · {t.company}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionContainer>
  );
};
