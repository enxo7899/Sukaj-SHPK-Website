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
      className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/[0.06] sm:h-[420px] lg:h-[500px] xl:h-[540px]"
      style={{
        boxShadow:
          "inset 0 0 20px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.4)",
      }}
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

      {/* Ground accumulation shadow — darker pool where pipes rest */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%]"
        style={{
          background:
            "radial-gradient(ellipse 65% 100% at 50% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 80%)",
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
              markingColor={config.markingColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
