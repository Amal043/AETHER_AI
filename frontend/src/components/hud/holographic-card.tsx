"use client";

import React from "react";
import { motion } from "framer-motion";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "indigo" | "magenta" | "emerald";
  onClick?: () => void;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className = "",
  glowColor = "cyan",
  onClick,
}) => {
  const glowStyles = {
    cyan: "hover:border-sky-400 hover:shadow-[0_15px_35px_-5px_rgba(2,132,199,0.15)]",
    indigo: "hover:border-indigo-400 hover:shadow-[0_15px_35px_-5px_rgba(79,70,229,0.15)]",
    magenta: "hover:border-pink-400 hover:shadow-[0_15px_35px_-5px_rgba(217,70,239,0.15)]",
    emerald: "hover:border-emerald-400 hover:shadow-[0_15px_35px_-5px_rgba(5,150,105,0.15)]",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`relative rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Light Corner Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-slate-300 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-slate-300 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-slate-300 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-slate-300 rounded-br-sm pointer-events-none" />

      {children}
    </motion.div>
  );
};
