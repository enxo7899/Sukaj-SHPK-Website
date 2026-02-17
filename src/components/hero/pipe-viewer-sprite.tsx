"use client";

import { useEffect, useState } from "react";
import { pipeModel } from "@/lib/assets";

export function PipeViewerSprite() {
  const [frame, setFrame] = useState(0);
  const { frameWidth, frameHeight, frameCount, columns, rows, image } = pipeModel.sprite;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrame((prev) => (prev + 1) % frameCount);
    }, 90);

    return () => window.clearInterval(timer);
  }, [frameCount]);

  const x = (frame % columns) * frameWidth;
  const y = Math.floor(frame / columns) * frameHeight;

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.12),transparent_45%)]">
      <div
        aria-label="Pipe sprite viewer"
        role="img"
        className="h-[280px] w-[280px] max-h-full max-w-full rounded-2xl sm:h-[320px] sm:w-[320px]"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: `-${x}px -${y}px`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${frameWidth * columns}px ${frameHeight * rows}px`,
          imageRendering: "auto",
        }}
      />
    </div>
  );
}
