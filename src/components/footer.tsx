import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { company, partners } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10">
      <div className="absolute inset-0 dot-matrix opacity-30" />
      
      <div className="site-shell relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider text-white">
                  SUKAJ SHPK
                </span>
                <span className="text-xs font-mono text-slate-400 block">
                  EST. {company.established}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {company.tagline}
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
              {["Civil Engineering", "Agriculture", "Industrial", "Custom Projects"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/catalog"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-white mb-6">
              PARTNERS
            </h3>
            <ul className="space-y-3">
              {partners.slice(0, 5).map((partner) => (
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
                { name: "Sustainability", href: "/about#sustainability" },
                { name: "Careers", href: "/careers" },
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
