"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Pipe {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  duration: number;
  diameter: number;
  length: number;
}

export function FallingPipes() {
  const pipes = useMemo<Pipe[]>(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (i % 3) * 30 + 15,
      y: -100 - (i * 80),
      rotation: -15 + (i * 10),
      delay: i * 1.2,
      duration: 18 + (i % 3) * 2,
      diameter: 50 + (i % 3) * 15,
      length: 250 + (i % 2) * 100,
    }));
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className="absolute inset-0" style={{ perspective: "1200px" }}>
        {pipes.map((pipe) => {
          const ribCount = Math.floor(pipe.length / 8);
          
          return (
            <motion.div
              key={pipe.id}
              className="absolute"
              style={{
                left: `${pipe.x}%`,
                width: `${pipe.diameter}px`,
                height: `${pipe.length}px`,
                transformStyle: "preserve-3d",
              }}
              initial={{ y: pipe.y }}
              animate={{
                y: [pipe.y, 700],
                rotateZ: [pipe.rotation, pipe.rotation + 15, pipe.rotation],
              }}
              transition={{
                duration: pipe.duration,
                repeat: Infinity,
                ease: "linear",
                delay: pipe.delay,
              }}
            >
              {/* Corrugated HDPE Pipe */}
              <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Pipe body with corrugations */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, 
                      #1a1a1a 0%, 
                      #2d2d2d 45%, 
                      #404040 50%, 
                      #2d2d2d 55%, 
                      #1a1a1a 100%)`,
                    borderRadius: "4px",
                    boxShadow: `
                      inset -3px 0 6px rgba(0,0,0,0.6),
                      inset 3px 0 6px rgba(255,255,255,0.1),
                      0 8px 24px rgba(0,0,0,0.4)
                    `,
                  }}
                >
                  {/* Corrugated ribs */}
                  {[...Array(ribCount)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-x-0"
                      style={{
                        top: `${i * 8}px`,
                        height: "4px",
                        background: `linear-gradient(90deg, 
                          rgba(0,0,0,0.4) 0%, 
                          rgba(80,80,80,0.3) 50%, 
                          rgba(0,0,0,0.4) 100%)`,
                        borderTop: "1px solid rgba(0,0,0,0.3)",
                        borderBottom: "1px solid rgba(100,100,100,0.2)",
                      }}
                    />
                  ))}
                  
                  {/* Highlight streak */}
                  <div
                    className="absolute top-0 left-[30%] w-[15%] h-full"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
                      borderRadius: "2px",
                    }}
                  />
                </div>

                {/* Top end cap - blue interior visible */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: `${pipe.diameter * 0.3}px`,
                    background: `radial-gradient(ellipse at center, 
                      #3b82f6 0%, 
                      #2563eb 40%, 
                      #1e40af 70%, 
                      #1a1a1a 100%)`,
                    borderRadius: "50%",
                    transform: "translateY(-50%) rotateX(75deg)",
                    boxShadow: "inset 0 -2px 8px rgba(0,0,0,0.5)",
                  }}
                />

                {/* Bottom end cap - blue interior visible */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: `${pipe.diameter * 0.3}px`,
                    background: `radial-gradient(ellipse at center, 
                      #3b82f6 0%, 
                      #2563eb 40%, 
                      #1e40af 70%, 
                      #1a1a1a 100%)`,
                    borderRadius: "50%",
                    transform: "translateY(50%) rotateX(-75deg)",
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
