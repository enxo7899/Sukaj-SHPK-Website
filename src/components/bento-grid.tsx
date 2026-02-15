"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { partners } from "@/lib/data";
import { partnerVideos } from "@/lib/assets";

const tileLayout: Record<string, string> = {
  konti: "md:col-span-2 md:row-span-2",
  fitt: "md:col-span-1 md:row-span-2",
  "plastika-ks": "md:col-span-1 md:row-span-1",
};

export function BentoGrid() {
  const featured = partners.filter((p) => p.featured && ["konti", "fitt", "plastika-ks"].includes(p.id));
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950" />
      <div className="site-shell relative">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs tracking-[0.2em] text-slate-300">
            PARTNER ECOSYSTEM
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-[0.14em] text-white md:text-6xl">ENGINEERED ALLIANCE</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Hover to inspect media, click to open each partner profile module.</p>
        </div>

        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4" onMouseLeave={() => setHoveredId(null)}>
          {featured.map((partner) => {
            const media = partnerVideos[partner.id];
            const dimmed = hoveredId && hoveredId !== partner.id;

            return (
              <motion.button
                key={partner.id}
                onMouseEnter={() => setHoveredId(partner.id)}
                onClick={() => setExpandedId(partner.id)}
                className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 p-6 text-left backdrop-blur-md transition-all ${tileLayout[partner.id] ?? "md:col-span-1"}`}
                style={{ opacity: dimmed ? 0.4 : 1 }}
                whileHover={{ y: -6 }}
              >
                {media ? (
                  <video className="absolute inset-0 h-full w-full object-cover" muted loop autoPlay playsInline preload="none" src={media} />
                ) : null}
                <div className="absolute inset-0 bg-slate-950/65" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.25),transparent_45%)]" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-slate-300">{partner.country.toUpperCase()}</span>
                    <h3 className="mt-2 text-3xl font-black text-white">{partner.name}</h3>
                    <p className="mt-3 text-sm text-slate-200">{partner.tagline}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.15em] text-orange-300">{partner.specialty}</span>
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
          {featured.map((partner) => (
            <div key={`mobile-${partner.id}`} className="min-w-[85%] snap-center rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-2xl font-bold text-white">{partner.name}</h3>
              <p className="mt-2 text-slate-300">{partner.tagline}</p>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {expandedId && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-950 p-8">
                {(() => {
                  const partner = partners.find((p) => p.id === expandedId);
                  if (!partner) return null;
                  return (
                    <>
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-3xl font-black text-white">{partner.name}</h3>
                          <p className="mt-1 text-slate-300">{partner.description}</p>
                        </div>
                        <button onClick={() => setExpandedId(null)} className="rounded-full border border-white/20 p-2 text-white">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {partner.products.map((product) => (
                          <div key={product.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="font-bold text-white">{product.name}</div>
                            <div className="text-sm text-slate-300">{product.type}</div>
                            <div className="mt-1 font-mono text-xs tracking-[0.15em] text-orange-300">{product.diameters}</div>
                          </div>
                        ))}
                      </div>
                      <Link href="/partners" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm text-white">
                        View Partner Directory
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
