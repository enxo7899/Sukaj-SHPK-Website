import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  duration = 30,
  className = "",
  reverse = false,
  pauseOnHover = false,
}: MarqueeProps) {
  const animName = reverse ? "marquee-reverse" : "marquee";
  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{ maskImage: "none" }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div
        className="flex min-w-full shrink-0 gap-0"
        style={{
          animation: `${animName} ${duration}s linear infinite`,
          willChange: "transform",
        }}
        aria-hidden
      >
        {/* four copies so there's always content visible at any screen width */}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
