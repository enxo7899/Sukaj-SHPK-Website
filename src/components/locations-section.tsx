"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Building2, Warehouse, Package } from "lucide-react";
import { locations } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/context";

const locationIcons: Record<string, typeof Building2> = {
  "shkoder": Building2,
  "vore-tirana": Warehouse,
  "lac": Package,
};

export function LocationsSection() {
  const { t } = useTranslation();
  const [activeLocation, setActiveLocation] = useState(locations[1].id); // Default to HQ
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const active = locations.find((l) => l.id === activeLocation) ?? locations[1];
  const localizedLocationMeta: Record<string, { label: string; description: string }> = {
    "vore-tirana": {
      label: t("locations.labelWarehouse"),
      description: t("locations.voreDescription"),
    },
    shkoder: {
      label: t("locations.labelHeadquarters"),
      description: t("locations.shkoderDescription"),
    },
    lac: {
      label: t("locations.labelRegionalDepot"),
      description: t("locations.lacDescription"),
    },
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-[var(--site-bg)]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(8,145,178,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="site-shell relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              {t("locations.eyebrow")}
            </span>
          </div>
          <h2
            className="font-black leading-[1.05] tracking-tight mb-4 max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "var(--site-text)" }}
          >
            {t("locations.title")}
          </h2>
          <p className="max-w-xl text-base leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
            {t("locations.subtitle")}
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-6 lg:gap-8">
          {/* Left: Location cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            {locations.map((location) => {
              const isActive = activeLocation === location.id;
              const Icon = locationIcons[location.id] ?? MapPin;
              return (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(location.id)}
                  className="group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300"
                  style={isActive
                    ? { borderColor: "rgba(6,182,212,0.3)", backgroundColor: "rgba(6,182,212,0.06)" }
                    : { borderColor: "var(--site-border)", backgroundColor: "var(--site-surface)" }
                  }
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="location-active"
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-cyan-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                    style={isActive
                      ? { backgroundColor: "rgba(6,182,212,0.15)", color: "#22d3ee" }
                      : { backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)" }
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-sm font-bold transition-colors duration-300"
                        style={{ color: isActive ? "var(--site-text)" : "var(--site-text-muted)" }}
                      >
                        {location.name}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[9px] tracking-widest uppercase transition-colors duration-300"
                        style={isActive
                          ? { backgroundColor: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.25)" }
                          : { backgroundColor: "var(--site-surface)", color: "var(--site-text-soft)", border: "1px solid var(--site-border)" }
                        }
                      >
                        {localizedLocationMeta[location.id]?.label ?? location.label}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed transition-colors duration-300"
                      style={{ color: "var(--site-text-muted)" }}
                    >
                      {localizedLocationMeta[location.id]?.description ?? location.description}
                    </p>

                    {/* Directions link */}
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 text-cyan-500 hover:text-cyan-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Navigation className="h-3 w-3" />
                      {t("locations.getDirections")}
                      <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                    </a>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right: Interactive map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-0 rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
          >
            {/* Map header bar */}
            <div
              className="absolute top-0 inset-x-0 z-10 flex items-center gap-3 px-5 py-3 backdrop-blur-md"
              style={{ backgroundColor: "color-mix(in oklab, var(--site-bg) 80%, transparent)", borderBottom: "1px solid var(--site-border)" }}
            >
              <MapPin className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-semibold" style={{ color: "var(--site-text)" }}>{active.name}</span>
              <span className="text-xs" style={{ color: "var(--site-text-soft)" }}>{active.address}</span>
            </div>

            {/* Map embed */}
            <iframe
              key={active.id}
              src={`https://www.google.com/maps?q=${active.coordinates.lat},${active.coordinates.lng}&z=15&output=embed`}
              className="theme-map-iframe h-full w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${active.name}`}
            />

            {/* Bottom overlay with coordinates */}
            <div className="theme-map-bottom-overlay absolute bottom-0 inset-x-0 z-10 flex items-center justify-between px-5 py-3">
              <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--site-text-soft)" }}>
                {active.coordinates.lat.toFixed(4)}°N, {active.coordinates.lng.toFixed(4)}°E
              </span>
              <a
                href={active.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:text-cyan-400"
                style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)", color: "var(--site-text-muted)" }}
              >
                {t("locations.openInGoogleMaps")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
