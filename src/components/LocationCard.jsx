import { MapPin, Pencil, Trash2 } from "lucide-react";
import { normalizeCategory } from "../utils/geocoding";

export default function LocationCard({
  location,
  color,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) {
  const category = normalizeCategory(location.category);

  return (
    <div
      onClick={() => onSelect(location.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(location.id);
        }
      }}
      className={`group relative flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-primary-500 bg-primary-50 shadow-card-hover ring-2 ring-primary-200"
          : "border-slate-300 bg-white hover:border-slate-500 hover:shadow-card-hover hover:bg-slate-50"
      }`}
    >
      <div className="flex-shrink-0 flex items-center justify-center">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
          style={{ backgroundColor: color.bg }}
        >
          <MapPin
            className="w-4 h-4 text-white"
            strokeWidth={2.5}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3
            className={`text-sm font-semibold truncate ${
              isSelected
                ? "text-primary-800"
                : "text-slate-700"
            }`}
          >
            {location.name}
          </h3>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-600">
            {category}
          </span>
        </div>

        <p className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
          ID: {location.id}
        </p>

        <p className="text-xs text-slate-400 font-mono mt-0.5">
          {Number(location.latitude).toFixed(4)},{" "}
          {Number(location.longitude).toFixed(4)}
        </p>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(location);
          }}
          aria-label={`Edit ${location.name}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-100 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(location);
          }}
          aria-label={`Delete ${location.name}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}