import { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import AddLocationModal from "../components/AddLocationModal";
import EditLocationModal from "../components/EditLocationModal";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import Toast from "../components/Toast";
import LocateMeButton from "../components/LocateMeButton";
import MapSearch from "../components/MapSearch";
import { useLocations } from "../hooks/useLocations";
import { MapPin, X, PanelLeftOpen } from "lucide-react";
import { normalizeCategory } from "../utils/geocoding";

export default function Dashboard() {
  const {
    locations,
    addLocation,
    updateLocation,
    updateLocationCoordinates,
    deleteLocation,
  } = useLocations();

  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [addModalCoords, setAddModalCoords] = useState(null);
  const [previewLocation, setPreviewLocation] = useState(null);
  const [editLocation, setEditLocation] = useState(null);
  const [deleteLocationData, setDeleteLocationData] = useState(null);
  const [toast, setToast] = useState(null);
  const [locatePosition, setLocatePosition] = useState(null);
  const [locating, setLocating] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);

  const filteredLocations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    let nextLocations = locations.filter((loc) => {
      const matchesSearch = !q || (loc.name || "").toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "All" || normalizeCategory(loc.category) === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "name-asc") {
      nextLocations = [...nextLocations].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortBy === "name-desc") {
      nextLocations = [...nextLocations].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    }

    return nextLocations;
  }, [locations, searchQuery, categoryFilter, sortBy]);

  const selectedLocation = useMemo(
    () => locations.find((l) => l.id === selectedLocationId) || null,
    [locations, selectedLocationId]
  );

  const handleMapClick = useCallback((lat, lng) => {
    setPreviewLocation({ lat, lng });
    setAddModalCoords({ lat, lng });
    setAddMode(false);
  }, []);

  const handleSearchResult = useCallback((result) => {
    const lat = Number(result.lat);
    const lng = Number(result.lon);

    const nextLocation = {
      lat,
      lng,
      zoom: 14,
    };

    setSearchLocation(nextLocation);
    setPreviewLocation({ lat, lng });
    setAddModalCoords({ lat, lng });
    setAddMode(false);
  }, []);

  const handleAddLocationClick = useCallback(() => {
    setAddMode(true);
    setMobileSidebarOpen(false);

    setToast({
      type: "info",
      message: "Click anywhere on the map to add a location.",
    });
  }, []);

  const handleSaveNewLocation = useCallback(
    (name, lat, lng, color, category) => {
      const newLoc = addLocation(name, lat, lng, color, category);

      setAddModalCoords(null);
      setPreviewLocation(null);
      setAddMode(false);
      setSelectedLocationId(newLoc.id);

      setToast({
        type: "success",
        message: "Location added successfully.",
      });
    },
    [addLocation]
  );

  const handleCancelAdd = useCallback(() => {
    setAddModalCoords(null);
    setPreviewLocation(null);
    setAddMode(false);
  }, []);

  const handleSelectLocation = useCallback((id) => {
    setSelectedLocationId(id);
    setMobileSidebarOpen(false);
  }, []);

  const handleEditLocation = useCallback((loc) => {
    setEditLocation(loc);
  }, []);

  const handleSaveEdit = useCallback(
    (id, newName, color, category) => {
      updateLocation(id, newName, color, category);
      setEditLocation(null);

      setToast({
        type: "success",
        message: "Location updated successfully.",
      });
    },
    [updateLocation]
  );

  const handleDeleteLocation = useCallback((loc) => {
    setDeleteLocationData(loc);
  }, []);

  const handleConfirmDelete = useCallback(
    (id) => {
      deleteLocation(id);

      if (selectedLocationId === id) {
        setSelectedLocationId(null);
      }

      setDeleteLocationData(null);

      setToast({
        type: "success",
        message: "Location deleted successfully.",
      });
    },
    [deleteLocation, selectedLocationId]
  );

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setToast({
        type: "error",
        message: "Geolocation is not supported by your browser.",
      });
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocatePosition({
          lat: latitude,
          lng: longitude,
          zoom: 14,
        });

        setLocating(false);
      },
      (err) => {
        setLocating(false);

        let msg = "Geolocation failed.";

        if (err.code === err.PERMISSION_DENIED) {
          msg =
            "Location access denied. Please enable location permissions.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Location information is unavailable.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Location request timed out.";
        }

        setToast({
          type: "error",
          message: msg,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  const handleMarkerDragEnd = useCallback(
    (id, latitude, longitude) => {
      updateLocationCoordinates(id, latitude, longitude);
      setToast({
        type: "success",
        message: "Location coordinates updated.",
      });
    },
    [updateLocationCoordinates]
  );

  return (
    <div className="dashboard-page flex flex-col h-screen w-screen overflow-hidden text-slate-800 bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* ==================================================
          DECORATIVE BACKGROUND
          ================================================== */}
      <div className="fixed top-20 left-1/4 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="fixed bottom-10 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* ==================================================
          HEADER
          ================================================== */}
      <Header locationCount={locations.length} />

      {/* ==================================================
          MOBILE CONTROLS
          ================================================== */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b-[1.5px] border-slate-700 shadow-sm relative z-20">

        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-700 bg-blue-50 border-[1.5px] border-slate-700 rounded-lg hover:bg-blue-100 transition-all"
        >
          <PanelLeftOpen className="w-4 h-4 text-blue-600" />
          Locations
        </button>

        <button
          onClick={handleAddLocationClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <MapPin
            className="w-4 h-4"
            strokeWidth={2.5}
          />
          Add
        </button>

      </div>

      {/* ==================================================
          MAIN CONTENT
          ================================================== */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative z-10 gap-3 p-3">

        {/* ==================================================
            DESKTOP SIDEBAR
            ================================================== */}
        <div
          className="
            hidden md:flex
            flex-shrink-0
            w-[400px]
            min-w-[400px]
            max-w-[400px]
            h-full
            min-h-0
            overflow-hidden
            rounded-2xl
            bg-white
            border-2
            border-slate-300
            shadow-md
          "
        >
          <div className="w-full min-w-0 h-full overflow-hidden">
            <Sidebar
              locations={locations}
              filteredLocations={filteredLocations}
              selectedLocationId={selectedLocationId}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              sortBy={sortBy}
              onSearchChange={setSearchQuery}
              onCategoryChange={setCategoryFilter}
              onSortChange={setSortBy}
              onSelect={handleSelectLocation}
              onEdit={handleEditLocation}
              onDelete={handleDeleteLocation}
              onAddLocation={handleAddLocationClick}
            />
          </div>
        </div>

        {/* ==================================================
            MOBILE SIDEBAR DRAWER
            ================================================== */}
        {mobileSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-[1500] flex overlay-enter"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />

            <div
              className="relative w-[85%] max-w-[380px] bg-white shadow-2xl h-full flex flex-col border-r-2 border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Mobile sidebar header */}
              <div className="flex items-center justify-between px-4 py-3 border-b-[1.5px] border-slate-700 bg-gradient-to-r from-blue-50 to-purple-50">

                <span className="text-sm font-bold text-slate-800">
                  My Locations
                </span>

                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  aria-label="Close panel"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white border border-transparent hover:border-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                <Sidebar
                  locations={locations}
                  filteredLocations={filteredLocations}
                  selectedLocationId={selectedLocationId}
                  selectedLocation={selectedLocation}
                  searchQuery={searchQuery}
                  categoryFilter={categoryFilter}
                  sortBy={sortBy}
                  onSearchChange={setSearchQuery}
                  onCategoryChange={setCategoryFilter}
                  onSortChange={setSortBy}
                  onSelect={handleSelectLocation}
                  onEdit={handleEditLocation}
                  onDelete={handleDeleteLocation}
                  onAddLocation={handleAddLocationClick}
                />
              </div>

            </div>
          </div>
        )}

        {/* ==================================================
            MAP AREA
            ================================================== */}
        <div
          className="
            flex-1
            min-w-0
            min-h-0
            relative
            overflow-hidden
            rounded-2xl
            bg-slate-100
          "
        >

          {/* Map box */}
          <div
            className="
              relative
              w-full
              h-full
              min-h-[500px]
              rounded-2xl
              border-2
              border-slate-400
              bg-white
              shadow-lg
              overflow-hidden
            "
          >

            <MapView
              locations={locations}
              selectedLocationId={selectedLocationId}
              selectedLocation={selectedLocation}
              onSelect={handleSelectLocation}
              onMapClick={handleMapClick}
              onMarkerDragEnd={handleMarkerDragEnd}
              previewLocation={previewLocation}
              locatePosition={locatePosition}
              searchLocation={searchLocation}
              addMode={addMode}
            />

            {/* Map search */}
            <MapSearch
              onSelectResult={handleSearchResult}
            />

            {/* Locate Me */}
            <LocateMeButton
              onLocate={handleLocateMe}
              loading={locating}
            />

          </div>

        </div>

      </div>

      {/* ==================================================
          ADD LOCATION MODAL
          ================================================== */}
      {addModalCoords && (
        <AddLocationModal
          coordinates={addModalCoords}
          onSave={handleSaveNewLocation}
          onCancel={handleCancelAdd}
        />
      )}

      {/* ==================================================
          EDIT LOCATION MODAL
          ================================================== */}
      {editLocation && (
        <EditLocationModal
          location={editLocation}
          onSave={handleSaveEdit}
          onCancel={() => setEditLocation(null)}
        />
      )}

      {/* ==================================================
          DELETE CONFIRMATION
          ================================================== */}
      {deleteLocationData && (
        <DeleteConfirmDialog
          location={deleteLocationData}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteLocationData(null)}
        />
      )}

      {/* ==================================================
          TOAST
          ================================================== */}
      <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
      />

    </div>
  );
}