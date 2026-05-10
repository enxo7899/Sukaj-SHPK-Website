"use client";

import { memo } from "react";

interface CorrugatedPipeProps {
  width: number;
  height: number;
  color?: string;
  marking?: string;
  markingColor?: string;
}

export const CorrugatedPipe = memo(function CorrugatedPipe({
  width,
  height,
  color = "#243343",
  marking = "SUKAJ SH.P.K",
  markingColor = "rgba(255,255,255,0.65)",
}: CorrugatedPipeProps) {
  const ribSize = Math.max(4, Math.round(width / 34));
  // End caps enlarged ~1.5× for vivid blue interior visibility.
  const endCapW = Math.max(9, Math.round(height * 0.27));
  const fontSize = Math.max(7, Math.round(height * 0.16));

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Pipe body — dark matte HDPE plastic with vertical shading */}
      <div
        className="absolute inset-0 rounded-[999px]"
        style={{
          background: `linear-gradient(180deg, 
            color-mix(in srgb, ${color} 88%, #000) 0%,
            ${color} 18%,
            color-mix(in srgb, ${color} 70%, #475569) 38%,
            color-mix(in srgb, ${color} 58%, #64748b) 50%,
            color-mix(in srgb, ${color} 70%, #475569) 62%,
            ${color} 82%,
            color-mix(in srgb, ${color} 88%, #000) 100%)`,
          boxShadow: `
            0 4px 16px rgba(0,0,0,0.7),
            0 12px 40px rgba(0,0,0,0.4),
            0 0 40px rgba(6,182,212,0.12),
            0 0 80px rgba(6,182,212,0.06),
            inset 0 -5px 12px rgba(0,0,0,0.6),
            inset 0 3px 6px rgba(255,255,255,0.06)
          `,
          border: "1px solid rgba(148,163,184,0.16)",
        }}
      >
        {/* Lateral light sweep — left-to-right gradient gives 3D cylinder feel */}
        <div
          className="absolute inset-0 rounded-[999px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 18%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 65%, rgba(0,0,0,0.18) 100%)",
            mixBlendMode: "overlay",
          }}
        />
        {/* Corrugation ribs — pronounced grooves like real corrugated pipe */}
        <div
          className="absolute inset-y-[5%] inset-x-[1%] rounded-[999px] overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg,
              rgba(0,0,0,0.28) 0px,
              rgba(0,0,0,0.22) 1px,
              transparent 1px,
              transparent ${Math.max(2, ribSize - 2)}px,
              rgba(255,255,255,0.04) ${Math.max(2, ribSize - 2)}px,
              rgba(255,255,255,0.04) ${ribSize - 1}px,
              rgba(0,0,0,0.12) ${ribSize - 1}px,
              rgba(0,0,0,0.12) ${ribSize}px
            )`,
            backgroundSize: `${ribSize}px 100%`,
          }}
        />

        {/* Top highlight — stronger lit edge for cylindrical read */}
        <div
          className="absolute left-[8%] right-[8%] top-[12%] h-[20%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 25%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.1) 75%, transparent 100%)",
          }}
        />

        {/* Very thin edge catch light */}
        <div
          className="absolute left-[12%] right-[12%] top-[8%] h-[2%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.03) 70%, transparent 90%)",
          }}
        />

        {/* Bottom ambient shadow */}
        <div
          className="absolute bottom-[6%] left-[6%] right-[6%] h-[16%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.25) 75%, transparent 100%)",
          }}
        />

        {/* Industrial marking — white printed text like real pipes */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-bold uppercase whitespace-nowrap"
            style={{
              fontSize: `${fontSize}px`,
              letterSpacing: `${Math.max(1, Math.round(width * 0.006))}px`,
              color: markingColor,
              textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.6)",
            }}
          >
            {marking}
          </span>
        </div>

        {/* Orange marking stripe — like real HDPE pipes */}
        <div
          className="absolute left-[3%] right-[3%] rounded-full"
          style={{
            top: `${Math.round(height * 0.62)}px`,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(234,88,12,0.4) 10%, rgba(249,115,22,0.6) 50%, rgba(234,88,12,0.4) 90%, transparent 100%)",
          }}
        />
        {/* Second thin orange stripe */}
        <div
          className="absolute left-[3%] right-[3%] rounded-full"
          style={{
            top: `${Math.round(height * 0.67)}px`,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(234,88,12,0.25) 15%, rgba(249,115,22,0.35) 50%, rgba(234,88,12,0.25) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* Left end — dark outer ring with vivid blue interior (HDPE cross-section) */}
      <div
        className="absolute left-0 top-[2%] bottom-[2%] z-[2] overflow-hidden"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(-25%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg,
              #0a0f1a 0%, #141c2b 25%, #1e293b 50%, #141c2b 75%, #0a0f1a 100%)`,
            border: "1px solid rgba(148,163,184,0.18)",
          }}
        />
        <div
          className="absolute rounded-[999px]"
          style={{
            top: "14%",
            bottom: "14%",
            left: "14%",
            right: "8%",
            background: `linear-gradient(180deg,
              #1d4ed8 0%, #2563eb 25%, #3b82f6 45%, #60a5fa 55%, #3b82f6 70%, #2563eb 85%, #1d4ed8 100%)`,
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.45), 0 0 6px rgba(37,99,235,0.35)",
          }}
        />
      </div>

      {/* Right end — dark outer ring with vivid blue interior */}
      <div
        className="absolute right-0 top-[2%] bottom-[2%] z-[2] overflow-hidden"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(25%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg,
              #0a0f1a 0%, #141c2b 25%, #1e293b 50%, #141c2b 75%, #0a0f1a 100%)`,
            border: "1px solid rgba(148,163,184,0.18)",
          }}
        />
        <div
          className="absolute rounded-[999px]"
          style={{
            top: "14%",
            bottom: "14%",
            left: "8%",
            right: "14%",
            background: `linear-gradient(180deg,
              #1d4ed8 0%, #2563eb 25%, #3b82f6 45%, #60a5fa 55%, #3b82f6 70%, #2563eb 85%, #1d4ed8 100%)`,
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.45), 0 0 6px rgba(37,99,235,0.35)",
          }}
        />
      </div>
    </div>
  );
});
