"use client";

import { motion } from "framer-motion";
import { StatsPremium } from "@/components/stats-premium";
import { TimelinePremium } from "@/components/timeline-premium";
import { CTA } from "@/components/cta";
import { company, partners } from "@/lib/data";
import {
  MapPin,
  Building2,
  Calendar,
  Users,
  Globe2,
  Leaf,
  Recycle,
  Clock,
  Briefcase,
  ExternalLink,
} from "lucide-react";

const countryPartners: { flag: string; country: string; count: number }[] = [
  { flag: "🇦🇱", country: "Albania", count: partners.filter((p) => p.country === "Albania").length },
  { flag: "🇽🇰", country: "Kosovo", count: partners.filter((p) => p.country === "Kosovo").length },
  { flag: "🇲🇰", country: "North Macedonia", count: partners.filter((p) => p.country === "North Macedonia").length },
  { flag: "🇷🇸", country: "Serbia", count: partners.filter((p) => p.country === "Serbia").length },
  { flag: "🇬🇷", country: "Greece", count: partners.filter((p) => p.country === "Greece").length },
  { flag: "🇮🇹", country: "Italy", count: partners.filter((p) => p.country === "Italy").length },
  { flag: "🇹🇷", country: "Turkey", count: partners.filter((p) => p.country === "Turkey").length },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617]">

      {/* ── Hero header ── */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(8,145,178,0.10) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.4) 35%, rgba(8,145,178,0.6) 50%, rgba(34,211,238,0.4) 65%, transparent)",
          }}
        />

        <div className="site-shell relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-cyan-500/60" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                About Sukaj SHPK
              </span>
            </div>
            <h1
              className="font-black text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              Serving the Balkans
              <br />
              <span
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage:
                    "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
                }}
              >
                since 1995.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              {company.description}
            </p>
          </motion.div>

          {/* Company fact strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]"
          >
            {[
              { icon: Calendar, label: "Established", value: String(company.established) },
              { icon: MapPin, label: "Headquarters", value: company.location },
              { icon: Briefcase, label: "Activity", value: "Import-export & wholesale" },
              { icon: Users, label: "Administrator", value: company.administrator },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 bg-[#020617] px-5 py-5"
              >
                <Icon className="h-4 w-4 text-cyan-500/60 mb-1" />
                <span className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
                  {label}
                </span>
                <span className="text-sm font-semibold text-slate-200">
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsPremium />

      {/* ── Who we are ── */}
      <section className="relative py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-cyan-500/60" />
                <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                  Our Business
                </span>
              </div>
              <h2
                className="font-black text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                The premier pipe-system distributor for the Balkans.
              </h2>
              <div className="space-y-4 text-slate-400 text-base leading-relaxed">
                <p>
                  Founded in {company.established} in {company.location}, Sukaj SHPK
                  operates as an import-export and wholesale trading company
                  specialising in plastic materials — primarily pipe systems for civil,
                  agricultural and industrial applications.
                </p>
                <p>
                  Our registered capital of{" "}
                  <span className="text-slate-200 font-medium">{company.capital}</span>{" "}
                  underpins a logistics and distribution network reaching{" "}
                  <span className="text-slate-200 font-medium">
                    {company.stats.countriesServed} countries
                  </span>{" "}
                  across Southeast Europe.
                </p>
                <p>
                  We work directly with{" "}
                  <span className="text-slate-200 font-medium">
                    {company.stats.partnersCount} European manufacturing partners
                  </span>{" "}
                  — handling sourcing, import documentation, customs clearance and
                  last-mile delivery so contractors and municipalities can focus on
                  building.
                </p>
              </div>

              {/* Pillars */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                {[
                  { icon: Building2, label: "Civil Infrastructure", detail: "Sewage, drainage, water mains" },
                  { icon: Globe2, label: "Regional Reach", detail: "12 countries across SE Europe" },
                  { icon: Users, label: "12 Partners", detail: "Across 7 countries" },
                  { icon: Clock, label: "30 Years", detail: "Uninterrupted trading since 1995" },
                ].map(({ icon: Icon, label, detail }) => (
                  <div
                    key={label}
                    className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                  >
                    <Icon className="h-5 w-5 text-cyan-500/70 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: geographic network */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden">
                <div className="px-6 py-5 border-b border-white/[0.06]">
                  <p className="font-mono text-[11px] tracking-[0.25em] text-slate-600 uppercase">
                    Partner Countries
                  </p>
                  <p className="text-lg font-bold text-white mt-1">
                    Manufacturing Network
                  </p>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {countryPartners.map(({ flag, country, count }, i) => (
                    <motion.div
                      key={country}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="flex items-center gap-4 px-6 py-4"
                    >
                      <span className="text-2xl leading-none">{flag}</span>
                      <span className="flex-1 text-sm font-medium text-slate-300">
                        {country}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {Array.from({ length: count }).map((_, j) => (
                            <div
                              key={j}
                              className="h-1.5 w-4 rounded-full bg-cyan-500/50"
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-slate-600">
                          {count} partner{count > 1 ? "s" : ""}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <div id="timeline">
        <TimelinePremium />
      </div>

      {/* ── Sustainability ── */}
      <section id="sustainability" className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(34,197,94,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="site-shell relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-green-500/60" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-green-400/80 uppercase">
                Sustainability
              </span>
            </div>
            <h2
              className="font-black text-white leading-tight tracking-tight mb-4 max-w-xl"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Built to last.
              <br />
              <span
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(90deg, #4ade80 0%, #22c55e 60%)",
                }}
              >
                Built responsibly.
              </span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              Durability is sustainability. Every pipe we supply is engineered for
              decades of service — and several of our partners close the loop through
              active recycling programmes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
            {[
              {
                icon: Clock,
                stat: "100+",
                label: "Years service life",
                detail:
                  "PE and PP pipe systems are engineered for 100+ years underground, eliminating frequent replacement cycles.",
                accent: "#22c55e",
              },
              {
                icon: Recycle,
                stat: "2",
                label: "Recycling partners",
                detail:
                  "PLASTIKA (Kosovo) and Plastika DOO Nova Varoš (Serbia) convert post-consumer plastic waste into new granulates and films.",
                accent: "#4ade80",
              },
              {
                icon: Leaf,
                stat: "7",
                label: "Balkan countries",
                detail:
                  "Regional sourcing from Balkan manufacturers cuts transport emissions compared to distant global supply chains.",
                accent: "#86efac",
              },
            ].map(({ icon: Icon, stat, label, detail, accent }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-4 bg-[#020617] p-7 sm:p-8"
              >
                <Icon className="h-6 w-6" style={{ color: accent }} />
                <div>
                  <p
                    className="text-4xl font-black mb-0.5"
                    style={{ color: accent }}
                  >
                    {stat}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
                    {label}
                  </p>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured partners teaser ── */}
      <section className="relative py-16 sm:py-20 border-t border-white/[0.05]">
        <div className="site-shell">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-cyan-400/80 uppercase mb-2">
                Our Network
              </p>
              <h2 className="text-2xl font-black text-white">
                Key manufacturing partners
              </h2>
            </div>
            <a
              href="/partners"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/30 hover:text-white self-start sm:self-auto"
            >
              All profiles
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {partners
              .filter((p) => p.featured)
              .sort((a, b) => a.featuredPriority - b.featuredPriority)
              .map((p, i) => (
                <motion.a
                  key={p.id}
                  href={p.website || `/partners#${p.id}`}
                  target={p.website ? "_blank" : undefined}
                  rel={p.website ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-center transition-all hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black"
                    style={{
                      backgroundColor: `${p.color}18`,
                      border: `1px solid ${p.color}30`,
                      color: p.color,
                    }}
                  >
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-snug">
                      {p.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-600 mt-0.5">
                      {p.country}
                    </p>
                  </div>
                </motion.a>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA />
    </div>
  );
}
