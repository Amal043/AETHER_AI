"use client";

import React from "react";
import { GlassCard } from "./glass-card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  subtitle?: string;
  accentColor?: "blue" | "cyan" | "purple";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  accentColor = "blue",
  className,
}) => {
  const accentBorder = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <GlassCard glow={accentColor} className={cn("p-5 flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">{title}</span>
        {Icon && (
          <div className={cn("p-2 rounded-lg border", accentBorder[accentColor])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1">{value}</div>
        <div className="flex items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium px-2 py-0.5 rounded-full",
                isPositive ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"
              )}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          )}
          {subtitle && <span className="text-zinc-500">{subtitle}</span>}
        </div>
      </div>
    </GlassCard>
  );
};
