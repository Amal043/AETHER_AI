"use client";

import React from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  Users,
  ShoppingBag,
  Truck,
  Boxes,
  LineChart,
  Bot,
} from "lucide-react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Customer Analytics",
      description: "Segment user journeys, analyze churn propensity, and track cohort retention with granular event attribution.",
      icon: Users,
      badge: "Behavior Engine",
      accent: "indigo" as const,
    },
    {
      title: "Sales Analytics",
      description: "Real-time revenue monitoring, GMV tracking, basket size analysis, and dynamic order volume metrics.",
      icon: ShoppingBag,
      badge: "Revenue Stream",
      accent: "cyan" as const,
    },
    {
      title: "Supply Chain Intelligence",
      description: "Monitor fulfillment latency, warehouse node throughput, shipping carrier performance, and bottleneck alerts.",
      icon: Truck,
      badge: "Logistics Hub",
      accent: "purple" as const,
    },
    {
      title: "Inventory Intelligence",
      description: "Automated stockout risk calculation, SKU velocity metrics, economic order quantity optimization.",
      icon: Boxes,
      badge: "Stock Profiler",
      accent: "indigo" as const,
    },
    {
      title: "Trend Forecasting",
      description: "Predictive demand curves, seasonal elasticity modeling, and dynamic price sensitivity simulations.",
      icon: LineChart,
      badge: "Predictive Core",
      accent: "cyan" as const,
    },
    {
      title: "AI Quality Reports",
      description: "Automated executive summary generation, data quality scoring, and outlier detection reporting.",
      icon: Bot,
      badge: "Intelligent Insights",
      accent: "purple" as const,
    },
  ];

  return (
    <SectionContainer id="features">
      <AnimatedHeading
        badge="Enterprise Capabilities"
        title="Modular Intelligence for"
        gradientTitle="E-Commerce Scale"
        subtitle="Designed from the ground up for high-frequency data streams, multi-channel commerce, and end-to-end supply chain visibility."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => (
          <FeatureCard
            key={feat.title}
            title={feat.title}
            description={feat.description}
            icon={feat.icon}
            badge={feat.badge}
            accent={feat.accent === "indigo" ? "blue" : feat.accent}
          />
        ))}
      </div>
    </SectionContainer>
  );
};
