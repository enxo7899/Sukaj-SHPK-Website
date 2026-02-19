"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2, Sprout, Factory, Users, Phone, Handshake } from "lucide-react";

const navItems = [
  { name: "CIVIL", href: "/catalog?category=civil", icon: Building2 },
  { name: "AGRI", href: "/catalog?category=agri", icon: Sprout },
  { name: "INDUSTRIAL", href: "/catalog?category=industrial", icon: Factory },
  { name: "PARTNERS", href: "/partners", icon: Handshake },
  { name: "ABOUT", href: "/about", icon: Users },
  { name: "CONTACT", href: "/contact", icon: Phone },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="site-shell">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400 via-slate-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 ring-1 ring-white/10">
                  <span className="text-white font-black text-lg drop-shadow-sm">S</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-400/50 to-cyan-500/50 blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black tracking-[0.15em] text-white">
                  SUKAJ
                </span>
                <span className="text-[10px] font-mono text-slate-400 block -mt-0.5 tracking-wider">
                  SHPK • INDUSTRIAL PLASTICS
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative px-4 py-2"
                >
                  <span className="relative z-10 text-sm font-medium tracking-wider text-slate-300 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100"
                    layoutId="nav-hover"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/catalog"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-slate-950 font-semibold text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 ring-1 ring-orange-400/20"
              >
                <span>EXPLORE CATALOG</span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
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
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
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
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-orange-500" />
                        <span className="text-lg font-medium tracking-wider">
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-lg rounded-xl transition-colors"
                >
                  EXPLORE CATALOG
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
