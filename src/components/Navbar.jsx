import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-sm group-hover:shadow-md transition-shadow">
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">
              PinPoint
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Home
            </button>
            <button
              onClick={scrollToAbout}
              className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              About
            </button>
            <button
              onClick={goToDashboard}
              className="ml-2 flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm hover:from-primary-600 hover:to-primary-700 hover:shadow-md transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-slate-100 pt-3">
            <button
              onClick={scrollToTop}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Home
            </button>
            <button
              onClick={scrollToAbout}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              About
            </button>
            <button
              onClick={goToDashboard}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-center mt-2"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
