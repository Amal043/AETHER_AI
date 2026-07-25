"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "cyan" | "purple" | "gradient";
}

export const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  className,
  glowColor = "gradient",
}) => {
  const gradients = {
    blue: "from-blue-600 to-indigo-600",
    cyan: "from-cyan-500 to-blue-600",
    purple: "from-purple-600 to-pink-600",
    gradient: "from-blue-600 via-cyan-400 to-purple-600",
  };

  return (
    <div className={cn("relative group p-[1px] rounded-2xl overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
          gradients[glowColor]
        )}
      />
      <div className="relative bg-[#08080a] rounded-[15px] p-1">{children}</div>
    </div>
  );
};
