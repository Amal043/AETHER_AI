"use client";

import React from "react";
import { Filter, RefreshCw } from "lucide-react";
import { useFilters } from "@/context/FilterContext";

export const GlobalFilterBar: React.FC = () => {
  const { filters, setCategory, setRegion, setDevice, resetFilters } = useFilters();

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-sky-100 text-sky-700 font-mono">
          <Filter className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            Global Telemetry Filters
          </h3>
          <p className="text-[11px] text-slate-500">Live query constraints across all active charts</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Category Select */}
        <select
          value={filters.category || ""}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Beauty">Beauty</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
        </select>

        {/* Region Select */}
        <select
          value={filters.region || ""}
          onChange={(e) => setRegion(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Regions</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia Pacific">Asia Pacific</option>
        </select>

        {/* Device Select */}
        <select
          value={filters.device || ""}
          onChange={(e) => setDevice(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Devices</option>
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
          <option value="Tablet">Tablet</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-colors flex items-center gap-1.5 border border-slate-300"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};
