"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2, Sprout, Factory, Users, Phone, Handshake } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export function Navigation() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "civil", href: "/catalog?category=civil", icon: Building2 },
    { key: "agri", href: "/catalog?category=agri", icon: Sprout },
    { key: "industrial", href: "/catalog?category=industrial", icon: Factory },
    { key: "partners", href: "/partners", icon: Handshake },
    { key: "about", href: "/about", icon: Users },
    { key: "contact", href: "/contact", icon: Phone },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={isScrolled ? { background: "color-mix(in oklab, var(--site-bg) 82%, transparent)", borderBottom: "1px solid var(--site-border)" } : undefined}
      >
        <div className="site-shell">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-12 w-48 sm:w-56">
                <Image
                  src="/media/hero/logo.png"
                  alt="Sukaj SHPK"
                  fill
                  className="object-contain object-left transition-opacity group-hover:opacity-80"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group relative px-4 py-2"
                >
                  <span className="relative z-10 text-sm font-medium tracking-wider transition-colors" style={{ color: "var(--site-text-muted)" }}>
                    {t(`nav.${item.key}`)}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                    style={{ background: "var(--site-surface)" }}
                    layoutId="nav-hover"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <Link
                href="/catalog"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-700/30"
              >
                <span>{t("nav.exploreCatalog")}</span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors"
                style={{ background: "var(--site-surface)", color: "var(--site-text)" }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
              <div
                className="absolute inset-0 backdrop-blur-xl"
                style={{ background: "color-mix(in oklab, var(--site-bg) 92%, transparent)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            <motion.nav
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative pt-24 px-6 pb-8"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl transition-colors"
                        style={{ background: "var(--site-surface)", color: "var(--site-text)" }}
                      >
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-lg font-medium tracking-wider">
                          {t(`nav.${item.key}`)}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg rounded-xl transition-colors"
                >
                  {t("nav.exploreCatalog")}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
