"use client";

import { memo } from "react";

interface CorrugatedPipeProps {
  width: number;
  height: number;
  color?: string;
  marking?: string;
  markingColor?: string;
}

/**
 * Industrial HDPE pipe — matte, restrained, B2B-grade.
 * Reads as one product line, not as a clip-art collection.
 */
export const CorrugatedPipe = memo(function CorrugatedPipe({
  width,
  height,
  color = "#243343",
  marking = "SUKAJ SH.P.K",
  markingColor = "rgba(226,232,240,0.55)",
}: CorrugatedPipeProps) {
  const ribSize = Math.max(4, Math.round(width / 38));
  const endCapW = Math.max(8, Math.round(height * 0.22));
  const fontSize = Math.max(7, Math.round(height * 0.15));

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Pipe body — matte HDPE with cylindrical shading */}
      <div
        className="absolute inset-0 rounded-[999px]"
        style={{
          background: `linear-gradient(180deg,
            color-mix(in srgb, ${color} 78%, #000) 0%,
            ${color} 22%,
            color-mix(in srgb, ${color} 80%, #475569) 50%,
            ${color} 78%,
            color-mix(in srgb, ${color} 78%, #000) 100%)`,
          boxShadow: `
            0 4px 14px rgba(0,0,0,0.55),
            0 10px 32px rgba(0,0,0,0.32),
            inset 0 -3px 9px rgba(0,0,0,0.5),
            inset 0 2px 4px rgba(255,255,255,0.04)
          `,
          border: "1px solid rgba(148,163,184,0.12)",
        }}
      >
        {/* Subtle lateral light sweep — soft cylinder read */}
        <div
          className="absolute inset-0 rounded-[999px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.06) 22%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.06) 78%, rgba(0,0,0,0.18) 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Corrugation ribs — finer, lower contrast */}
        <div
          className="absolute inset-y-[6%] inset-x-[1%] rounded-[999px] overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg,
              rgba(0,0,0,0.18) 0px,
              rgba(0,0,0,0.14) 1px,
              transparent 1px,
              transparent ${Math.max(2, ribSize - 2)}px,
              rgba(255,255,255,0.025) ${Math.max(2, ribSize - 2)}px,
              rgba(255,255,255,0.025) ${ribSize - 1}px,
              rgba(0,0,0,0.08) ${ribSize - 1}px,
              rgba(0,0,0,0.08) ${ribSize}px
            )`,
            backgroundSize: `${ribSize}px 100%`,
          }}
        />

        {/* Soft top highlight */}
        <div
          className="absolute left-[10%] right-[10%] top-[14%] h-[14%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
          }}
        />

        {/* Industrial marking — subtle printed text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-bold uppercase whitespace-nowrap font-mono"
            style={{
              fontSize: `${fontSize}px`,
              letterSpacing: `${Math.max(1, Math.round(width * 0.005))}px`,
              color: markingColor,
              textShadow: "0 1px 2px rgba(0,0,0,0.85)",
            }}
          >
            {marking}
          </span>
        </div>

        {/* Single thin cyan identification stripe — like real PE100 marking */}
        <div
          className="absolute left-[4%] right-[4%] rounded-full"
          style={{
            top: `${Math.round(height * 0.66)}px`,
            height: "1.5px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.32) 18%, rgba(34,211,238,0.42) 50%, rgba(34,211,238,0.32) 82%, transparent 100%)",
          }}
        />
      </div>

      {/* Left end cap — matte deep navy interior */}
      <div
        className="absolute left-0 top-[3%] bottom-[3%] z-[2] overflow-hidden"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(-22%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg,
              #060a13 0%, #0e1422 30%, #131b2c 50%, #0e1422 70%, #060a13 100%)`,
            border: "1px solid rgba(148,163,184,0.14)",
          }}
        />
        <div
          className="absolute rounded-[999px]"
          style={{
            top: "16%",
            bottom: "16%",
            left: "16%",
            right: "10%",
            background: `linear-gradient(180deg,
              #050a14 0%, #0a1220 35%, #0f1a2c 50%, #0a1220 65%, #050a14 100%)`,
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.7)",
          }}
        />
      </div>

      {/* Right end cap — matte deep navy interior */}
      <div
        className="absolute right-0 top-[3%] bottom-[3%] z-[2] overflow-hidden"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(22%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg,
              #060a13 0%, #0e1422 30%, #131b2c 50%, #0e1422 70%, #060a13 100%)`,
            border: "1px solid rgba(148,163,184,0.14)",
          }}
        />
        <div
          className="absolute rounded-[999px]"
          style={{
            top: "16%",
            bottom: "16%",
            left: "10%",
            right: "16%",
            background: `linear-gradient(180deg,
              #050a14 0%, #0a1220 35%, #0f1a2c 50%, #0a1220 65%, #050a14 100%)`,
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.7)",
          }}
        />
      </div>
    </div>
  );
});
