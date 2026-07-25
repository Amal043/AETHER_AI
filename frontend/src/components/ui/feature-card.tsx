"use client";

import React from "react";
import { GlassCard } from "./glass-card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  accent?: "blue" | "cyan" | "purple";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  badge,
  accent = "blue",
}) => {
  const accentGlow = {
    blue: "group-hover:text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 text-blue-400 bg-blue-500/10 border-blue-500/20",
    cyan: "group-hover:text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "group-hover:text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <GlassCard glow={accent} className="group relative p-7 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className={`p-3.5 rounded-xl border transition-all duration-300 ${accentGlow[accent]}`}>
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
          {badge && (
            <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>

      <motion.div
        className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors"
      >
        <span>Explore Module</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </motion.div>
    </GlassCard>
  );
};
