"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "blue-cyan" | "indigo-cyan" | "purple-pink" | "white-slate";
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  variant = "indigo-cyan",
  className,
}) => {
  const gradients = {
    "indigo-cyan": "from-sky-700 via-blue-600 to-indigo-700",
    "blue-cyan": "from-sky-600 via-blue-700 to-indigo-800",
    "purple-pink": "from-purple-700 via-fuchsia-600 to-pink-600",
    "white-slate": "from-slate-900 via-slate-800 to-slate-700",
  };

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r inline-block font-extrabold",
        gradients[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
