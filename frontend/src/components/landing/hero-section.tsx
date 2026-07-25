"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { AnimatedButton } from "@/components/ui/animated-button";
import { GradientText } from "@/components/ui/gradient-text";
import { FloatingPanel } from "@/components/ui/floating-panel";
import { MetricCard } from "@/components/ui/metric-card";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  ShieldCheck,
  BarChart3,
  Layers,
  Database,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const [metricValue, setMetricValue] = useState(128450);
  const [activeTab, setActiveTab] = useState<"stream" | "schema" | "quality">("stream");
  const mounted = useIsMounted();

  const fadeUp = (delay = 0) =>
    mounted
      ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay } }
      : { initial: { opacity: 1, y: 0 } };

  const fadeScale = (delay = 0) =>
    mounted
      ? { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay } }
      : { initial: { opacity: 1, scale: 1 } };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricValue((prev) => prev + Math.floor(Math.random() * 45) + 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Floating Badge */}
      <motion.div
        {...fadeUp(0)}
        className="flex justify-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl text-xs font-mono text-slate-300 shadow-xl">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="text-slate-400">Phase 1 Release</span>
          <span className="text-slate-700">|</span>
          <span className="text-indigo-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Real-Time Data Pipeline Engine
          </span>
        </div>
      </motion.div>

      {/* Hero Headline & Subtitle */}
      <div className="text-center max-w-4xl mx-auto space-y-6 mb-14">
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          AI-Powered E-Commerce Funnel &{" "}
          <GradientText variant="indigo-cyan">Supply Chain Intelligence</GradientText>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Transform raw e-commerce streams into enterprise insights. Ingest CSV datasets, detect anomalies instantly, and profile data quality with production-grade precision.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <AnimatedButton
            variant="indigo"
            size="lg"
            onClick={() => {
              document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Explore Data Pipeline</span>
            <ArrowRight className="w-5 h-5" />
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Architecture Specs</span>
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Interactive Bespoke Hero Dashboard Preview */}
      <motion.div
        {...fadeScale(0.4)}
        className="relative mt-4 max-w-5xl mx-auto"
      >
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl relative z-10 overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/95">
          {/* Top Window Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 pl-2">
                intellicommerce.engine // live-stream-v1.0
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab("stream")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "stream"
                    ? "bg-indigo-600 text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Live Stream
              </button>
              <button
                onClick={() => setActiveTab("schema")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "schema"
                    ? "bg-indigo-600 text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Schema Profiler
              </button>
              <button
                onClick={() => setActiveTab("quality")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "quality"
                    ? "bg-indigo-600 text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Quality Score
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Real-Time Sales Ingestion"
              value={`$${metricValue.toLocaleString()}`}
              change="+18.4%"
              isPositive={true}
              icon={TrendingUp}
              subtitle="vs. prior hour stream"
              accentColor="blue"
            />
            <MetricCard
              title="Pipeline Throughput"
              value="42,800/sec"
              change="+12.1%"
              isPositive={true}
              icon={Zap}
              subtitle="Chunked CSV parsing"
              accentColor="cyan"
            />
            <MetricCard
              title="Data Completeness"
              value="99.85%"
              change="Optimal"
              isPositive={true}
              icon={ShieldCheck}
              subtitle="Zero Critical Anomalies"
              accentColor="purple"
            />
          </div>

          {/* Tab Content Display */}
          {activeTab === "stream" && (
            <div className="h-48 sm:h-56 w-full bg-slate-950/80 rounded-2xl p-5 border border-slate-800 relative overflow-hidden flex items-end gap-2">
              {[45, 62, 58, 80, 95, 70, 88, 110, 95, 120, 135, 125, 140, 160, 150, 175].map((height, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${(height / 180) * 100}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.04 }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600/30 via-cyan-500/60 to-cyan-400 group relative hover:brightness-125 transition-all"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-cyan-300 border border-slate-700 whitespace-nowrap pointer-events-none">
                    {height * 120} recs
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "schema" && (
            <div className="h-48 sm:h-56 w-full bg-slate-950/80 rounded-2xl p-4 border border-slate-800 overflow-y-auto space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-semibold pb-2 border-b border-slate-800 flex justify-between">
                <span>COLUMN NAME</span>
                <span>TYPE</span>
                <span>NULL RATIO</span>
              </div>
              {[
                { col: "order_id", type: "text", nulls: "0.0%" },
                { col: "customer_id", type: "text", nulls: "0.0%" },
                { col: "category", type: "categorical", nulls: "0.2%" },
                { col: "sales_amount", type: "numeric", nulls: "0.0%" },
                { col: "order_date", type: "datetime", nulls: "0.0%" },
              ].map((row) => (
                <div key={row.col} className="flex justify-between items-center py-1 text-slate-300 border-b border-slate-900">
                  <span className="text-white">{row.col}</span>
                  <span className="text-indigo-400">{row.type}</span>
                  <span className="text-emerald-400">{row.nulls}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quality" && (
            <div className="h-48 sm:h-56 w-full bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center space-y-3">
              <div className="text-4xl font-extrabold font-mono text-emerald-400">98.4 / 100</div>
              <div className="text-sm font-medium text-slate-200">Overall Dataset Quality Score</div>
              <div className="text-xs text-slate-400 max-w-md">
                Calculated dynamically from zero missing key columns, negligible duplicate ratio (0.01%), and verified UTF-8 encoding.
              </div>
            </div>
          )}
        </div>

        {/* Floating Side Cards */}
        <FloatingPanel className="hidden lg:block absolute -top-8 -left-12 z-20 w-60" delay={0}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Funnel Optimization</div>
              <div className="text-[11px] text-slate-400 font-mono">Conversion: 4.82%</div>
            </div>
          </div>
        </FloatingPanel>

        <FloatingPanel className="hidden lg:block absolute -bottom-6 -right-10 z-20 w-64" delay={2}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Supply Chain Profiling</div>
              <div className="text-[11px] text-emerald-400 font-mono">Status: 100% In-Sync</div>
            </div>
          </div>
        </FloatingPanel>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-14">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs font-mono text-slate-400 cursor-pointer"
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
};
