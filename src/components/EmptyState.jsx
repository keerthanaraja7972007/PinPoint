import { MapPin, Plus } from "lucide-react";

export default function EmptyState({ onAddLocation }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
        <MapPin className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold text-slate-600 mb-1">
        No favorite locations yet
      </h3>
      <p className="text-xs text-slate-400 mb-5 max-w-[220px] leading-relaxed">
        Click anywhere on the map to add your first favorite place.
      </p>
      <button
        onClick={onAddLocation}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary-600 bg-primary-50 border border-primary-200 rounded-xl hover:bg-primary-100 hover:border-primary-300 transition-all"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
        Add Location
      </button>
    </div>
  );
}
