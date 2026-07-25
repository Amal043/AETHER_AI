"use client";

import React from "react";

interface HudBadgeProps {
  label: string;
  variant?: "cyan" | "indigo" | "magenta" | "emerald";
  className?: string;
}

export const HudBadge: React.FC<HudBadgeProps> = ({
  label,
  variant = "cyan",
  className = "",
}) => {
  const styles = {
    cyan: "bg-sky-50 text-sky-700 border-sky-200 shadow-sm",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm",
    magenta: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 shadow-sm",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
  };

  const dots = {
    cyan: "bg-sky-500 shadow-[0_0_8px_#0284c7]",
    indigo: "bg-indigo-500 shadow-[0_0_8px_#4f46e5]",
    magenta: "bg-fuchsia-500 shadow-[0_0_8px_#d946ef]",
    emerald: "bg-emerald-500 shadow-[0_0_8px_#059669]",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase ${styles[variant]} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full animate-pulse ${dots[variant]}`} />
      <span>{label}</span>
    </div>
  );
};
