"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Sprout, Factory, ArrowRight, LucideIcon } from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Building2: Building2,
  Sprout: Sprout,
  Factory: Factory,
};

export function Categories() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      <div className="absolute inset-0 grid-lines opacity-50" />
      
      <div className="site-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
            SOLUTIONS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            INDUSTRY APPLICATIONS.
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            From municipal sewage systems to agricultural irrigation — precision solutions for every sector.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Building2;
            const gradients = [
              "from-orange-500 to-orange-600",
              "from-green-500 to-green-600",
              "from-cyan-500 to-cyan-600",
            ];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/catalog?category=${category.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity" 
                      style={{
                        backgroundImage: `linear-gradient(to right, ${index === 0 ? '#f97316' : index === 1 ? '#22c55e' : '#22d3ee'}, ${index === 0 ? '#fb923c' : index === 1 ? '#4ade80' : '#67e8f9'})`
                      }}
                    />
                    
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-7 h-7 text-slate-950" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-6">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.products.slice(0, 3).map((product) => (
                        <span
                          key={product}
                          className="px-2 py-1 text-xs font-mono rounded bg-white/5 text-slate-500"
                        >
                          {product}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                      <span>Explore Solutions</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
