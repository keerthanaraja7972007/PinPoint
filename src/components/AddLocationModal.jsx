import { useState, useEffect, useRef } from "react";
import { MapPin, X, Check, LoaderCircle } from "lucide-react";
import { COLOR_PALETTE, getColorForIndex } from "../utils/colors";
import { LOCATION_CATEGORIES, reverseGeocode } from "../utils/geocoding";

export default function AddLocationModal({ coordinates, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState(getColorForIndex(0).name);
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [isLoadingPlaceName, setIsLoadingPlaceName] = useState(false);
  const [geoError, setGeoError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    let active = true;
    const loadPlaceName = async () => {
      setIsLoadingPlaceName(true);
      setGeoError("");

      const placeName = await reverseGeocode(coordinates.lat, coordinates.lng);

      if (!active) return;

      if (placeName) {
        setName(placeName);
      } else {
        setGeoError("Unable to detect a place name, so you can enter one manually.");
      }

      setIsLoadingPlaceName(false);
    };

    loadPlaceName();

    return () => {
      active = false;
    };
  }, [coordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a location name.");
      return;
    }
    onSave(trimmed, coordinates.lat, coordinates.lng, selectedColor, selectedCategory);
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 overlay-enter"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-50">
              <MapPin className="w-4.5 h-4.5 text-primary-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-base font-bold text-slate-800">
              Add Favorite Location
            </h2>
          </div>
          <button
            onClick={onCancel}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Latitude
              </label>
              <p className="text-sm font-mono text-slate-700 mt-0.5">
                {coordinates.lat.toFixed(4)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Longitude
              </label>
              <p className="text-sm font-mono text-slate-700 mt-0.5">
                {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="location-name"
              className="text-sm font-semibold text-slate-600 mb-1.5 block"
            >
              Location Name
            </label>
            <div className="relative">
              <input
                id="location-name"
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter location name"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              {isLoadingPlaceName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                  <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                  Finding location...
                </div>
              )}
            </div>
            {geoError && (
              <p className="text-[11px] text-amber-600 mt-1.5">{geoError}</p>
            )}
            {error && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="location-category" className="text-sm font-semibold text-slate-600 mb-1.5 block">
              Category
            </label>
            <select
              id="location-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            >
              {LOCATION_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <span className="text-sm font-semibold text-slate-600 block mb-2">
              Marker Color
            </span>
            <div className="grid grid-cols-8 gap-2">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  aria-label={`Choose ${color.name}`}
                  aria-pressed={selectedColor === color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    selectedColor === color.name ? "border-slate-800 ring-2 ring-slate-300 ring-offset-1" : "border-white shadow-sm"
                  }`}
                  style={{ backgroundColor: color.bg }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-sm transition-all"
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Save Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
