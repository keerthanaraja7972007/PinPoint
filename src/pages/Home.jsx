import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import mapPreview from "../assets/pinpoint-map-preview.png";
import { motion, useReducedMotion } from "framer-motion";

import {
  MapPin,
  Search,
  Layers,
  Pencil,
  MousePointerClick,
  Save,
  Navigation,
  Check,
  Code2,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";

// Floating Background Particles
const FloatingParticles = () => {
  const particles = [
    [8, 14, 6],
    [18, 68, 4],
    [31, 22, 5],
    [44, 84, 7],
    [57, 12, 4],
    [69, 72, 6],
    [78, 31, 5],
    [89, 15, 4],
    [95, 79, 7],
    [12, 91, 5],
    [25, 44, 4],
    [37, 70, 6],
    [51, 36, 5],
    [63, 94, 4],
    [74, 58, 6],
    [84, 88, 5],
    [92, 46, 4],
    [5, 51, 6],
  ];

  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {particles.map(([top, left, size], i) => (
        <motion.div
          key={i}
          className="home-particle absolute rounded-full"
          style={{
            width: size,
            height: size,
            top: `${top}%`,
            left: `${left}%`,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -22, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 5) * 0.35,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const techStack = [
    "React",
    "JavaScript",
    "Vite",
    "React Leaflet",
    "Leaflet",
    "OpenStreetMap",
    "Tailwind CSS",
    "LocalStorage",
  ];

  const keyFeatures = [
    "Interactive Map Exploration",
    "Custom Pin Markers & Info Windows",
    "Real-time Instant Search Filter",
    "Seamless Location Edit & Delete",
    "Selected Location Highlighting",
    "Browser LocalStorage Persistence",
    "Responsive Layout for Mobile & Desktop",
  ];

  return (
    <div className="home-page min-h-screen relative overflow-x-hidden text-slate-800">
      <style>{`
        .home-page {
          background:
            radial-gradient(
              circle at 8% 5%,
              rgba(59, 130, 246, 0.18),
              transparent 25%
            ),
            radial-gradient(
              circle at 92% 12%,
              rgba(168, 85, 247, 0.16),
              transparent 25%
            ),
            radial-gradient(
              circle at 50% 45%,
              rgba(14, 165, 233, 0.07),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #f8fbff 0%,
              #f5f3ff 45%,
              #f0f9ff 100%
            );
        }

        .home-particle {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.55),
            rgba(168, 85, 247, 0.55)
          );
          box-shadow:
            0 0 12px rgba(59, 130, 246, 0.4),
            0 0 22px rgba(168, 85, 247, 0.2);
        }

        .home-hero-heading {
          text-shadow:
            0 0 25px rgba(99, 102, 241, 0.12),
            0 0 50px rgba(59, 130, 246, 0.06);
          animation: home-heading-glow 5s ease-in-out infinite;
        }

        .home-preview-shell {
          box-shadow:
            0 28px 65px rgba(15, 23, 42, 0.18),
            0 10px 28px rgba(79, 70, 229, 0.12);
        }

        .home-preview-shell::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          padding: 1.5px;
          background:
            linear-gradient(
              135deg,
              rgba(37, 99, 235, 0.7),
              rgba(168, 85, 247, 0.65),
              rgba(6, 182, 212, 0.55),
              rgba(37, 99, 235, 0.7)
            );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .home-card {
          transition:
            transform 240ms ease,
            box-shadow 240ms ease,
            border-color 240ms ease;
        }

        .home-card:hover {
          box-shadow:
            0 20px 42px rgba(15, 23, 42, 0.14),
            0 5px 16px rgba(79, 70, 229, 0.08);
        }

        .dark-card-border {
          border: 1.5px solid #334155;
        }

        @keyframes home-heading-glow {
          0%,
          100% {
            text-shadow:
              0 0 28px rgba(99, 102, 241, 0.08),
              0 0 50px rgba(59, 130, 246, 0.04);
          }

          50% {
            text-shadow:
              0 0 38px rgba(99, 102, 241, 0.2),
              0 0 65px rgba(59, 130, 246, 0.08);
          }
        }

        @media (min-width: 768px) {
          .home-step-card:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -1.5rem;
            width: 1.5rem;
            height: 2px;
            background:
              linear-gradient(
                90deg,
                rgba(37, 99, 235, 0.6),
                rgba(168, 85, 247, 0.2)
              );
            pointer-events: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-card,
          .home-card:hover {
            transition: none;
            transform: none;
          }

          .home-hero-heading {
            text-shadow: none;
            animation: none;
          }
        }
      `}</style>

      <Navbar />

      <FloatingParticles />

      {/* HERO */}
      <section className="relative pt-8 pb-10 lg:pt-12 lg:pb-12 z-10 bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/60">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute top-1/3 right-10 w-[250px] h-[250px] bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 left-10 w-[220px] h-[220px] bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
              }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-700 shadow-sm mb-4">
                <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />

                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Interactive Favourite Location Management
                </span>
              </div>

              <h1 className="home-hero-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.1] tracking-tight mb-4">
                Your places.
                <br />
                Your map.
                <br />

                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                  Your way.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-6">
                PinPoint provides a seamless way to mark, save, search, and
                manage your favorite places worldwide through a beautiful
                interactive map.
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group active:scale-[0.98]"
              >
                Get Started

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* RIGHT - MAP PREVIEW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.15,
              }}
              className="relative group w-full"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition duration-500" />

              {/* Preview Card */}
              <div className="home-preview-shell relative w-full rounded-2xl border-[1.5px] border-slate-700 bg-white shadow-xl overflow-hidden">

                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50">
                  <div className="flex items-center gap-2">

                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-md">
                      <MapPin
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={2.5}
                      />
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                      PinPoint Live Workspace
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-700 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      4 Saved Places
                    </span>
                  </div>
                </div>

                {/* MAP IMAGE */}
                <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[350px] overflow-hidden bg-slate-100">
                  <img
                    src={mapPreview}
                    alt="PinPoint interactive map preview"
                    className="block w-full h-full object-cover"
                    draggable="false"
                  />

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-700 shadow-md">
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      OpenStreetMap Layer
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT PINPOINT */}
      <section
        id="about"
        className="py-10 bg-white relative z-10 border-y-2 border-slate-800/20 scroll-mt-12"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-slate-700 mb-2.5 shadow-sm">
              <MapPin
                className="w-3.5 h-3.5 text-blue-600"
                strokeWidth={2.5}
              />

              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                About Platform
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-2 tracking-tight">
              About PinPoint
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              PinPoint is a lightweight interactive favorite-location
              management application that allows users to mark, save, search,
              edit, and organize places on a custom map instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: MousePointerClick,
                label: "Mark",
                desc: "Click anywhere on the map grid to drop a visual location pin.",
                gradient: "from-blue-500 to-cyan-500",
                bg: "from-blue-50 to-cyan-50",
              },
              {
                icon: Save,
                label: "Save",
                desc: "Assign a custom title and persist it safely in browser storage.",
                gradient: "from-emerald-500 to-teal-500",
                bg: "from-emerald-50 to-teal-50",
              },
              {
                icon: Search,
                label: "Search",
                desc: "Filter through all saved places instantly with live title search.",
                gradient: "from-indigo-500 to-purple-500",
                bg: "from-indigo-50 to-purple-50",
              },
              {
                icon: Pencil,
                label: "Manage",
                desc: "Update location names or remove old markers with a single tap.",
                gradient: "from-orange-500 to-pink-500",
                bg: "from-orange-50 to-pink-50",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`home-card group relative rounded-2xl bg-gradient-to-br ${item.bg} p-5 dark-card-border shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/50 blur-xl group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">

                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white mb-3.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-6 h-6" strokeWidth={2} />
                  </div>

                  <h3 className="text-base font-bold text-slate-950 mb-1 tracking-tight">
                    {item.label}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PINPOINT */}
      <section className="py-10 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-2 tracking-tight">
              Why Choose PinPoint?
            </h2>

            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Everything required to map, discover, and organize your favorite
              destinations in one sleek interface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: MapPin,
                title: "Mark Locations",
                desc: "Click anywhere on the interactive Leaflet map canvas to drop customized pins instantly.",
                color: "text-blue-700",
                bg: "bg-blue-100",
                borderHover: "hover:border-blue-600",
                top: "from-blue-500 to-cyan-500",
              },
              {
                icon: Layers,
                title: "Organize Places",
                desc: "List and view all saved destinations in an interactive, organized sidebar menu.",
                color: "text-purple-700",
                bg: "bg-purple-100",
                borderHover: "hover:border-purple-600",
                top: "from-purple-500 to-fuchsia-500",
              },
              {
                icon: Search,
                title: "Find Quickly",
                desc: "Perform real-time searches across your saved destinations by title.",
                color: "text-emerald-700",
                bg: "bg-emerald-100",
                borderHover: "hover:border-emerald-600",
                top: "from-emerald-500 to-teal-500",
              },
              {
                icon: Pencil,
                title: "Manage Easily",
                desc: "Edit location names or delete obsolete entries with built-in controls.",
                color: "text-orange-700",
                bg: "bg-orange-100",
                borderHover: "hover:border-orange-600",
                top: "from-orange-500 to-pink-500",
              },
            ].map((feat) => (
              <motion.div
                key={feat.title}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                className={`home-card group relative p-5 rounded-2xl bg-white dark-card-border shadow-sm hover:-translate-y-1 hover:shadow-xl ${feat.borderHover} transition-all duration-300 overflow-hidden`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feat.top}`}
                />

                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl ${feat.bg} ${feat.color} mb-3.5 group-hover:scale-110 transition-transform duration-200`}
                >
                  <feat.icon className="w-5 h-5" strokeWidth={2.2} />
                </div>

                <h3 className="text-base font-bold text-slate-950 mb-1.5 tracking-tight">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-10 bg-white relative z-10 border-t-2 border-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-2 tracking-tight">
              How It Works
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm">
              Three easy steps to curate your customized location database.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              {
                num: "01",
                icon: MousePointerClick,
                title: "Pin a Spot",
                desc: "Click anywhere on the map interface to pinpoint your chosen geographic location.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                num: "02",
                icon: Save,
                title: "Label & Save",
                desc: "Type a personalized location title and save it directly into your local database.",
                gradient: "from-purple-500 to-fuchsia-500",
              },
              {
                num: "03",
                icon: Navigation,
                title: "Navigate & Edit",
                desc: "Select locations from your sidebar to highlight them on the map or edit their details.",
                gradient: "from-emerald-500 to-teal-500",
              },
            ].map((step) => (
              <motion.div
                key={step.num}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="home-card home-step-card group relative p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border-[1.5px] border-slate-700 hover:border-slate-950 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">

                  <span className="text-4xl font-black text-slate-300 group-hover:text-slate-500 transition-colors duration-300">
                    {step.num}
                  </span>

                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} text-white shadow-md group-hover:scale-110 transition-all duration-300`}
                  >
                    <step.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-950 mb-1.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-t-2 border-slate-800/20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-1.5">
              Designed for Convenience
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm">
              Packed with modern frontend capabilities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {keyFeatures.map((feat, index) => (
              <motion.div
                key={feat}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                className="home-card group flex items-center gap-2.5 p-3 rounded-xl bg-white border-[1.5px] border-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-emerald-600 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-full ${
                    index % 2 === 0
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  } flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>

                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {feat}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="py-10 bg-white border-t-2 border-slate-800/20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-md">
              <Code2
                className="w-5 h-5 text-white"
                strokeWidth={2}
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Tech Stack & Architecture
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech, index) => (
              <span
                key={tech}
                className={`home-card px-3.5 py-1.5 text-xs sm:text-sm font-semibold ${
                  index % 3 === 0
                    ? "text-blue-700 bg-blue-50 border-blue-700"
                    : index % 3 === 1
                    ? "text-purple-700 bg-purple-50 border-purple-700"
                    : "text-cyan-700 bg-cyan-50 border-cyan-700"
                } border-[1.5px] rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default`}
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mt-5 text-center leading-relaxed max-w-xl mx-auto">
            PinPoint runs entirely on the frontend with zero external database
            dependencies. All marker data and coordinates are cached locally
            inside your browser's persistent storage.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t-2 border-slate-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-2.5">

              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm">
                <MapPin
                  className="w-3.5 h-3.5 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <span className="text-sm font-bold text-white">
                  PinPoint
                </span>

                <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
                  • Interactive Location Manager
                </span>
              </div>
            </div>

            <nav className="flex items-center gap-6">

              <button
                onClick={scrollToTop}
                className="text-xs sm:text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
              >
                Home
              </button>

              <button
                onClick={scrollToAbout}
                className="text-xs sm:text-sm font-medium text-slate-400 hover:text-purple-400 transition-colors"
              >
                About
              </button>

            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}