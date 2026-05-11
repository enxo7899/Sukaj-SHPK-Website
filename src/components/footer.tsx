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
    <footer className="relative bg-[#020617] border-t border-white/[0.06]">
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
          <div className="lg:col-span-1">
            <div className="relative h-16 w-48 mb-6">
              <Image
                src="/media/hero/logo.png"
                alt="Sukaj SHPK"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            <p className="text-xs text-slate-500 font-mono mb-6">
              {t("footer.administrator")}: {company.administrator}
            </p>
            <div className="space-y-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                {company.location}
              </a>
              <a
                href="tel:+355123456789"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                +355 123 456 789
              </a>
              <a
                href="mailto:info@sukaj.al"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                info@sukaj.al
              </a>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-cyan-500/60" />
              <h3 className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("footer.solutionsHeading")}
              </h3>
            </div>
            <ul className="space-y-3">
              {solutionsLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-cyan-500/60" />
              <h3 className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("footer.partnersHeading")}
              </h3>
            </div>
            <ul className="space-y-3">
              {topPartners.map((partner) => (
                <li key={partner.id}>
                  <Link
                    href={`/partners#${partner.id}`}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                  >
                    {partner.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {t("footer.viewAllPartners")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-cyan-500/60" />
              <h3 className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
                {t("footer.companyHeading")}
              </h3>
            </div>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} SUKAJ SHPK. {t("footer.rightsReserved")}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
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
