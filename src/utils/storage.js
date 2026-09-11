import { getColorByName } from "./colors";
import { normalizeCategory } from "./geocoding";

const STORAGE_KEY = "pinpoint-favorite-locations";

function createLocationId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(36).slice(2);
}

export function loadLocations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seenIds = new Set();
    const locations = parsed.reduce((validLocations, loc, index) => {
      if (
        !loc ||
        typeof loc.name !== "string" ||
        typeof loc.latitude !== "number" ||
        typeof loc.longitude !== "number" ||
        isNaN(loc.latitude) ||
        isNaN(loc.longitude)
      ) {
        return validLocations;
      }

      let id = typeof loc.id === "string" && loc.id ? loc.id : createLocationId();
      while (seenIds.has(id)) id = createLocationId();
      seenIds.add(id);

      const resolvedColor =
        typeof loc.color === "string" && loc.color
          ? getColorByName(loc.color).name
          : null;

      validLocations.push({
        id,
        name: loc.name,
        latitude: loc.latitude,
        longitude: loc.longitude,
        color: resolvedColor,
        category: normalizeCategory(loc.category),
        _colorIndex: index,
      });
      return validLocations;
    }, []);

    const migrated = locations.map(({ _colorIndex, ...location }) => ({
      ...location,
      color: location.color || ["blue", "purple", "green", "orange"][_colorIndex % 4],
      category: normalizeCategory(location.category),
    }));
    saveLocations(migrated);
    return migrated;
  } catch {
    return [];
  }
}

export function saveLocations(locations) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        locations.map((location) => ({
          ...location,
          category: normalizeCategory(location.category),
        }))
      )
    );
    return true;
  } catch {
    return false;
  }
}
