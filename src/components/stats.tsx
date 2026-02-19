"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { company } from "@/lib/data";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { label: "YEARS OF EXCELLENCE", value: company.stats.yearsExperience, suffix: "+" },
  { label: "COUNTRIES SERVED", value: company.stats.countriesServed, suffix: "" },
  { label: "PROJECTS COMPLETED", value: company.stats.projectsCompleted, suffix: "+" },
  { label: "EUROPEAN PARTNERS", value: company.stats.partnersCount, suffix: "+" },
];

const statColors = ["#f97316", "#22d3ee", "#22c55e", "#a855f7"];

export function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-cyan-500/5" />
      <div className="absolute inset-0 dot-matrix opacity-20" />
      <div className="absolute inset-0 noise" />
      
      <div className="site-shell relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="relative text-center group"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${statColors[index]}15, transparent 70%)`,
                }}
              />
              <div className="relative p-6">
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-black mb-2"
                  style={{ color: statColors[index] }}
                >
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-mono text-slate-400 tracking-[0.2em]">
                  {stat.label}
                </div>
                <div
                  className="mt-4 mx-auto h-0.5 w-12 rounded-full opacity-50"
                  style={{ backgroundColor: statColors[index] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
