"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Globe, Share2, Code2, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#030303] text-zinc-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">AETHER Analytics</span>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            AI-Powered E-Commerce Funnel & Supply Chain Intelligence Platform. Engineered for high-throughput data processing, real-time statistical profiling, and enterprise decision intelligence.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 hover:text-white border border-zinc-800 transition-colors">
              <Code2 className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 hover:text-white border border-zinc-800 transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 hover:text-white border border-zinc-800 transition-colors">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Command Modules */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Command Modules</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/customers" className="hover:text-white transition-colors">Customer Analytics</Link></li>
            <li><Link href="/sales" className="hover:text-white transition-colors">Sales Intelligence</Link></li>
            <li><Link href="/inventory" className="hover:text-white transition-colors">Supply Chain Monitor</Link></li>
            <li><Link href="/ingestion" className="hover:text-white transition-colors">Data Quality Profiler</Link></li>
          </ul>
        </div>

        {/* Stack Specs */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Tech Foundation</h4>
          <ul className="space-y-2.5 text-sm font-mono text-zinc-400">
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-cyan-400" /> Next.js 15 App Router</li>
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-blue-400" /> FastAPI + Pandas ETL</li>
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-purple-400" /> Pydantic Validation</li>
            <li className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-emerald-400" /> Docker & PostgreSQL</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
        <div>© 2026 AETHER Commerce Intelligence. Enterprise Foundation Build.</div>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
};
