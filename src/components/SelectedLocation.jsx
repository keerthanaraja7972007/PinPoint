import { MapPin, Pencil, Trash2, Navigation } from "lucide-react";

export default function SelectedLocation({ location, color, onEdit, onDelete }) {
  if (!location) return null;

  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: color.bg,
        backgroundColor: color.bgLight,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ backgroundColor: color.bg }}
        >
          <MapPin className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: color.text }}>
          Selected Location
        </span>
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{location.name}</h3>
      <div className="flex items-center gap-1.5 mb-3">
        <Navigation className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-mono text-slate-500">
          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
