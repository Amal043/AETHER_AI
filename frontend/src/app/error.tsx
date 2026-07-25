"use client";

import React, { useEffect } from "react";
import { HolographicCard } from "@/components/hud/holographic-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex items-center justify-center p-6 font-mono">
      <HolographicCard glowColor="magenta" className="p-8 max-w-md text-center border border-rose-500/30">
        <AlertTriangle className="w-10 h-10 mx-auto text-rose-400 mb-4 animate-pulse" />
        <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">Command Center Warning</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          {error?.message || "An unexpected telemetry exception occurred in the UI stream."}
        </p>
        <AnimatedButton variant="glow" onClick={() => reset()} className="mx-auto text-xs">
          <RefreshCw className="w-4 h-4" />
          <span>REBOOT STREAM</span>
        </AnimatedButton>
      </HolographicCard>
    </div>
  );
}
