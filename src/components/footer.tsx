import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { company, partners } from "@/lib/data";

export function Footer() {
  const topPartners = partners
    .filter((p) => p.featured)
    .sort((a, b) => a.featuredPriority - b.featuredPriority)
    .slice(0, 6);

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-white/10">
      <div className="absolute inset-0 dot-matrix opacity-20" />
      <div className="absolute inset-0 noise" />

      <div className="site-shell relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 via-slate-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 ring-1 ring-white/10">
                <span className="text-white font-black text-xl drop-shadow-sm">S</span>
              </div>
              <div>
                <span className="text-xl font-black tracking-[0.12em] text-white">
                  SUKAJ SHPK
                </span>
                <span className="text-[10px] font-mono text-slate-400 block tracking-wider">
                  EST. {company.established} • ALBANIA
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Import-export of plastic materials &amp; wholesale trading of
              industrial pipe systems across the Balkans since 1995.
            </p>
            <p className="text-xs text-slate-500 font-mono mb-6">
              Administrator: {company.administrator}
            </p>
            <div className="space-y-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-500" />
                {company.location}
              </a>
              <a
                href="tel:+355123456789"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                +355 123 456 789
              </a>
              <a
                href="mailto:info@sukaj.al"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-500" />
                info@sukaj.al
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-white mb-6">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Civil Engineering", href: "/catalog?category=civil" },
                { name: "Agriculture", href: "/catalog?category=agri" },
                { name: "Industrial", href: "/catalog?category=industrial" },
                { name: "Full Catalog", href: "/catalog" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-white mb-6">
              PARTNERS
            </h3>
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
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  View all partners →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-white mb-6">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our History", href: "/about#timeline" },
                { name: "Partners", href: "/partners" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" style={{ top: 'calc(100% - 4.5rem)' }} />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} SUKAJ SHPK. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
