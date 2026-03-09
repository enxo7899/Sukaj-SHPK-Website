"use client";

export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Single soft ambient glow — CSS only, no JS animation */}
      <div
        className="absolute rounded-full"
        style={{
          width: "800px",
          height: "800px",
          top: "-18%",
          left: "-8%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.06) 0%, rgba(8,145,178,0.03) 40%, transparent 70%)",
          filter: "blur(60px)",
          animation: "bgDrift1 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "500px",
          top: "8%",
          right: "-12%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.05) 0%, rgba(8,145,178,0.025) 45%, transparent 70%)",
          filter: "blur(60px)",
          animation: "bgDrift2 38s ease-in-out infinite",
        }}
      />

      {/* Static dot grid — no animation, just CSS pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 42%, black 20%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 42%, black 20%, transparent 100%)",
        }}
      />

      {/* Two subtle light streaks — pure CSS animation */}
      <div
        className="absolute h-px"
        style={{
          width: "240px",
          top: "28%",
          left: "-240px",
          background:
            "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)",
          animation: "streak 12s linear infinite",
        }}
      />
      <div
        className="absolute h-px"
        style={{
          width: "180px",
          top: "62%",
          left: "-180px",
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent)",
          animation: "streak 16s linear infinite 4s",
        }}
      />

      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes bgDrift1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(40px, -25px); }
          66% { transform: translate(-25px, 20px); }
        }
        @keyframes bgDrift2 {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(-35px, 30px); }
          70% { transform: translate(25px, -20px); }
        }
        @keyframes streak {
          from { transform: translateX(0); }
          to { transform: translateX(calc(100vw + 300px)); }
        }
      `}</style>
    </div>
  );
}
