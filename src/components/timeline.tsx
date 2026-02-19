"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/lib/data";
import { Milestone, TrendingUp, Handshake, Factory, LucideIcon } from "lucide-react";

const milestoneIcons: Record<string, LucideIcon> = {
  company_founded: Milestone,
  capital_growth: TrendingUp,
  partnerships: Handshake,
  network_growth: Factory,
};

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pipeHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider mb-6">
            OUR JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            THREE DECADES.
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            From a trading company in Shkoder to a vertically integrated infrastructure leader.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              style={{ height: pipeHeight }}
              className="w-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500 rounded-full"
            />
          </div>

          <div className="space-y-24">
            {timeline.map((item, index) => {
              const Icon = milestoneIcons[item.milestone] || Milestone;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative flex items-center gap-8 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`inline-block p-6 rounded-2xl bg-white/5 border border-white/10 ${
                        item.highlight
                          ? "border-orange-500/30 bg-orange-500/5"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span
                          className={`text-3xl font-black ${
                            item.highlight ? "text-orange-500" : "text-white"
                          }`}
                        >
                          {item.year}
                        </span>
                        {item.highlight && (
                          <span className="px-2 py-1 text-[10px] font-mono rounded bg-orange-500/20 text-orange-400">
                            MILESTONE
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="relative z-10 w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center shrink-0">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        item.highlight
                          ? "bg-gradient-to-br from-orange-500 to-orange-600"
                          : "bg-gradient-to-br from-cyan-500 to-cyan-600"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          item.highlight ? "text-slate-950" : "text-slate-950"
                        }`}
                      />
                    </motion.div>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 mt-24 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-white/10">
              <span className="text-5xl font-black text-gradient">
                {new Date().getFullYear()}
              </span>
              <div className="text-left">
                <span className="block text-sm font-bold text-white">
                  THE FUTURE
                </span>
                <span className="block text-xs text-slate-400 font-mono">
                  BUILDING INFRASTRUCTURE OF TOMORROW
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
