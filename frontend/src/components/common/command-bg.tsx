"use client";

import React from "react";

export const CommandBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F8FAFC]">
      {/* Soft Ambient Radial Lighting Orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 via-indigo-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-purple-200/40 via-sky-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-sky-100/50 via-blue-100/30 to-transparent rounded-full blur-3xl" />

      {/* Subtle Light Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(to right, #CBD5E1 1px, transparent 1px), linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
};
