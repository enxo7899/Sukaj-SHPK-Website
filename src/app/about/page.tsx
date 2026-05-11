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
import { useTranslation } from "@/lib/i18n/context";

export default function AboutPage() {
  const { t } = useTranslation();
  const countryPartners: { flag: string; country: string; count: number }[] = [
    { flag: "🇦🇱", country: t("about.countryAlbania"), count: partners.filter((p) => p.country === "Albania").length },
    { flag: "🇽🇰", country: t("about.countryKosovo"), count: partners.filter((p) => p.country === "Kosovo").length },
    { flag: "🇲🇰", country: t("about.countryNorthMacedonia"), count: partners.filter((p) => p.country === "North Macedonia").length },
    { flag: "🇷🇸", country: t("about.countrySerbia"), count: partners.filter((p) => p.country === "Serbia").length },
    { flag: "🇬🇷", country: t("about.countryGreece"), count: partners.filter((p) => p.country === "Greece").length },
    { flag: "🇮🇹", country: t("about.countryItaly"), count: partners.filter((p) => p.country === "Italy").length },
    { flag: "🇹🇷", country: t("about.countryTurkey"), count: partners.filter((p) => p.country === "Turkey").length },
  ];

  return (
    <div className="min-h-screen bg-[var(--site-bg)]">

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
              <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-500/80 uppercase">
                {t("about.eyebrow")}
              </span>
            </div>
            <h1
              className="font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", color: "var(--site-text)" }}
            >
              {t("about.headline1")}
              <br />
              <span
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
                }}
              >
                {t("about.headline2")}
              </span>
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--site-text-muted)" }}>
              {t("about.leadParagraph")}
            </p>
          </motion.div>

          {/* Company fact strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--site-border)", border: "1px solid var(--site-border)" }}
          >
            {[
              { icon: Calendar, label: t("about.established"), value: String(company.established) },
              { icon: MapPin, label: t("about.headquarters"), value: company.location },
              { icon: Briefcase, label: t("about.activity"), value: t("about.activityValue") },
              { icon: Users, label: t("about.administrator"), value: company.administrator },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 px-5 py-5"
                style={{ backgroundColor: "var(--site-bg)" }}
              >
                <Icon className="h-4 w-4 text-cyan-500/60 mb-1" />
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--site-text-soft)" }}>
                  {label}
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--site-text)" }}>
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
                <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-500/80 uppercase">
                  {t("about.ourBusiness")}
                </span>
              </div>
              <h2
                className="font-black leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--site-text)" }}
              >
                {t("about.businessTitle")}
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
                <p>
                  {t("about.businessP1")
                    .replace("{year}", String(company.established))
                    .replace("{location}", company.location)}
                </p>
                <p>
                  {t("about.businessP2")
                    .replace("{capital}", company.capital)
                    .replace("{countries}", String(company.stats.countriesServed))}
                </p>
                <p>
                  {t("about.businessP3")
                    .replace("{partners}", String(company.stats.partnersCount))}
                </p>
              </div>

              {/* Pillars */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                {[
                  { icon: Building2, label: t("about.pillarCivil"), detail: t("about.pillarCivilDetail") },
                  { icon: Globe2, label: t("about.pillarRegion"), detail: t("about.pillarRegionDetail") },
                  { icon: Users, label: t("about.pillarPartners"), detail: t("about.pillarPartnersDetail") },
                  { icon: Clock, label: t("about.pillarYears"), detail: t("about.pillarYearsDetail") },
                ].map(({ icon: Icon, label, detail }) => (
                  <div
                    key={label}
                    className="flex gap-3 rounded-xl p-4"
                    style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
                  >
                    <Icon className="h-5 w-5 text-cyan-500/70 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--site-text)" }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--site-text-soft)" }}>{detail}</p>
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
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--site-border)" }}
              >
                <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--site-border)" }}>
                  <p className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--site-text-soft)" }}>
                    {t("about.partnerCountries")}
                  </p>
                  <p className="text-lg font-bold mt-1" style={{ color: "var(--site-text)" }}>
                    {t("about.manufacturingNetwork")}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--site-border)" }}>
                  {countryPartners.map(({ flag, country, count }, i) => (
                    <motion.div
                      key={country}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="flex items-center gap-4 px-6 py-4"
                      style={{ borderBottom: i < countryPartners.length - 1 ? "1px solid var(--site-border)" : undefined }}
                    >
                      <span className="text-2xl leading-none">{flag}</span>
                      <span className="flex-1 text-sm font-medium" style={{ color: "var(--site-text-muted)" }}>
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
                        <span className="font-mono text-[11px]" style={{ color: "var(--site-text-soft)" }}>
                          {count} {count > 1 ? t("about.partnerPlural") : t("about.partnerSingular")}
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
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(34,197,94,0.05) 0%, transparent 70%)",
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
              <span className="font-mono text-[11px] tracking-[0.28em] text-green-500/80 uppercase">
                {t("about.sustainability")}
              </span>
            </div>
            <h2
              className="font-black leading-tight tracking-tight mb-4 max-w-xl"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--site-text)" }}
            >
              {t("about.sustainTitle1")}
              <br />
              <span
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(90deg, #4ade80 0%, #22c55e 60%)",
                }}
              >
                {t("about.sustainTitle2")}
              </span>
            </h2>
            <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--site-text-muted)" }}>
              {t("about.sustainSubtitle")}
            </p>
          </motion.div>

          <div
            className="grid sm:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--site-border)", border: "1px solid var(--site-border)" }}
          >
            {[
              {
                icon: Clock,
                stat: "100+",
                label: t("about.sustainLife"),
                detail: t("about.sustainLifeDetail"),
                accent: "#22c55e",
              },
              {
                icon: Recycle,
                stat: "2",
                label: t("about.sustainRecycling"),
                detail: t("about.sustainRecyclingDetail"),
                accent: "#4ade80",
              },
              {
                icon: Leaf,
                stat: "7",
                label: t("about.sustainRegional"),
                detail: t("about.sustainRegionalDetail"),
                accent: "#86efac",
              },
            ].map(({ icon: Icon, stat, label, detail, accent }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-4 p-7 sm:p-8"
                style={{ backgroundColor: "var(--site-bg)" }}
              >
                <Icon className="h-6 w-6" style={{ color: accent }} />
                <div>
                  <p className="text-4xl font-black mb-0.5" style={{ color: accent }}>
                    {stat}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--site-text-soft)" }}>
                    {label}
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured partners teaser ── */}
      <section className="relative py-16 sm:py-20" style={{ borderTop: "1px solid var(--site-border)" }}>
        <div className="site-shell">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-cyan-500/80 uppercase mb-2">
                {t("about.ourNetwork")}
              </p>
              <h2 className="text-2xl font-black" style={{ color: "var(--site-text)" }}>
                {t("about.keyPartners")}
              </h2>
            </div>
            <a
              href="/partners"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:border-cyan-500/30 hover:text-cyan-500 self-start sm:self-auto"
              style={{ border: "1px solid var(--site-border)", color: "var(--site-text-muted)" }}
            >
              {t("about.allProfiles")}
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
                  className="group flex flex-col items-center gap-3 rounded-2xl p-4 text-center transition-all"
                  style={{ border: "1px solid var(--site-border)", backgroundColor: "var(--site-surface)" }}
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
                    <p className="text-xs font-semibold leading-snug" style={{ color: "var(--site-text)" }}>
                      {p.name}
                    </p>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--site-text-soft)" }}>
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
