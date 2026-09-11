import { SearchX } from "lucide-react";
import LocationCard from "./LocationCard";
import EmptyState from "./EmptyState";

export default function LocationList({
  locations,
  getColorForIndex,
  selectedLocationId,
  searchQuery,
  onSelect,
  onEdit,
  onDelete,
  onAddLocation,
}) {
  if (locations.length === 0) {
    return <EmptyState onAddLocation={onAddLocation} />;
  }

  if (searchQuery && locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 mb-3">
          <SearchX className="w-6 h-6 text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-600 mb-1">
          No locations found
        </h3>
        <p className="text-xs text-slate-400">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          color={getColorForIndex(location.color)}
          isSelected={selectedLocationId === location.id}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
