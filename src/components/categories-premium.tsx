"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Building2, Sprout, Factory, ArrowRight, Sparkles } from "lucide-react";
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
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-100">Industry Solutions</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">
              Engineered for Every
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Application
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
                    <div className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 group-hover:border-white/30 transition-all overflow-hidden">
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
