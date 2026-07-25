"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Terminal, Code2, Share2, Globe } from "lucide-react";

export const CommandFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-600 text-white font-bold shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">AETHER ENGINE</span>
          </div>
          <p className="text-xs text-slate-600 max-w-sm leading-relaxed font-sans">
            AI-Powered E-Commerce Funnel & Supply Chain Intelligence Platform. Engineered for high-throughput data processing, real-time statistical profiling, and autonomous decision intelligence.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 hover:text-sky-600 border border-slate-200 transition-colors">
              <Code2 className="w-4 h-4 text-slate-700" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 hover:text-sky-600 border border-slate-200 transition-colors">
              <Share2 className="w-4 h-4 text-slate-700" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 hover:text-sky-600 border border-slate-200 transition-colors">
              <Globe className="w-4 h-4 text-slate-700" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-sky-700 mb-4">Command Modules</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="#features" className="hover:text-sky-600 transition-colors">Customer Profiler</Link></li>
            <li><Link href="#features" className="hover:text-sky-600 transition-colors">Sales Telemetry</Link></li>
            <li><Link href="#features" className="hover:text-sky-600 transition-colors">Supply Chain Node</Link></li>
            <li><Link href="#pipeline" className="hover:text-sky-600 transition-colors">ETL Stream Auditor</Link></li>
          </ul>
        </div>

        {/* Specs */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-sky-700 mb-4">Tech Matrix</h4>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-sky-600" /> Next.js 15 App Router</li>
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-indigo-600" /> FastAPI + Pandas ETL</li>
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-fuchsia-600" /> Pydantic Validation</li>
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-emerald-600" /> Docker & PostgreSQL</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <div>© 2026 INTELLICOMMERCE ANALYTICS PLATFORM. PHASE 1 COMMAND BUILD.</div>
        <div className="flex gap-6">
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
          <span>SECURITY</span>
        </div>
      </div>
    </footer>
  );
};
