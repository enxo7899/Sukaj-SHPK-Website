"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Building2, Sprout, Factory, ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Sprout,
  Factory,
};

export function CategoriesPremium() {
  const reduceMotion = useReducedMotion();

  const categoryData = [
    {
      ...categories[0],
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      glowColor: "rgba(6,182,212,0.4)",
      iconBg: "from-cyan-400 to-blue-500",
    },
    {
      ...categories[1],
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      glowColor: "rgba(34,197,94,0.4)",
      iconBg: "from-green-400 to-emerald-500",
    },
    {
      ...categories[2],
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      glowColor: "rgba(99,102,241,0.4)",
      iconBg: "from-blue-400 to-indigo-500",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#020617]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="site-shell relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-cyan-500/60" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/80 uppercase">
              Industry Solutions
            </span>
            <div className="h-px w-8 bg-cyan-500/60" />
          </div>
          
          <h2
            className="font-black text-white leading-[1.05] tracking-tight mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Engineered for Every
            <br />
            <span
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #0891b2 60%)",
              }}
            >
              Application.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From municipal sewage systems to agricultural irrigation — precision solutions for every sector.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {categoryData.map((category, index) => {
            const Icon = iconMap[category.icon] || Building2;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={`/catalog?category=${category.id}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative h-full"
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${category.glowColor}, transparent)`,
                      }}
                    />

                    {/* Card */}
                    <div className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.07] group-hover:border-white/[0.15] group-hover:bg-white/[0.05] transition-all overflow-hidden">
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${category.glowColor}, transparent)`,
                        }}
                      />

                      {/* Top accent line */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.iconBg} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                          {category.description}
                        </p>

                        {/* Product badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.products.slice(0, 3).map((product) => (
                            <span
                              key={product}
                              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                            >
                              {product}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                          <span>Explore Solutions</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
