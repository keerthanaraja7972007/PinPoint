import { Link } from "react-router-dom";
import { MapPin, LayoutDashboard, Home } from "lucide-react";

export default function Header({ locationCount }) {
  return (
    <header className="px-5 py-3 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-sm group-hover:shadow-md transition-shadow">
            <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight tracking-tight">
              PinPoint
            </h1>
            <p className="text-xs text-slate-500 leading-tight">
              Interactive Favorite Location Manager
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100">
            <MapPin className="w-3.5 h-3.5 text-primary-600" strokeWidth={2.5} />
            <span className="text-sm font-semibold text-primary-700">
              {locationCount} {locationCount === 1 ? "Location" : "Locations"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
