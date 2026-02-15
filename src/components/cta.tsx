"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-slate-950 to-cyan-500/10" />
      <div className="absolute inset-0 dot-matrix opacity-20" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-8">
            START YOUR PROJECT
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            READY TO BUILD?
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            From technical specifications to project consultations — our engineering team is ready to support your infrastructure needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/catalog"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all font-medium"
            >
              <span>EXPLORE CATALOG</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <a
              href="tel:+355123456789"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              +355 123 456 789
            </a>
            <a
              href="mailto:projects@sukaj.al"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-orange-500" />
              projects@sukaj.al
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
