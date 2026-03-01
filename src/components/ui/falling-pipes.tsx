"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Pipe {
  id: number;
  x: number;
  rotation: number;
  delay: number;
  duration: number;
  size: "sm" | "md" | "lg";
  color: string;
}

export function FallingPipes() {
  const pipes = useMemo<Pipe[]>(() => {
    const colors = [
      "rgba(34,211,238,0.8)",   // cyan
      "rgba(14,165,233,0.8)",   // blue
      "rgba(8,145,178,0.8)",    // teal
    ];
    
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (i % 4) * 25 + 10,
      rotation: Math.random() * 360,
      delay: i * 0.8,
      duration: 15 + Math.random() * 5,
      size: ["sm", "md", "lg"][Math.floor(Math.random() * 3)] as "sm" | "md" | "lg",
      color: colors[i % colors.length],
    }));
  }, []);

  const sizeMap = {
    sm: { width: 40, height: 200 },
    md: { width: 50, height: 280 },
    lg: { width: 60, height: 350 },
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Perspective container */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        {pipes.map((pipe) => {
          const { width, height } = sizeMap[pipe.size];
          
          return (
            <motion.div
              key={pipe.id}
              className="absolute"
              style={{
                left: `${pipe.x}%`,
                top: "-400px",
                width: `${width}px`,
                height: `${height}px`,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: ["0vh", "120vh"],
                rotateX: [pipe.rotation, pipe.rotation + 180],
                rotateY: [0, 360],
              }}
              transition={{
                duration: pipe.duration,
                repeat: Infinity,
                ease: "linear",
                delay: pipe.delay,
              }}
            >
              {/* Pipe body - cylindrical appearance */}
              <div
                className="relative w-full h-full rounded-lg"
                style={{
                  background: `linear-gradient(90deg, 
                    ${pipe.color.replace("0.8", "0.3")} 0%, 
                    ${pipe.color} 50%, 
                    ${pipe.color.replace("0.8", "0.3")} 100%)`,
                  boxShadow: `
                    inset -4px 0 8px rgba(0,0,0,0.3),
                    inset 4px 0 8px rgba(255,255,255,0.1),
                    0 10px 30px rgba(0,0,0,0.3)
                  `,
                  border: `1px solid ${pipe.color.replace("0.8", "0.4")}`,
                }}
              >
                {/* Pipe rings/grooves */}
                {[...Array(Math.floor(height / 60))].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-0 h-1"
                    style={{
                      top: `${i * 60 + 30}px`,
                      background: `linear-gradient(90deg, 
                        rgba(0,0,0,0.2) 0%, 
                        rgba(255,255,255,0.1) 50%, 
                        rgba(0,0,0,0.2) 100%)`,
                    }}
                  />
                ))}
                
                {/* Highlight */}
                <div
                  className="absolute top-0 left-1/4 w-1/4 h-full rounded-lg"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Glow effect overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,211,238,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
