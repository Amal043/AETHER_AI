"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { AnimatedButton } from "@/components/ui/animated-button";
import { fetchBackendHealth, HealthCheckResponse } from "@/lib/api-client";
import { HudBadge } from "@/components/hud/hud-badge";
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
          <div className="p-2 rounded-xl bg-sky-600 text-white font-bold shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
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
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-600">
          <Link href="#features" className="hover:text-sky-600 transition-colors">
            FUNNEL ENGINE
          </Link>
          <Link href="#architecture" className="hover:text-sky-600 transition-colors">
            SPECS
          </Link>
          <Link href="#pipeline" className="hover:text-sky-600 transition-colors">
            LIVE INGESTION
          </Link>
          <Link href="#why-us" className="hover:text-sky-600 transition-colors">
            LOGISTICS
          </Link>
        </nav>

        {/* Status Badge & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <HudBadge
            label={health ? `API v${health.version} ONLINE` : "API CONNECTING..."}
            variant={health ? "emerald" : "indigo"}
          />
          <AnimatedButton
            variant="glow"
            size="sm"
            onClick={() => {
              document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>TEST PIPELINE</span>
            <ArrowUpRight className="w-4 h-4" />
          </AnimatedButton>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-4 font-mono text-sm text-slate-700">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            FUNNEL ENGINE
          </Link>
          <Link href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            SPECS
          </Link>
          <Link href="#pipeline" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            LIVE INGESTION
          </Link>
          <Link href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            LOGISTICS
          </Link>
        </div>
      )}
    </header>
  );
};
