"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalFilterBar } from "@/components/dashboard/global-filter-bar";
import { ExportBar } from "@/components/dashboard/export-bar";
import { CategoryBarChart } from "@/components/charts/CategoryBarChart";
import { fetchSalesAnalytics } from "@/lib/api-client";
import { ShoppingBag, Award, Tag } from "lucide-react";

export default function SalesPage() {
  const [sales, setSales] = useState<any>(null);

  useEffect(() => {
    fetchSalesAnalytics().then((res) => setSales(res.data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-sky-500" />
              Sales Telemetry Node
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Sales & Product Performance
            </h1>
          </div>
          <ExportBar data={sales ? sales.top_products : []} filename="sales_performance_report" />
        </div>

        <GlobalFilterBar />

        {/* TOP PRODUCTS TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-600" /> Top Performing Products
            </h3>
            <p className="text-xs text-slate-500 mb-6">Ranked by revenue generation & unit volume</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Product Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-right">Units Sold</th>
                    <th className="pb-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sales && sales.top_products ? (
                    sales.top_products.map((p: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-3 font-semibold text-slate-900">{p.title}</td>
                        <td className="py-3 text-slate-600">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 text-right font-bold text-slate-800">{p.units_sold}</td>
                        <td className="py-3 text-right font-bold text-sky-700">${p.revenue.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400">
                        Loading sales telemetry...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-1 font-mono flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" /> Category Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-6">Sales volume per catalog sector</p>
            <CategoryBarChart data={sales ? sales.categories : []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
