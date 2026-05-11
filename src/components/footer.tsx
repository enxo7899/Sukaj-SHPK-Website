"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { company, partners } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useTranslation();

  const topPartners = partners
    .filter((p) => p.featured)
    .sort((a, b) => a.featuredPriority - b.featuredPriority)
    .slice(0, 6);

  const solutionsLinks = [
    { key: "civilEngineering", href: "/catalog?category=civil" },
    { key: "agriculture", href: "/catalog?category=agri" },
    { key: "industrial", href: "/catalog?category=industrial" },
    { key: "fullCatalog", href: "/catalog" },
  ];

  const companyLinks = [
    { key: "aboutUs", href: "/about" },
    { key: "ourHistory", href: "/about#timeline" },
    { key: "partnersHeading", href: "/partners" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "var(--site-bg)",
        borderTop: "1px solid var(--site-border)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="site-shell relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="relative h-16 w-48 mb-6">
              <Image
                src="/media/hero/logo.png"
                alt="Sukaj SHPK"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--site-text-muted)" }}>
              {t("footer.description")}
            </p>
            <p className="text-xs font-mono mb-6" style={{ color: "var(--site-text-soft)" }}>
              {t("footer.administrator")}: {company.administrator}
            </p>
            <div className="space-y-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-cyan-500"
                style={{ color: "var(--site-text-muted)" }}
              >
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                {company.location}
              </a>
              <a
                href="tel:+355123456789"
                className="flex items-center gap-3 text-sm transition-colors hover:text-cyan-500"
                style={{ color: "var(--site-text-muted)" }}
              >
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                +355 123 456 789
              </a>
              <a
                href="mailto:info@sukaj.al"
                className="flex items-center gap-3 text-sm transition-colors hover:text-cyan-500"
                style={{ color: "var(--site-text-muted)" }}
              >
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                info@sukaj.al
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-cyan-500/60" />
              <h3 className="font-mono text-[11px] tracking-[0.28em] text-cyan-500/80 uppercase">
                {t("footer.solutionsHeading")}
              </h3>
            </div>
            <ul className="space-y-3">
              {solutionsLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-cyan-500"
                    style={{ color: "var(--site-text-muted)" }}
                  >
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-cyan-500/60" />
              <h3 className="font-mono text-[11px] tracking-[0.28em] text-cyan-500/80 uppercase">
                {t("footer.partnersHeading")}
              </h3>
            </div>
            <ul className="space-y-3">
              {topPartners.map((partner) => (
                <li key={partner.id}>
                  <Link
                    href={`/partners#${partner.id}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-cyan-500 group"
                    style={{ color: "var(--site-text-muted)" }}
                  >
                    {partner.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {t("footer.viewAllPartners")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-cyan-500/60" />
              <h3 className="font-mono text-[11px] tracking-[0.28em] text-cyan-500/80 uppercase">
                {t("footer.companyHeading")}
              </h3>
            </div>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-cyan-500"
                    style={{ color: "var(--site-text-muted)" }}
                  >
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--site-border)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono" style={{ color: "var(--site-text-soft)" }}>
              © {new Date().getFullYear()} SUKAJ SHPK. {t("footer.rightsReserved")}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs transition-colors hover:text-cyan-500"
                style={{ color: "var(--site-text-soft)" }}
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-xs transition-colors hover:text-cyan-500"
                style={{ color: "var(--site-text-soft)" }}
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
