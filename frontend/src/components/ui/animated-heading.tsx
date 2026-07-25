"use client";

import React from "react";
import { GradientText } from "./gradient-text";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  badge?: string;
  title: string;
  gradientTitle?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  badge,
  title,
  gradientTitle,
  subtitle,
  center = true,
  className,
}) => {
  return (
    <div className={cn("max-w-3xl mb-16", center ? "mx-auto text-center" : "text-left", className)}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-sky-50 text-sky-700 border border-sky-200 font-bold mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_6px_#0284c7]" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-mono">
        {title} {gradientTitle && <GradientText variant="blue-cyan">{gradientTitle}</GradientText>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
