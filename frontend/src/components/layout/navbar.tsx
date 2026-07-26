"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AetherLogo } from "@/components/common/aether-logo";
import { Menu, X, ArrowUpRight, CheckCircle2, LayoutDashboard, TrendingUp, Cpu, AlertTriangle, Sparkles, FolderUp } from "lucide-react";
import { fetchBackendHealth, HealthCheckResponse } from "@/lib/api-client";

export const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);

  useEffect(() => {
    fetchBackendHealth()
      .then((res) => setHealth(res))
      .catch(() => setHealth(null));
  }, []);

  const primaryLinks = [
    { name: "Overview", href: "/overview", icon: LayoutDashboard },
    { name: "Sales", href: "/sales", icon: TrendingUp },
    { name: "Forecast", href: "/forecast", icon: Cpu },
    { name: "Anomalies", href: "/anomalies", icon: AlertTriangle },
    { name: "AI Insights", href: "/ai-insights", icon: Sparkles },
    { name: "ETL Upload", href: "/ingestion", icon: FolderUp },
  ];

  const allLinks = [
    { name: "📊 Overview Dashboard", href: "/overview" },
    { name: "📈 Sales Analytics", href: "/sales" },
    { name: "🤖 Forecast Command Hub", href: "/forecast" },
    { name: "🚨 Anomaly Threat Matrix", href: "/anomalies" },
    { name: "💡 AI Executive Insights", href: "/ai-insights" },
    { name: "🎯 Prediction Sandbox", href: "/prediction-center" },
    { name: "👥 Customer Segmentation", href: "/segmentation" },
    { name: "⚡ AI Recommendations", href: "/recommendations" },
    { name: "📂 ML Model Registry", href: "/ml-models" },
    { name: "📊 Evaluation Suite", href: "/model-performance" },
    { name: "🔍 Data Explorer", href: "/explorer" },
    { name: "📥 ETL Ingestion Upload", href: "/ingestion" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 15
          ? "bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-md py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <AetherLogo className="w-9 h-9 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight font-mono leading-none">AETHER</span>
            <span className="text-[9px] uppercase font-mono tracking-[0.2em] block text-sky-600 font-bold mt-0.5">
              Commerce Engine
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-bold text-slate-700 hover:text-sky-600 transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Action Button, Health Pill & 3-Bar Hamburger Dropdown Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-sm font-mono">
            <CheckCircle2 className={`w-3.5 h-3.5 ${health ? "text-emerald-600" : "text-amber-500"}`} />
            <span className="text-slate-800 font-bold">{health ? `Engine v${health.version}` : "Engine Ready"}</span>
          </div>

          <Link href="/ingestion" className="hidden md:inline-block">
            <AnimatedButton variant="glow" size="sm">
              <span>Ingest Dataset</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </AnimatedButton>
          </Link>

          {/* 3-Bar Hamburger Menu Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition-colors focus:outline-none flex items-center gap-1 font-mono text-xs font-bold"
          >
            {menuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            <span className="hidden sm:inline">MENU</span>
          </button>
        </div>
      </div>

      {/* 3-Bar Hamburger Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl px-4 sm:px-8 py-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-700 mb-3 border-b border-slate-100 pb-2">
                AETHER Command Modules Directory
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono">
                {allLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="p-3 rounded-xl bg-slate-50/80 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 text-xs font-bold text-slate-800 hover:text-sky-700 transition-all flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
