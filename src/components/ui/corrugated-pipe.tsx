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
  const ribSize = Math.max(4, Math.round(width / 38));
  const endCapW = Math.max(4, Math.round(height * 0.08));
  const fontSize = Math.max(6, Math.round(height * 0.15));

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
            0 3px 12px rgba(0,0,0,0.6),
            0 8px 28px rgba(0,0,0,0.3),
            inset 0 -4px 10px rgba(0,0,0,0.6),
            inset 0 2px 4px rgba(255,255,255,0.04)
          `,
          border: "1px solid rgba(100,116,139,0.08)",
        }}
      >
        {/* Corrugation ribs — subtle dark grooves */}
        <div
          className="absolute inset-y-[6%] inset-x-[1%] rounded-[999px] overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg,
              rgba(0,0,0,0.18) 0px,
              rgba(0,0,0,0.18) 1px,
              transparent 1px,
              transparent ${ribSize - 1}px,
              rgba(255,255,255,0.025) ${ribSize - 1}px,
              rgba(255,255,255,0.025) ${ribSize}px
            )`,
            backgroundSize: `${ribSize}px 100%`,
          }}
        />

        {/* Subtle top highlight — matte plastic sheen */}
        <div
          className="absolute left-[8%] right-[8%] top-[14%] h-[18%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 20%, rgba(255,255,255,0.06) 50%, transparent 100%)",
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
              color: "rgba(255,255,255,0.35)",
              textShadow: "0 1px 2px rgba(0,0,0,0.8)",
            }}
          >
            {marking}
          </span>
        </div>

        {/* Thin colored marking stripe — subtle like real pipe markings */}
        <div
          className="absolute left-[4%] right-[4%] rounded-full"
          style={{
            top: `${Math.round(height * 0.66)}px`,
            height: "1.5px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.15) 15%, rgba(56,189,248,0.25) 50%, rgba(56,189,248,0.15) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* Left end — subtle flush ring, same material color */}
      <div
        className="absolute left-0 top-[3%] bottom-[3%] z-[2]"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(-20%)",
          background: `linear-gradient(180deg,
            rgba(15,23,42,0.95) 0%,
            rgba(30,41,59,0.9) 35%,
            rgba(51,65,85,0.85) 50%,
            rgba(30,41,59,0.9) 65%,
            rgba(15,23,42,0.95) 100%)`,
          boxShadow: "inset 1px 0 2px rgba(0,0,0,0.6)",
          border: "1px solid rgba(100,116,139,0.12)",
        }}
      />

      {/* Right end — subtle flush ring */}
      <div
        className="absolute right-0 top-[3%] bottom-[3%] z-[2]"
        style={{
          width: `${endCapW}px`,
          borderRadius: "999px",
          transform: "translateX(20%)",
          background: `linear-gradient(180deg,
            rgba(15,23,42,0.95) 0%,
            rgba(30,41,59,0.9) 35%,
            rgba(51,65,85,0.85) 50%,
            rgba(30,41,59,0.9) 65%,
            rgba(15,23,42,0.95) 100%)`,
          boxShadow: "inset -1px 0 2px rgba(0,0,0,0.6)",
          border: "1px solid rgba(100,116,139,0.12)",
        }}
      />
    </div>
  );
});
