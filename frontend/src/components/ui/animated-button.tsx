"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "indigo" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant = "indigo", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-sky-500/50 disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden cursor-pointer";

    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5 font-mono font-bold",
      md: "px-5 py-2.5 text-sm gap-2 font-mono font-bold",
      lg: "px-7 py-3.5 text-sm sm:text-base gap-2.5 font-mono font-bold",
    };

    const variantStyles = {
      indigo:
        "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/30",
      secondary:
        "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm hover:border-slate-400 font-bold",
      outline:
        "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-sky-500 font-semibold",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-700 font-semibold",
      glow: "bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 border border-white/30",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
