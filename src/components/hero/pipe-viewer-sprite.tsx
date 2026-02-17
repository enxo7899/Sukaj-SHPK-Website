"use client";

import { useEffect, useState } from "react";
import { pipeModel } from "@/lib/assets";
import { useMediaQuery } from "@/lib/use-media-query";

export function PipeViewerSprite() {
  const [frame, setFrame] = useState(0);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { frameWidth, frameHeight, frameCount, columns, rows, image } = pipeModel.sprite;

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setFrame((prev) => (prev + 1) % frameCount);
    }, 110);

    return () => window.clearInterval(timer);
  }, [frameCount, reduceMotion]);

  const x = (frame % columns) * frameWidth;
  const y = Math.floor(frame / columns) * frameHeight;

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_18%,rgba(249,115,22,0.12),transparent_45%)]">
      <div className="pointer-events-none absolute inset-x-8 bottom-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="relative rounded-[1.75rem] border border-white/12 bg-slate-900/45 p-3 shadow-[0_20px_50px_rgba(2,6,23,0.55)]">
        <div
          aria-label="Pipe sprite viewer"
          role="img"
          className="h-[250px] w-[250px] max-h-full max-w-full rounded-xl sm:h-[300px] sm:w-[300px]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `-${x}px -${y}px`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${frameWidth * columns}px ${frameHeight * rows}px`,
            imageRendering: "auto",
          }}
        />
      </div>
    </div>
  );
}
