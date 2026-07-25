import React from "react";

export const AetherLogo: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 1. Left Speed Pill Indicators */}
      <rect x="12" y="42" width="28" height="9" rx="4.5" fill="#22C55E" />
      <rect x="22" y="68" width="22" height="9" rx="4.5" fill="#EF4444" />
      <rect x="12" y="94" width="34" height="9" rx="4.5" fill="#F59E0B" />
      <rect x="25" y="120" width="25" height="9" rx="4.5" fill="#3B82F6" />

      {/* 2. Document Data Sheet Card Background */}
      <path
        d="M75 35 H172 V142 H92 L75 125 Z"
        fill="#EDF2F7"
        stroke="#CBD5E1"
        strokeWidth="2"
      />

      {/* 3. Bar Chart inside Document */}
      {/* Orange Bar */}
      <rect x="94" y="102" width="18" height="32" rx="2" fill="#F59E0B" />
      {/* Blue Bar */}
      <rect x="119" y="82" width="20" height="52" rx="2" fill="#2563EB" />
      {/* Green Bar */}
      <rect x="144" y="62" width="20" height="72" rx="2" fill="#10B981" />

      {/* 4. Upward Red Trend Growth Arrow */}
      <path
        d="M94 98 L144 48 M144 48 H124 M144 48 V68"
        stroke="#EF4444"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. Magnifying Glass Lens Ring */}
      <path
        d="M125 35 C165 35 195 65 195 105 C195 145 165 175 125 175 C85 175 55 145 55 105 C55 65 85 35 125 35 Z"
        fill="none"
        stroke="#1E3A8A"
        strokeWidth="18"
      />
      {/* Inner Lens Highlight Arc */}
      <path
        d="M75 62 C92 46 112 38 138 40"
        stroke="#60A5FA"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* 6. Slanted Magnifying Glass Handle */}
      <path
        d="M82 143 L42 183"
        stroke="#334155"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <path
        d="M82 143 L42 183"
        stroke="#94A3B8"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
