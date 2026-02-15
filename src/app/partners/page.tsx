"use client";

import { motion } from "framer-motion";
import { partners } from "@/lib/data";
import { MapPin, ArrowUpRight, Package } from "lucide-react";
import Link from "next/link";

export default function PartnersPage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
            OUR PARTNERS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            EUROPEAN EXCELLENCE.
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Strategic partnerships with industry-leading manufacturers from across Europe.
          </p>
        </motion.div>

        <div className="space-y-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              id={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: partner.color }}
              />
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black text-slate-950"
                      style={{ backgroundColor: partner.color }}
                    >
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{partner.name}</h2>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {partner.country}
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-lg font-medium mb-3"
                    style={{ color: partner.color }}
                  >
                    {partner.tagline}
                  </p>

                  <p className="text-slate-400 mb-6">
                    {partner.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {partner.products.map((product) => (
                      <div
                        key={product.name}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                      >
                        <Package className="w-4 h-4 text-slate-500" />
                        <div>
                          <span className="text-sm font-medium text-white block">
                            {product.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {product.type} • {product.diameters}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <span className="text-xs font-mono text-slate-500 block mb-1">
                        SPECIALTY
                      </span>
                      <span className="text-sm text-white">{partner.specialty}</span>
                    </div>
                    
                    {partner.maxDiameter && (
                      <div className="p-4 rounded-xl bg-white/5">
                        <span className="text-xs font-mono text-slate-500 block mb-1">
                          MAX DIAMETER
                        </span>
                        <span className="text-2xl font-bold text-white">
                          Ø {partner.maxDiameter}
                        </span>
                      </div>
                    )}

                    {partner.factorySize && (
                      <div className="p-4 rounded-xl bg-white/5">
                        <span className="text-xs font-mono text-slate-500 block mb-1">
                          FACTORY SIZE
                        </span>
                        <span className="text-2xl font-bold text-white">
                          {partner.factorySize}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/catalog?partner=${partner.id}`}
                    className="mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium group"
                  >
                    View Products
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
