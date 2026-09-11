import { useEffect, useState } from "react";
import { LoaderCircle, MapPinned, Search, X } from "lucide-react";

export default function MapSearch({ onSelectResult }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setError("");
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          q: trimmedQuery,
          format: "jsonv2",
          limit: "5",
          addressdetails: "1",
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = await response.json();
        setResults(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setResults([]);
          setError("Search is unavailable right now. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] w-[min(360px,calc(100%-2rem))]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search city, landmark or address..."
          aria-label="Search city, landmark or address"
          className="w-full pl-9 pr-9 py-3 text-sm rounded-xl border-2 border-slate-400 bg-white text-slate-700 placeholder-slate-400 shadow-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear map search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {(loading ||
        error ||
        (query.trim().length >= 2 && !loading && !results.length)) && (
        <div className="mt-2 rounded-xl border-2 border-slate-300 bg-white p-3 text-sm shadow-lg">
          {loading && (
            <div className="flex items-center gap-2 text-slate-500">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Searching OpenStreetMap...
            </div>
          )}

          {!loading && error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && !error && (
            <p className="text-slate-500">No results found.</p>
          )}
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="mt-2 overflow-hidden rounded-xl border-2 border-slate-300 bg-white shadow-lg">
          {results.map((result) => (
            <button
              key={result.place_id}
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                onSelectResult(result);
              }}
              className="flex w-full items-start gap-2.5 border-b border-slate-200 px-3 py-2.5 text-left last:border-0 hover:bg-primary-50 transition-colors"
            >
              <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />

              <span className="text-sm leading-5 text-slate-700">
                {result.display_name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}