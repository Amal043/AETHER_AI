"use client";

import React from "react";
import { FilterProvider } from "@/context/FilterContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
        {children}
      </div>
    </FilterProvider>
  );
};
