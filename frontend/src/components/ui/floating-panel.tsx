"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  className,
  delay = 0,
  duration = 6,
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      className={cn("glass-panel rounded-2xl p-4 shadow-2xl border border-white/10", className)}
    >
      {children}
    </motion.div>
  );
};
