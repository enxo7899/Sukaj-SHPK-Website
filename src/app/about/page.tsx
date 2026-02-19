"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/timeline";
import { Stats } from "@/components/stats";
import { company, partners } from "@/lib/data";
import { MapPin, Award, Users, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="absolute inset-0 dot-matrix opacity-30" />
        
        <div className="site-shell relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              {company.tagline}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Since {company.established}, Sukaj SHPK has been the cornerstone of infrastructure development 
              in the Balkans. We don&apos;t just distribute products — we engineer solutions that connect 
              communities and build the foundations of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      <Stats />

      <section className="relative py-24">
        <div className="site-shell">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                The Premier Balkan Infrastructure Distributor
              </h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  Headquartered in Shkoder, Albania, we serve as the exclusive distribution partner 
                  for leading European manufacturers across the Balkans and beyond.
                </p>
                <p>
                  Our portfolio spans civil engineering, agricultural systems, and industrial 
                  applications — delivering precision-engineered solutions for projects of any scale.
                </p>
                <p>
                  With a capital base of {company.capital} and partnerships spanning Italy, Kosovo, North Macedonia, 
                  Serbia, Greece, Turkey, and Albania, we bring three decades of expertise to every project.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: MapPin, title: "Strategic Location", desc: "Gateway to Balkan markets" },
                { icon: Award, title: "30+ Years", desc: "Industry expertise" },
                { icon: Users, title: "12 Partners", desc: "Across 7 countries" },
                { icon: Leaf, title: "Sustainability", desc: "Eco-conscious solutions" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <Icon className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <div id="timeline">
        <Timeline />
      </div>

      <section id="sustainability" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
        
        <div className="site-shell relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-mono text-green-400 tracking-wider mb-6">
              SUSTAINABILITY
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              BUILDING RESPONSIBLY.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Recycled Materials",
                desc: "Our PLASTIKA partnership processes post-consumer waste into granulates and agricultural films.",
                stat: "100%",
                label: "RECYCLED CONTENT"
              },
              {
                title: "Long Lifespan",
                desc: "Products engineered for 100+ years of service, reducing replacement cycles.",
                stat: "100+",
                label: "YEARS LIFESPAN"
              },
              {
                title: "Regional Sourcing",
                desc: "Local Albanian and Balkan manufacturers reduce transport distances and emissions.",
                stat: "7",
                label: "COUNTRIES"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-4xl font-black text-green-400 mb-2">
                  {item.stat}
                </div>
                <div className="text-xs font-mono text-slate-500 mb-4">
                  {item.label}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
