"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glow?: "blue" | "cyan" | "purple" | "indigo" | "none";
  tilt?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = "none",
  tilt = true,
  ...props
}) => {
  const glowStyles = {
    none: "",
    blue: "hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.25)] hover:border-blue-500/40",
    indigo: "hover:shadow-[0_0_35px_-5px_rgba(99,102,241,0.3)] hover:border-indigo-500/40",
    cyan: "hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.25)] hover:border-cyan-500/40",
    purple: "hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.25)] hover:border-purple-500/40",
  };

  return (
    <motion.div
      whileHover={tilt ? { y: -3, scale: 1.008 } : {}}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card-interactive rounded-2xl p-6 relative overflow-hidden",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
