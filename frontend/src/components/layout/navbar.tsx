"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Cpu, Menu, X, ArrowUpRight, CheckCircle2, Server } from "lucide-react";

export const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  const navLinks = [
    { name: "Overview", href: "/overview" },
    { name: "Sales", href: "/sales" },
    { name: "AI Insights", href: "/ai-insights" },
    { name: "ML Models", href: "/ml-models" },
    { name: "Forecast", href: "/forecast" },
    { name: "Segmentation", href: "/segmentation" },
    { name: "Anomalies", href: "/anomalies" },
    { name: "Recommendations", href: "/recommendations" },
    { name: "Predictions", href: "/prediction-center" },
    { name: "ETL", href: "/ingestion" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 20
          ? "bg-white/90 backdrop-blur-2xl border-b border-slate-200 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight font-mono">AETHER</span>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] block text-sky-600 -mt-1 font-bold">
              Commerce Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-bold text-slate-700 hover:text-sky-600 transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-500 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Action Button & Backend Status Pill */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-800 font-mono font-bold">Engine: Online</span>
          </div>

          <Link href="/ingestion">
            <AnimatedButton variant="glow" size="sm">
              <span>CSV Ingestion</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </AnimatedButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-6"
          >
            <div className="flex flex-col gap-4 font-mono">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-slate-800 hover:text-sky-600 py-1"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <Link href="/ingestion" onClick={() => setMobileMenuOpen(false)}>
                  <AnimatedButton variant="glow" className="w-full justify-center">
                    <span>Launch CSV Ingestion</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
