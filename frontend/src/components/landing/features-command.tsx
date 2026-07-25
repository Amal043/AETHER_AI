"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { HolographicCard } from "@/components/hud/holographic-card";
import { HudBadge } from "@/components/hud/hud-badge";
import {
  Users,
  LineChart,
  Truck,
  ShieldCheck,
  TrendingUp,
  Boxes,
} from "lucide-react";

export const FeaturesCommandSection: React.FC = () => {
  const capabilities = [
    {
      title: "Customer Intelligence",
      badge: "Segment Neural Engine",
      desc: "Analyzes customer cohorts, purchase frequencies, and drop-off points to maximize lifetime value (LTV).",
      icon: Users,
      glow: "cyan" as const,
    },
    {
      title: "Sales Telemetry",
      badge: "Real-time Stream",
      desc: "Live gross merchandise value (GMV) tracking, average order value (AOV) metrics, and product conversion rates.",
      icon: LineChart,
      glow: "indigo" as const,
    },
    {
      title: "Supply Chain Node",
      badge: "Autonomous Routing",
      desc: "Monitors warehouse stock levels, supplier fulfillment delays, and inventory turnover across distribution centers.",
      icon: Truck,
      glow: "magenta" as const,
    },
    {
      title: "ETL Stream Auditor",
      badge: "Data Profiling",
      desc: "FastAPI-powered statistical profiler detecting missing fields, null ratios, and duplicate records instantly.",
      icon: ShieldCheck,
      glow: "emerald" as const,
    },
    {
      title: "Demand Spike Forecast",
      badge: "Predictive AI",
      desc: "Predicts upcoming seasonal demand curves and warns before stockout anomalies impact revenue streams.",
      icon: TrendingUp,
      glow: "cyan" as const,
    },
    {
      title: "Inventory Matrix",
      badge: "SKU Velocity",
      desc: "Calculates stock movement velocity and highlights slow-moving inventory to optimize working capital.",
      icon: Boxes,
      glow: "indigo" as const,
    },
  ];

  return (
    <SectionContainer id="features">
      <AnimatedHeading
        badge="Command Modules"
        title="Autonomous Intelligence"
        gradientTitle="Capability Matrix"
        subtitle="Each module provides instant visual telemetry, allowing executive teams to act on supply chain and customer insights with speed."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <HolographicCard key={item.title} glowColor={item.glow} className="p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <HudBadge label={item.badge} variant={item.glow} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-mono mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </HolographicCard>
          );
        })}
      </div>
    </SectionContainer>
  );
};
