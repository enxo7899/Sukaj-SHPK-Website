"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CorrugatedPipe } from "@/components/ui/corrugated-pipe";
import { useMatterPhysics, type PipeRef } from "@/hooks/use-matter-physics";
import { createPipeConfigs, type PipeConfig } from "@/lib/physics-config";

export function FallingPipes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pipeRefs = useRef<PipeRef[]>([]);
  const reduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const configs = useMemo(
    () => createPipeConfigs({ isMobile, containerWidth: isMobile ? 380 : 640 }),
    [isMobile],
  );

  const setPipeRef = useCallback(
    (index: number, config: PipeConfig) => (el: HTMLDivElement | null) => {
      pipeRefs.current[index] = { el, config };
    },
    [],
  );

  useMatterPhysics({
    containerRef,
    pipeRefs,
    wrapperRef,
    pipeCount: configs.length,
    enabled: true,
    reduceMotion: Boolean(reduceMotion),
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[360px] w-full overflow-hidden sm:h-[420px] lg:h-[500px] xl:h-[540px]"
      aria-hidden="true"
    >
      {/* Stage spotlight from above — dramatic top-down lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% -5%, rgba(148,163,184,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Warm accent glow where pipes accumulate */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 85%, rgba(14,165,233,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Ground reflection — subtle lit surface */}
      <div
        className="pointer-events-none absolute inset-x-[8%] rounded-full"
        style={{
          bottom: "18px",
          height: "24px",
          background: "radial-gradient(ellipse at center, rgba(148,163,184,0.06) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Bottom fade into background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#020617] to-transparent" />

      {/* Pipes wrapper — faded in/out by the physics loop */}
      <div ref={wrapperRef} style={{ opacity: 1 }}>
        {configs.map((config, index) => (
          <div
            key={config.id}
            ref={setPipeRef(index, config)}
            className="pointer-events-none absolute left-0 top-0 will-change-transform"
            style={{
              opacity: 0,
              transformOrigin: "50% 50%",
            }}
          >
            <CorrugatedPipe
              width={config.width}
              height={config.height}
              color={config.color}
              marking={config.marking}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
