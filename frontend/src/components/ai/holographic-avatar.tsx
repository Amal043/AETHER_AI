"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Radio } from "lucide-react";

export const HolographicAiAvatar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [aiMessageIndex, setAiMessageIndex] = useState(0);

  const messages = [
    "AURA-9 // Global Telemetry In Sync",
    "Fulfillment Latency: -14.2% Optimal",
    "Processing 42.8k CSV Streams/Sec",
    "Zero Anomaly Violations Detected",
  ];

  const handleNextInsight = () => {
    setAiMessageIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNextInsight}
    >
      {/* Outer Volumetric Glow Aura */}
      <motion.div
        animate={{
          scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.1, 1],
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-44 h-44 sm:w-56 sm:h-56 bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-pink-500/20 rounded-full blur-2xl pointer-events-none"
      />

      {/* Holographic Projection Beams (Top Rays) */}
      <motion.div
        animate={{ opacity: isHovered ? [0.4, 0.9, 0.4] : 0.3 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-12 w-32 h-20 bg-gradient-to-b from-cyan-400/20 to-transparent blur-md pointer-events-none clip-triangle"
      />

      {/* Main Outer Rotating Node Ring */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Ring 1 - Outer Counter Clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        />

        {/* Ring 2 - Inner Clockwise */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-2 border-indigo-500/40 border-t-pink-400 border-r-transparent"
        />

        {/* Ring 3 - Micro Orbital Ring */}
        <motion.div
          animate={{ rotate: -180, scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-5 rounded-full border border-cyan-300/30"
        />

        {/* Central Breathing Holographic Core */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : [0.95, 1.08, 0.95],
            boxShadow: isHovered
              ? "0 0 35px rgba(6, 182, 212, 0.8), 0 0 60px rgba(236, 72, 153, 0.5)"
              : "0 0 25px rgba(6, 182, 212, 0.5)",
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 flex items-center justify-center relative z-10 border border-white/40"
        >
          <Cpu className="w-8 h-8 text-white animate-pulse" />
          {/* Orbital Satellites */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] animate-ping" />
        </motion.div>
      </div>

      {/* Interactive Floating AI Speech Box */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mt-4 px-4 py-2 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5 max-w-xs text-center z-20"
      >
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
        <span className="text-xs font-mono text-cyan-200 tracking-wide">
          {messages[aiMessageIndex]}
        </span>
      </motion.div>
    </div>
  );
};
