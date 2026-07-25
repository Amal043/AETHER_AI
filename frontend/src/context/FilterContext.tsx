"use client";

import React, { createContext, useContext, useState } from "react";
import { GlobalFilters } from "@/lib/api-client";

interface FilterContextType {
  filters: GlobalFilters;
  setCategory: (cat: string) => void;
  setRegion: (reg: string) => void;
  setDevice: (dev: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<GlobalFilters>({});

  const setCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category: category || undefined }));
  };

  const setRegion = (region: string) => {
    setFilters((prev) => ({ ...prev, region: region || undefined }));
  };

  const setDevice = (device: string) => {
    setFilters((prev) => ({ ...prev, device: device || undefined }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <FilterContext.Provider value={{ filters, setCategory, setRegion, setDevice, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
