"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#02040a] text-slate-100 min-h-screen flex items-center justify-center p-6 font-mono">
        <div className="p-8 bg-slate-950 rounded-2xl border border-rose-500/40 text-center max-w-md space-y-4">
          <div className="text-rose-400 text-lg font-bold">GLOBAL STREAM EXCEPTION</div>
          <div className="text-xs text-slate-400">{error?.message || "Critical runtime error."}</div>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider"
          >
            RELOAD SYSTEM
          </button>
        </div>
      </body>
    </html>
  );
}
