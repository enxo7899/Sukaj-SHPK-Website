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
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // On mobile (<1024) the pipes column stacks below the fold — skip physics
  // entirely and reuse the static stack layout. Same for reduced-motion users.
  const useStatic = isMobile || Boolean(reduceMotion);

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
    reduceMotion: useStatic,
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[360px] w-full overflow-hidden rounded-2xl sm:h-[420px] lg:h-[500px] xl:h-[540px]"
      style={{ border: "1px solid var(--site-border)" }}
      aria-hidden="true"
    >
      {/* Single soft top spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(148,163,184,0.05) 0%, transparent 75%)",
        }}
      />

      {/* Single ground shadow pool — adapts to theme */}
      <div className="theme-section-ground-shadow pointer-events-none absolute inset-x-0 bottom-0 h-[20%]" />

      {/* Bottom fade into background */}
      <div className="theme-pipes-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-12" />

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
              markingColor={config.markingColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
