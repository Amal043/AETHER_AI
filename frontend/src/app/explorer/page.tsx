"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ExportBar } from "@/components/dashboard/export-bar";
import { fetchExplorerData } from "@/lib/api-client";
import { Database, Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function ExplorerPage() {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1, total_records: 0 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchExplorerData(pagination.page, 15, search, category)
      .then((res) => {
        setData(res.data);
        setPagination(res.pagination);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pagination.page, search, category]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200 shadow-sm mb-3">
              <Database className="w-3.5 h-3.5 text-sky-500" />
              Interactive Data Explorer
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              Enterprise Query & Dataset Explorer
            </h1>
          </div>
          <ExportBar data={data} filename="explorer_dataset_export" />
        </div>

        {/* CONTROLS TOOLBAR */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, customers, products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-mono font-bold"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Beauty">Beauty</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
            </select>
          </div>
        </div>

        {/* DATASET TABLE */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Order Key</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Region</th>
                  <th className="p-4">Product Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Qty</th>
                  <th className="p-4 text-right">Unit Price</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400">
                      Querying database records...
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-sky-700">{row.order_key}</td>
                      <td className="p-4 font-semibold text-slate-900">{row.customer_name}</td>
                      <td className="p-4 text-slate-600">{row.region} ({row.country})</td>
                      <td className="p-4 font-semibold text-slate-800">{row.product_title}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px]">
                          {row.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-bold text-slate-700">{row.quantity}</td>
                      <td className="p-4 text-right text-slate-600">${row.unit_price}</td>
                      <td className="p-4 text-right font-bold text-slate-900">${row.total_price}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 text-[11px]">{row.created_at}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400">
                      No records matched your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="p-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">
              Showing page <strong className="text-slate-900">{pagination.page}</strong> of{" "}
              <strong className="text-slate-900">{pagination.total_pages}</strong> ({pagination.total_records} total records)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                className="p-2 rounded-xl bg-white border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
              </button>
              <button
                disabled={pagination.page >= pagination.total_pages}
                onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                className="p-2 rounded-xl bg-white border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
