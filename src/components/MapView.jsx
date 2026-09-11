import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { MapPin, Navigation, Move } from "lucide-react";
import { getColorByName } from "../utils/colors";
import { normalizeCategory } from "../utils/geocoding";

// ======================================================
// CREATE CUSTOM PIN ICON
// ======================================================
function createPinIcon(color, isSelected, label) {
  const size = isSelected ? 38 : 30;

  const html = `
    <div
      class="pin-marker ${isSelected ? "pin-marker-selected" : ""}"
      style="
        width:${size}px;
        height:${size}px;
        background:${color.bg};
      "
    >
      <div class="pin-marker-inner">
        ${label}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

// ======================================================
// CREATE PREVIEW MARKER
// ======================================================
function createPreviewIcon() {
  const html = `
    <div
      class="preview-marker"
      style="
        width:32px;
        height:32px;
      "
    ></div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

// ======================================================
// CREATE CURRENT LOCATION ICON
// ======================================================
function createLocateIcon() {
  const html = `
    <div
      style="
        width:20px;
        height:20px;
        border-radius:50%;
        background:#3b82f6;
        border:3px solid white;
        box-shadow:
          0 0 0 6px rgba(59,130,246,0.2),
          0 2px 6px rgba(0,0,0,0.3);
      "
    ></div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

// ======================================================
// HANDLE MAP CLICK
// ======================================================
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

// ======================================================
// CONTROL MAP MOVEMENT
// ======================================================
function MapController({
  selectedLocation,
  flyToLocation,
  searchLocation,
}) {
  const map = useMap();

  // ----------------------------------------------------
  // Focus map on selected sidebar location
  // ----------------------------------------------------
  useEffect(() => {
    if (!selectedLocation) {
      return;
    }

    const latitude = Number(selectedLocation.latitude);
    const longitude = Number(selectedLocation.longitude);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return;
    }

    map.flyTo([latitude, longitude], 15, {
      animate: true,
      duration: 0.8,
    });
  }, [selectedLocation, map]);

  // ----------------------------------------------------
  // Focus map on current user location
  // ----------------------------------------------------
  useEffect(() => {
    if (!flyToLocation) {
      return;
    }

    const latitude = Number(flyToLocation.lat);
    const longitude = Number(flyToLocation.lng);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return;
    }

    map.flyTo(
      [latitude, longitude],
      flyToLocation.zoom || 14,
      {
        animate: true,
        duration: 0.8,
      }
    );
  }, [flyToLocation, map]);

  // ----------------------------------------------------
  // Focus map on searched location
  // ----------------------------------------------------
  useEffect(() => {
    if (!searchLocation) {
      return;
    }

    const latitude = Number(searchLocation.lat);
    const longitude = Number(searchLocation.lng);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return;
    }

    map.flyTo(
      [latitude, longitude],
      searchLocation.zoom || 14,
      {
        animate: true,
        duration: 0.8,
      }
    );
  }, [searchLocation, map]);

  return null;
}

// ======================================================
// MAIN MAP VIEW
// ======================================================
export default function MapView({
  locations,
  selectedLocationId,
  selectedLocation,
  onSelect,
  onMapClick,
  onMarkerDragEnd,
  previewLocation,
  locatePosition,
  searchLocation,
  addMode,
}) {
  const mapRef = useRef(null);

  /*
   * Fallback selected location.
   */
  const activeSelectedLocation =
    selectedLocation ||
    locations.find(
      (location) => location.id === selectedLocationId
    ) ||
    null;

  return (
    <div className="relative w-full h-full">

      {/* ==================================================
          LEAFLET MAP
          ================================================== */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        ref={mapRef}
        className="w-full h-full"
        zoomControl={false}
      >

        {/* ==================================================
            ZOOM CONTROLS
            ================================================== */}
        <ZoomControl position="topright" />

        {/* ==================================================
            OPENSTREETMAP TILE LAYER
            ================================================== */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ==================================================
            MAP CLICK HANDLER
            ================================================== */}
        <MapClickHandler
          onMapClick={onMapClick}
        />

        {/* ==================================================
            MAP CONTROLLER
            ================================================== */}
        <MapController
          selectedLocation={activeSelectedLocation}
          flyToLocation={locatePosition}
          searchLocation={searchLocation}
        />

        {/* ==================================================
            PREVIEW MARKER
            ================================================== */}
        {previewLocation && (
          <Marker
            position={[
              previewLocation.lat,
              previewLocation.lng,
            ]}
            icon={createPreviewIcon()}
            zIndexOffset={1000}
          />
        )}

        {/* ==================================================
            CURRENT LOCATION MARKER
            ================================================== */}
        {locatePosition && (
          <Marker
            position={[
              locatePosition.lat,
              locatePosition.lng,
            ]}
            icon={createLocateIcon()}
            zIndexOffset={500}
          >
            <Popup>
              <div className="text-sm font-semibold text-slate-700">
                You are here
              </div>
            </Popup>
          </Marker>
        )}

        {/* ==================================================
            SAVED LOCATION MARKERS
            ================================================== */}
        {locations.map((location, index) => {
          const color = getColorByName(location.color);

          const isSelected =
            location.id === selectedLocationId;

          return (
            <Marker
              key={location.id}
              position={[
                location.latitude,
                location.longitude,
              ]}
              draggable={true}
              icon={createPinIcon(
                color,
                isSelected,
                String(index + 1)
              )}
              zIndexOffset={
                isSelected ? 1000 : 0
              }
              eventHandlers={{
                click: () => {
                  onSelect(location.id);
                },
                dragend: (event) => {
                  const marker = event.target;
                  const { lat, lng } = marker.getLatLng();
                  onMarkerDragEnd?.(location.id, lat, lng);
                },
              }}
            >
              <Popup>
                <div className="min-w-[190px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: color.bg,
                      }}
                    >
                      <span className="text-white text-[10px] font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <span className="font-bold text-slate-800 text-sm">
                      {location.name}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-600 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-semibold uppercase tracking-wide">
                      {normalizeCategory(location.category)}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-600">
                      ID:
                    </span>{" "}
                    <span className="font-mono">
                      {location.id}
                    </span>
                  </div>

                  <div className="space-y-0.5 mb-2.5">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-600">
                        Lat:
                      </span>{" "}
                      {Number(location.latitude).toFixed(4)}
                    </div>

                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-600">
                        Lng:
                      </span>{" "}
                      {Number(location.longitude).toFixed(4)}
                    </div>
                  </div>

                  <div className="mb-2 flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
                    <Move className="w-3 h-3" />
                    Drag marker to update position
                  </div>

                  <button
                    onClick={() => {
                      onSelect(location.id);
                    }}
                    className="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: color.bg,
                    }}
                  >
                    <Navigation className="w-3 h-3" />
                    View Location
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

      {/* ==================================================
          ADD MODE HINT
          ================================================== */}
      {addMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg pointer-events-none">

          <div className="flex items-center gap-2">

            <MapPin className="w-4 h-4" />

            Click anywhere on the map to add a location

          </div>

        </div>
      )}

    </div>
  );
}