import { useState, useEffect, useCallback } from "react";

import { loadLocations, saveLocations } from "../utils/storage";
import { getColorForIndex } from "../utils/colors";
import { normalizeCategory } from "../utils/geocoding";

export function useLocations() {
  const [locations, setLocations] = useState(() => loadLocations());

  useEffect(() => {
    saveLocations(locations);
  }, [locations]);

  const addLocation = useCallback((name, latitude, longitude, color, category) => {
    const newLocation = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,

      name: name.trim(),
      latitude,
      longitude,
      color: color || getColorForIndex(0).name,
      category: normalizeCategory(category),
    };

    setLocations((prev) => [...prev, newLocation]);

    return newLocation;
  }, []);

  const updateLocation = useCallback((id, newName, color, category) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id
          ? {
              ...loc,
              name: newName.trim(),
              color: color || loc.color,
              category: normalizeCategory(category || loc.category),
            }
          : loc
      )
    );
  }, []);

  const updateLocationCoordinates = useCallback((id, latitude, longitude) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id
          ? {
              ...loc,
              latitude,
              longitude,
            }
          : loc
      )
    );
  }, []);

  const deleteLocation = useCallback((id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  }, []);

  return {
    locations,
    addLocation,
    updateLocation,
    updateLocationCoordinates,
    deleteLocation,
  };
}