export const COLOR_PALETTE = [
  { name: "blue", bg: "#3b82f6", bgLight: "#dbeafe", text: "#1d4ed8", ring: "rgba(59,130,246,0.3)" },
  { name: "purple", bg: "#8b5cf6", bgLight: "#ede9fe", text: "#7c3aed", ring: "rgba(139,92,246,0.3)" },
  { name: "green", bg: "#22c55e", bgLight: "#dcfce7", text: "#16a34a", ring: "rgba(34,197,94,0.3)" },
  { name: "orange", bg: "#f97316", bgLight: "#ffedd5", text: "#ea580c", ring: "rgba(249,115,22,0.3)" },
  { name: "pink", bg: "#ec4899", bgLight: "#fce7f3", text: "#db2777", ring: "rgba(236,72,153,0.3)" },
  { name: "cyan", bg: "#06b6d4", bgLight: "#cffafe", text: "#0891b2", ring: "rgba(6,182,212,0.3)" },
  { name: "amber", bg: "#f59e0b", bgLight: "#fef3c7", text: "#d97706", ring: "rgba(245,158,11,0.3)" },
  { name: "indigo", bg: "#6366f1", bgLight: "#e0e7ff", text: "#4f46e5", ring: "rgba(99,102,241,0.3)" },
  { name: "red", bg: "#ef4444", bgLight: "#fee2e2", text: "#dc2626", ring: "rgba(239,68,68,0.3)" },
  { name: "teal", bg: "#14b8a6", bgLight: "#ccfbf1", text: "#0f766e", ring: "rgba(20,184,166,0.3)" },
  { name: "lime", bg: "#84cc16", bgLight: "#ecfccb", text: "#65a30d", ring: "rgba(132,204,22,0.3)" },
  { name: "yellow", bg: "#eab308", bgLight: "#fef9c3", text: "#ca8a04", ring: "rgba(234,179,8,0.3)" },
  { name: "rose", bg: "#f43f5e", bgLight: "#ffe4e6", text: "#e11d48", ring: "rgba(244,63,94,0.3)" },
  { name: "fuchsia", bg: "#d946ef", bgLight: "#fae8ff", text: "#c026d3", ring: "rgba(217,70,239,0.3)" },
  { name: "violet", bg: "#a855f7", bgLight: "#f3e8ff", text: "#9333ea", ring: "rgba(168,85,247,0.3)" },
  { name: "sky", bg: "#0ea5e9", bgLight: "#e0f2fe", text: "#0284c7", ring: "rgba(14,165,233,0.3)" },
  { name: "emerald", bg: "#10b981", bgLight: "#d1fae5", text: "#059669", ring: "rgba(16,185,129,0.3)" },
  { name: "mint", bg: "#2dd4bf", bgLight: "#ccfbf1", text: "#0d9488", ring: "rgba(45,212,191,0.3)" },
  { name: "olive", bg: "#a3a31f", bgLight: "#f3f4c7", text: "#7c7c16", ring: "rgba(163,163,31,0.3)" },
  { name: "gold", bg: "#d97706", bgLight: "#ffedd5", text: "#b45309", ring: "rgba(217,119,6,0.3)" },
  { name: "coral", bg: "#fb7185", bgLight: "#ffe4e6", text: "#e11d48", ring: "rgba(251,113,133,0.3)" },
  { name: "plum", bg: "#7e22ce", bgLight: "#f3e8ff", text: "#6b21a8", ring: "rgba(126,34,206,0.3)" },
  { name: "slate", bg: "#64748b", bgLight: "#f1f5f9", text: "#475569", ring: "rgba(100,116,139,0.3)" },
  { name: "charcoal", bg: "#334155", bgLight: "#e2e8f0", text: "#1e293b", ring: "rgba(51,65,85,0.3)" },
];

export function getColorForIndex(index) {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}

export function getColorByName(name) {
  return COLOR_PALETTE.find((c) => c.name === name) || COLOR_PALETTE[0];
}
