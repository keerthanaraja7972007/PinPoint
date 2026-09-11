export const LOCATION_CATEGORIES = [
  "Home",
  "College",
  "Restaurant",
  "Shopping",
  "Travel",
  "Other",
];

export function normalizeCategory(value) {
  if (typeof value !== "string") {
    return "Other";
  }

  const normalized = value.trim();
  return LOCATION_CATEGORIES.includes(normalized) ? normalized : "Other";
}

function pickAddressValue(address, keys) {
  for (const key of keys) {
    const value = address?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

export async function reverseGeocode(latitude, longitude) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return "";
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    const address = data?.address || {};

    const candidates = [
      data?.name,
      data?.display_name?.split(",")[0],
      pickAddressValue(address, ["amenity", "building", "shop"]),
      pickAddressValue(address, ["road", "suburb", "village", "town", "city", "municipality"]),
      pickAddressValue(address, ["county", "state", "country"]),
    ].filter(Boolean);

    const placeName = candidates.find((candidate) => candidate && candidate.length > 2);
    return placeName ? String(placeName).trim() : "";
  } catch {
    return "";
  }
}
