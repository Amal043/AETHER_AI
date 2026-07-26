"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { AnimatedButton } from "@/components/ui/animated-button";
import { fetchBackendHealth, HealthCheckResponse } from "@/lib/api-client";
import { HudBadge } from "@/components/hud/hud-badge";
import { AetherLogo } from "@/components/common/aether-logo";
import { Cpu, Menu, X, ArrowUpRight } from "lucide-react";

export const CommandNavbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);

  useEffect(() => {
    fetchBackendHealth()
      .then((res) => setHealth(res))
      .catch(() => setHealth(null));
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 20
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <AetherLogo className="w-10 h-10 group-hover:scale-105 transition-transform drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight font-mono">
              AETHER
            </span>
            <span className="text-[10px] text-sky-600 font-mono tracking-widest uppercase font-semibold">
              COMMERCE ENGINE
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-mono font-bold text-slate-700">
          <Link href="/overview" className="hover:text-sky-600 transition-colors">
            OVERVIEW
          </Link>
          <Link href="/sales" className="hover:text-sky-600 transition-colors">
            SALES
          </Link>
          <Link href="/forecast" className="hover:text-sky-600 transition-colors">
            FORECAST
          </Link>
          <Link href="/anomalies" className="hover:text-sky-600 transition-colors">
            ANOMALIES
          </Link>
          <Link href="/prediction-center" className="hover:text-sky-600 transition-colors">
            PREDICTIONS
          </Link>
          <Link href="/ai-insights" className="hover:text-sky-600 transition-colors">
            AI INSIGHTS
          </Link>
          <Link href="/ingestion" className="hover:text-sky-600 transition-colors">
            ETL UPLOAD
          </Link>
        </nav>

        {/* Status Badge & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <HudBadge
            label={health ? `API v${health.version} ONLINE` : "API CONNECTING..."}
            variant={health ? "emerald" : "indigo"}
          />
          <Link href="/overview">
            <AnimatedButton variant="glow" size="sm">
              <span>COMMAND DASHBOARD</span>
              <ArrowUpRight className="w-4 h-4" />
            </AnimatedButton>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-3 font-mono text-sm text-slate-800">
          <Link href="/overview" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            📊 OVERVIEW DASHBOARD
          </Link>
          <Link href="/sales" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            📈 SALES INTELLIGENCE
          </Link>
          <Link href="/forecast" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            🤖 FORECAST COMMAND HUB
          </Link>
          <Link href="/anomalies" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            🚨 ANOMALY MATRIX
          </Link>
          <Link href="/prediction-center" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            🎯 PREDICTION SANDBOX
          </Link>
          <Link href="/ai-insights" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            💡 AI EXECUTIVE BRIEFING
          </Link>
          <Link href="/segmentation" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            👥 CUSTOMER SEGMENTS
          </Link>
          <Link href="/recommendations" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            ⚡ AI RECOMMENDATIONS
          </Link>
          <Link href="/ingestion" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold hover:text-sky-600">
            📂 ETL INGESTION UPLOAD
          </Link>
        </div>
      )}
    </header>
  );
};
