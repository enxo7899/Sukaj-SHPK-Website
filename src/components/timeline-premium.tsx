"use client";

import { motion } from "framer-motion";
import { Calendar, Award, TrendingUp, Globe, Sparkles } from "lucide-react";
import { timeline } from "@/lib/data";

const milestoneIcons = [Calendar, Award, TrendingUp, Globe];

export function TimelinePremium() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="site-shell relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-100">Our Journey</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white">
              Three Decades of
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Excellence
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-transparent hidden lg:block" />

            {timeline.map((milestone, index) => {
              const Icon = milestoneIcons[index % milestoneIcons.length];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-8 sm:mb-12 lg:mb-20 ${
                    isEven ? "lg:pr-[52%]" : "lg:pl-[52%]"
                  }`}
                >
                  {/* Timeline dot — desktop only */}
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 hidden lg:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md opacity-40" />
                      <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-slate-950" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="group relative">
                    <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-5 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-500/25 transition-all">
                      {/* Year + icon row */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
