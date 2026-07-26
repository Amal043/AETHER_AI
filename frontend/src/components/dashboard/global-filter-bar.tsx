"use client";

import React, { useEffect, useState } from "react";
import { Filter, RefreshCw, Layers } from "lucide-react";
import { useFilters } from "@/context/FilterContext";
import { fetchFilterOptions } from "@/lib/api-client";

export const GlobalFilterBar: React.FC = () => {
  const { filters, setCategory, setRegion, setDevice, resetFilters } = useFilters();
  const [options, setOptions] = useState<{
    categories: string[];
    regions: string[];
    payment_methods: string[];
    statuses: string[];
  }>({
    categories: [],
    regions: [],
    payment_methods: [],
    statuses: [],
  });

  useEffect(() => {
    fetchFilterOptions()
      .then((res) => {
        if (res && res.data) {
          setOptions(res.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-sky-100 text-sky-700 font-mono">
          <Filter className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <span>Global Dataset Telemetry Filters</span>
            {options.categories.length > 0 && (
              <span className="text-[10px] font-normal text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                {options.categories.length} Ingested Categories
              </span>
            )}
          </h3>
          <p className="text-[11px] text-slate-500">Filters dynamically generated from uploaded business CSV files</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Dynamic Category Select */}
        <select
          value={filters.category || ""}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Categories ({options.categories.length})</option>
          {options.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Dynamic Region Select */}
        <select
          value={filters.region || ""}
          onChange={(e) => setRegion(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Regions ({options.regions.length})</option>
          {options.regions.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>

        {/* Dynamic Device / Payment Method Select */}
        <select
          value={filters.device || ""}
          onChange={(e) => setDevice(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Payment / Device Types</option>
          {options.payment_methods.map((pm) => (
            <option key={pm} value={pm}>
              {pm}
            </option>
          ))}
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
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
