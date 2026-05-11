"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function CTA() {
  const { t } = useTranslation();
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(8,145,178,0.08),transparent)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              {t("cta.eyebrow")}
            </span>
            <div className="h-px w-8 bg-cyan-500/60" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            {t("cta.title")}
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-cyan-500 hover:shadow-xl hover:shadow-cyan-500/25 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {t("cta.button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/catalog"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all font-medium text-slate-300 hover:text-white"
            >
              <span>{t("hero.ctaCatalog")}</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <a
              href="tel:+355123456789"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-500" />
              +355 123 456 789
            </a>
            <a
              href="mailto:projects@sukaj.al"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-500" />
              projects@sukaj.al
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
