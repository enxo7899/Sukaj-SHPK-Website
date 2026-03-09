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
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(14,165,233,0.04),transparent_60%)]" />

      {/* Bottom fade into background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020617] to-transparent" />

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
