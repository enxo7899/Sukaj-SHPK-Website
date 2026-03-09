"use client";

import { memo } from "react";

interface CorrugatedPipeProps {
  width: number;
  height: number;
  color?: string;
  marking?: string;
}

export const CorrugatedPipe = memo(function CorrugatedPipe({
  width,
  height,
  color = "#0f172a",
  marking = "SUKAJ SH.P.K",
}: CorrugatedPipeProps) {
  const ribSize = Math.max(4, Math.round(width / 34));
  const endCapW = Math.max(6, Math.round(height * 0.18));
  const fontSize = Math.max(6, Math.round(height * 0.14));

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Pipe body — dark matte HDPE plastic */}
      <div
        className="absolute inset-0 rounded-[999px]"
        style={{
          background: `linear-gradient(180deg, 
            ${color} 0%,
            color-mix(in srgb, ${color} 82%, #1e293b) 15%,
            color-mix(in srgb, ${color} 65%, #334155) 35%,
            color-mix(in srgb, ${color} 55%, #475569) 47%,
            color-mix(in srgb, ${color} 65%, #334155) 55%,
            color-mix(in srgb, ${color} 82%, #1e293b) 75%,
            color-mix(in srgb, ${color} 92%, #000) 100%)`,
          boxShadow: `
            0 4px 16px rgba(0,0,0,0.7),
            0 12px 40px rgba(0,0,0,0.35),
            0 0 60px rgba(14,165,233,0.03),
            inset 0 -5px 12px rgba(0,0,0,0.6),
            inset 0 3px 6px rgba(255,255,255,0.05)
          `,
          border: "1px solid rgba(100,116,139,0.1)",
        }}
      >
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

        {/* Subtle top highlight — matte plastic sheen */}
        <div
          className="absolute left-[8%] right-[8%] top-[14%] h-[18%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.08) 50%, transparent 100%)",
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
              letterSpacing: `${Math.max(1, Math.round(width * 0.008))}px`,
              color: "rgba(255,255,255,0.45)",
              textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(255,255,255,0.05)",
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

      {/* Left end — dark outer ring with blue interior (like real HDPE pipe cross-section) */}
      <div
        className="absolute left-0 top-[2%] bottom-[2%] z-[2] overflow-hidden"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(-25%)",
        }}
      >
        {/* Outer dark ring (pipe wall) */}
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg,
              #0a0f1a 0%, #141c2b 25%, #1e293b 50%, #141c2b 75%, #0a0f1a 100%)`,
            border: "1px solid rgba(100,116,139,0.15)",
          }}
        />
        {/* Blue interior lining — visible through the opening */}
        <div
          className="absolute rounded-[999px]"
          style={{
            top: "18%",
            bottom: "18%",
            left: "15%",
            right: "10%",
            background: `linear-gradient(180deg,
              #1e40af 0%, #2563eb 25%, #3b82f6 45%, #60a5fa 50%, #3b82f6 55%, #2563eb 75%, #1e40af 100%)`,
            boxShadow: "inset 0 0 3px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* Right end — dark outer ring with blue interior */}
      <div
        className="absolute right-0 top-[2%] bottom-[2%] z-[2] overflow-hidden"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(25%)",
        }}
      >
        {/* Outer dark ring (pipe wall) */}
        <div
          className="absolute inset-0 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg,
              #0a0f1a 0%, #141c2b 25%, #1e293b 50%, #141c2b 75%, #0a0f1a 100%)`,
            border: "1px solid rgba(100,116,139,0.15)",
          }}
        />
        {/* Blue interior lining */}
        <div
          className="absolute rounded-[999px]"
          style={{
            top: "18%",
            bottom: "18%",
            left: "10%",
            right: "15%",
            background: `linear-gradient(180deg,
              #1e40af 0%, #2563eb 25%, #3b82f6 45%, #60a5fa 50%, #3b82f6 55%, #2563eb 75%, #1e40af 100%)`,
            boxShadow: "inset 0 0 3px rgba(0,0,0,0.4)",
          }}
        />
      </div>
    </div>
  );
});
