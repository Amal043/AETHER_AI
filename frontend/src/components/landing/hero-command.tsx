"use client";

import React from "react";
import { motion } from "framer-motion";
import { HudBadge } from "@/components/hud/hud-badge";
import { AlienBotPedestal } from "@/components/ai/alien-bot-pedestal";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowRight, ChevronDown, Database } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export const HeroCommandSection: React.FC = () => {
  const mounted = useIsMounted();

  // Before client hydration, render everything visible (no opacity:0).
  // After hydration, Framer Motion can animate normally.
  const fadeUp = (delay = 0) =>
    mounted
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        }
      : { initial: { opacity: 1, y: 0 } };

  const fadeScale = (delay = 0) =>
    mounted
      ? {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8, delay },
        }
      : { initial: { opacity: 1, scale: 1 } };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-28 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Top Ticker Badge */}
      <motion.div
        {...fadeUp(0)}
        className="flex justify-center mb-6"
      >
        <HudBadge label="AETHER // ALIEN LOGISTICS & CUSTOMER INTELLIGENCE ENGINE" variant="cyan" />
      </motion.div>

      {/* Headline & Subtitle */}
      <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-mono"
        >
          AETHER: ALIEN LOGISTICS & <br />
          <span className="cyan-text-gradient">CUSTOMER INTELLIGENCE ENGINE</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed font-sans"
        >
          Autonomous neural funnel profiling, real-time CSV data stream ingestion, and predictive supply chain telemetry engineered for enterprise performance.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <AnimatedButton
            variant="glow"
            size="lg"
            onClick={() => {
              document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>LAUNCH DATA PIPELINE</span>
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
        </motion.div>
      </div>

      {/* Programmatic Bioluminescent Animated Alien Bot */}
      <motion.div
        {...fadeScale(0.4)}
        className="mt-6"
      >
        <AlienBotPedestal />
      </motion.div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-12">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs font-mono font-semibold text-sky-600 cursor-pointer"
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>SCROLL TO EXPLORE COMMAND MODULES</span>
          <ChevronDown className="w-4 h-4 text-sky-600" />
        </motion.div>
      </div>
    </section>
  );
};
