import { Plus, MapPin, Sparkles } from "lucide-react";
import SearchBar from "./SearchBar";
import LocationList from "./LocationList";
import SelectedLocation from "./SelectedLocation";
import { getColorByName } from "../utils/colors";
import { LOCATION_CATEGORIES } from "../utils/geocoding";

export default function Sidebar({
  locations,
  filteredLocations,
  selectedLocationId,
  selectedLocation,
  searchQuery,
  categoryFilter,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onSelect,
  onEdit,
  onDelete,
  onAddLocation,
}) {
  const selectedColor = selectedLocation
    ? getColorByName(selectedLocation.color)
    : null;

  const hasActiveFilters = Boolean(searchQuery.trim()) || categoryFilter !== "All";

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-sm">
                <MapPin
                  className="w-3.5 h-3.5 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                My Favourite Locations
              </h2>
            </div>

            <p className="text-xs text-slate-500 ml-9">
              {locations.length} saved{" "}
              {locations.length === 1 ? "place" : "places"}
            </p>
          </div>

          <Sparkles className="w-4 h-4 text-purple-500" />
        </div>

        <button
          onClick={onAddLocation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-md shadow-blue-500/20 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border-[1.5px] border-slate-800"
        >
          <Plus
            className="w-4 h-4"
            strokeWidth={2.5}
          />

          Add Location
        </button>
      </div>

      <div className="px-5 pb-3 space-y-3">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <label htmlFor="category-filter" className="block mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {[
                "All",
                ...LOCATION_CATEGORIES,
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort-by" className="block mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option value="recent">Recently added</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {selectedLocation && selectedColor && (
        <div className="px-5 pb-3">
          <SelectedLocation
            location={selectedLocation}
            color={selectedColor}
            onEdit={() => onEdit(selectedLocation)}
            onDelete={() => onDelete(selectedLocation)}
          />
        </div>
      )}

      <div className="mx-5 border-t-[1.5px] border-slate-700/30 mb-2" />

      <div className="flex-1 overflow-y-auto sidebar-scroll px-5 pb-5">
        {filteredLocations.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 border-[1.5px] border-slate-700 mb-3">
              <MapPin className="w-6 h-6 text-purple-500" />
            </div>

            <h3 className="text-sm font-bold text-slate-700 mb-1">
              No locations found
            </h3>

            <p className="text-xs text-slate-500">
              {hasActiveFilters
                ? "Try a different search or category."
                : "Add your first favorite place."}
            </p>
          </div>
        ) : (
          <LocationList
            locations={filteredLocations}
            getColorForIndex={getColorByName}
            selectedLocationId={selectedLocationId}
            searchQuery={searchQuery}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddLocation={onAddLocation}
          />
        )}
      </div>
    </div>
  );
}