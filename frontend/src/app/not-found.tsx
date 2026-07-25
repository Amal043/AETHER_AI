"use client";

import React from "react";
import Link from "next/link";
import { HolographicCard } from "@/components/hud/holographic-card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex items-center justify-center p-6 font-mono">
      <HolographicCard glowColor="cyan" className="p-8 max-w-md text-center border border-cyan-500/30">
        <div className="text-4xl font-extrabold text-cyan-400 mb-2">404</div>
        <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wider">NODE SECTOR NOT FOUND</h2>
        <p className="text-xs text-slate-400 mb-6">The requested command center endpoint does not exist.</p>
        <Link href="/" className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold uppercase inline-block">
          RETURN TO COMMAND BASE
        </Link>
      </HolographicCard>
    </div>
  );
}
