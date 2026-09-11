import { Crosshair } from "lucide-react";

export default function LocateMeButton({ onLocate, loading }) {
  return (
    <button
      onClick={onLocate}
      disabled={loading}
      aria-label="Locate me"
      className="absolute bottom-6 right-6 z-[1000] flex items-center justify-center w-11 h-11 bg-white rounded-xl shadow-lg border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-wait"
    >
      <Crosshair className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} strokeWidth={2.5} />
    </button>
  );
}
