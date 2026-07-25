"use client";

import React from "react";
import { motion } from "framer-motion";

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Animated Mesh Gradients */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 1.25, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -25, 35, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 left-10 w-[550px] h-[550px] bg-violet-600/14 rounded-full blur-[150px]"
      />

      {/* Modern Sub-Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
