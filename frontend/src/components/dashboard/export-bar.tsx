"use client";

import React from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExportBarProps {
  data: any[];
  filename?: string;
}

export const ExportBar: React.FC<ExportBarProps> = ({ data, filename = "aether_analytics_export" }) => {
  const exportToCsv = () => {
    if (!data || data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  const exportToExcel = () => {
    if (!data || data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${filename}.xlsx`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportToCsv}
        className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-mono font-bold border border-sky-200 transition-colors flex items-center gap-1.5 shadow-sm"
      >
        <FileText className="w-3.5 h-3.5" />
        Export CSV
      </button>
      <button
        onClick={exportToExcel}
        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-mono font-bold border border-emerald-200 transition-colors flex items-center gap-1.5 shadow-sm"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Export Excel
      </button>
    </div>
  );
};
