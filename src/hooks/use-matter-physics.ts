"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";
import Matter from "matter-js";
import { createPipeConfigs, HERO_PIPE_WORLD, type PipeConfig } from "@/lib/physics-config";

const RAD_TO_DEG = 180 / Math.PI;

export interface PipeRef {
  el: HTMLDivElement | null;
  config: PipeConfig;
}

interface UseMatterPhysicsOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  pipeRefs: React.MutableRefObject<PipeRef[]>;
  wrapperRef: RefObject<HTMLDivElement | null>;
  pipeCount: number;
  enabled?: boolean;
  reduceMotion?: boolean;
}

function getContainerSize(container: HTMLDivElement) {
  return {
    width: Math.max(0, Math.round(container.clientWidth)),
    height: Math.max(0, Math.round(container.clientHeight)),
  };
}

export function useMatterPhysics({
  containerRef,
  pipeRefs,
  wrapperRef,
  pipeCount,
  enabled = true,
  reduceMotion = false,
}: UseMatterPhysicsOptions) {
  const loopCountRef = useRef(0);

  const createAndRunSimulation = useCallback(
    (container: HTMLDivElement, onSettled: () => void) => {
      const { width, height } = getContainerSize(container);
      if (width === 0 || height === 0) return () => {};

      const isMobile = width < 768;
      const configs = createPipeConfigs({ isMobile, containerWidth: width });
      const floorY = height - HERO_PIPE_WORLD.floorOffset;

      const { Engine, Bodies, Body, Composite } = Matter;
      const engine = Engine.create({ enableSleeping: true });
      engine.world.gravity.y = HERO_PIPE_WORLD.gravityY;
      engine.timing.timeScale = HERO_PIPE_WORLD.timeScale;

      const floor = Bodies.rectangle(
        width * 0.5,
        floorY + HERO_PIPE_WORLD.floorThickness * 0.5,
        width + HERO_PIPE_WORLD.wallThickness * 2,
        HERO_PIPE_WORLD.floorThickness,
        { isStatic: true, friction: 0.7, restitution: 0.15 },
      );
      const leftWall = Bodies.rectangle(
        -HERO_PIPE_WORLD.wallThickness * 0.5 + HERO_PIPE_WORLD.wallInset,
        height * 0.5,
        HERO_PIPE_WORLD.wallThickness,
        height * 2,
        { isStatic: true, restitution: 0.15 },
      );
      const rightWall = Bodies.rectangle(
        width + HERO_PIPE_WORLD.wallThickness * 0.5 - HERO_PIPE_WORLD.wallInset,
        height * 0.5,
        HERO_PIPE_WORLD.wallThickness,
        height * 2,
        { isStatic: true, restitution: 0.15 },
      );
      Composite.add(engine.world, [floor, leftWall, rightWall]);

      interface Entry {
        body: Matter.Body;
        config: PipeConfig;
        added: boolean;
        pipeRef: PipeRef | null;
      }

      const entries: Entry[] = configs.map((config, i) => {
        const body = Bodies.rectangle(
          width * 0.5 + config.initialX,
          config.initialY,
          config.width,
          config.height,
          {
            density: config.density,
            friction: config.friction,
            restitution: config.restitution,
            frictionAir: config.frictionAir,
            sleepThreshold: config.sleepThreshold,
            chamfer: { radius: Math.max(4, Math.round(config.height * 0.22)) },
          },
        );
        Body.setAngle(body, (config.initialRotationDeg * Math.PI) / 180);
        return { body, config, added: false, pipeRef: pipeRefs.current[i] ?? null };
      });

      const timeoutIds: number[] = [];
      entries.forEach((entry) => {
        const tid = window.setTimeout(() => {
          if (entry.added) return;
          entry.added = true;
          Composite.add(engine.world, entry.body);
          Body.setVelocity(entry.body, entry.config.initialVelocity);
          Body.setAngularVelocity(entry.body, entry.config.initialAngularVelocity);

          if (entry.pipeRef?.el) {
            entry.pipeRef.el.style.opacity = "1";
          }
        }, entry.config.dropDelayMs);
        timeoutIds.push(tid);
      });

      let rafId = 0;
      let disposed = false;
      let accumulator = 0;
      let prevTime = 0;
      let settleFrames = 0;
      let firstFrame = true;

      const FIXED_DT = HERO_PIPE_WORLD.fixedDt;
      const MAX_SUB = HERO_PIPE_WORLD.maxSubSteps;

      const tick = (timestamp: number) => {
        if (disposed) return;

        if (firstFrame) {
          prevTime = timestamp;
          firstFrame = false;
          rafId = requestAnimationFrame(tick);
          return;
        }

        let frameDelta = timestamp - prevTime;
        prevTime = timestamp;

        if (frameDelta > 100) frameDelta = FIXED_DT;

        accumulator += frameDelta;
        let steps = 0;

        while (accumulator >= FIXED_DT && steps < MAX_SUB) {
          Engine.update(engine, FIXED_DT);
          accumulator -= FIXED_DT;
          steps++;
        }

        if (steps > 0) {
          entries.forEach((entry) => {
            if (!entry.added || !entry.pipeRef?.el) return;

            const b = entry.body;
            const el = entry.pipeRef.el;
            const x = b.position.x - entry.config.width * 0.5;
            const y = b.position.y - entry.config.height * 0.5;
            const angle = b.angle * RAD_TO_DEG;

            el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${angle.toFixed(2)}deg)`;

            const clampedAV = Math.max(
              -HERO_PIPE_WORLD.maxAngularVelocity,
              Math.min(HERO_PIPE_WORLD.maxAngularVelocity, b.angularVelocity),
            );
            if (clampedAV !== b.angularVelocity) {
              Body.setAngularVelocity(b, clampedAV);
            }
          });
        }

        const allDropped = entries.every((e) => e.added);
        const allCalm = entries.every((e) => {
          if (!e.added) return false;
          const b = e.body;
          return (
            b.isSleeping ||
            (Math.abs(b.velocity.x) <= HERO_PIPE_WORLD.linearSleepThreshold &&
              Math.abs(b.velocity.y) <= HERO_PIPE_WORLD.linearSleepThreshold &&
              Math.abs(b.angularVelocity) <= HERO_PIPE_WORLD.angularSleepThreshold)
          );
        });

        if (allDropped && allCalm) {
          settleFrames++;
          if (settleFrames >= HERO_PIPE_WORLD.settleFramesRequired) {
            onSettled();
            return;
          }
        } else {
          settleFrames = 0;
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        timeoutIds.forEach((id) => clearTimeout(id));
        entries.forEach((e) => {
          if (e.added) Composite.remove(engine.world, e.body);
        });
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    },
    [pipeRefs],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    if (reduceMotion) {
      const { width, height } = getContainerSize(container);
      const isMobile = width < 768;
      const configs = createPipeConfigs({ isMobile, containerWidth: width });
      const floorY = height - HERO_PIPE_WORLD.floorOffset;

      configs.forEach((config, i) => {
        const ref = pipeRefs.current[i];
        if (!ref?.el) return;
        const cx = width * 0.5 + (i % 2 === 0 ? -40 : 40);
        const cy = floorY - config.height * 0.5 - i * 18;
        const x = cx - config.width * 0.5;
        const y = cy - config.height * 0.5;
        const angle = (i % 2 === 0 ? -1 : 1) * (3 + i * 2);
        ref.el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;
        ref.el.style.opacity = "1";
      });
      return;
    }

    let cleanup: (() => void) | null = null;
    let loopTimeout: number | null = null;
    let disposed = false;

    const startLoop = () => {
      if (disposed) return;

      loopCountRef.current++;

      pipeRefs.current.forEach((ref) => {
        if (ref.el) {
          ref.el.style.opacity = "0";
          ref.el.style.transition = "none";
        }
      });

      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "1";
        wrapperRef.current.style.transition = `opacity ${HERO_PIPE_WORLD.loopFadeMs}ms ease-in`;
      }

      cleanup = createAndRunSimulation(container, () => {
        if (disposed) return;

        loopTimeout = window.setTimeout(() => {
          if (disposed) return;

          if (wrapperRef.current) {
            wrapperRef.current.style.transition = `opacity ${HERO_PIPE_WORLD.loopFadeMs}ms ease-out`;
            wrapperRef.current.style.opacity = "0";
          }

          window.setTimeout(() => {
            if (disposed) return;
            if (cleanup) cleanup();
            cleanup = null;
            startLoop();
          }, HERO_PIPE_WORLD.loopFadeMs + 50);
        }, HERO_PIPE_WORLD.loopPauseMs);
      });
    };

    startLoop();

    const resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      if (cleanup) cleanup();
      cleanup = null;
      if (loopTimeout) clearTimeout(loopTimeout);
      startLoop();
    });
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      if (cleanup) cleanup();
      if (loopTimeout) clearTimeout(loopTimeout);
    };
  }, [containerRef, pipeRefs, wrapperRef, pipeCount, enabled, reduceMotion, createAndRunSimulation]);
}
