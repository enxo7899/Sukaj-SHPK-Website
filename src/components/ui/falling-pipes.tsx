"use client";

import { motion } from "framer-motion";

interface Pipe {
  id: number;
  width: number;
  finalY: number;
  finalRotation: number;
  delay: number;
}

const pipes: Pipe[] = [
  { id: 1, width: 280, finalY: 420, finalRotation: -8, delay: 0 },
  { id: 2, width: 320, finalY: 280, finalRotation: 5, delay: 0.15 },
  { id: 3, width: 260, finalY: 150, finalRotation: -3, delay: 0.3 },
  { id: 4, width: 300, finalY: 10, finalRotation: 7, delay: 0.45 },
];

function CorrugatedPipe({ width }: { width: number }) {
  const height = 60;
  const ribCount = Math.floor(width / 12);

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      {/* Pipe body */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #1a1a1a 0%, 
            #2d2d2d 45%, 
            #404040 50%, 
            #2d2d2d 55%, 
            #1a1a1a 100%)`,
          borderRadius: "6px",
          boxShadow: `
            inset 0 -4px 8px rgba(0,0,0,0.6),
            inset 0 4px 8px rgba(255,255,255,0.08),
            0 12px 32px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Corrugated ribs */}
        {[...Array(ribCount)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-y-0"
            style={{
              left: `${i * 12}px`,
              width: "6px",
              background: `linear-gradient(180deg, 
                rgba(0,0,0,0.4) 0%, 
                rgba(80,80,80,0.3) 50%, 
                rgba(0,0,0,0.4) 100%)`,
              borderLeft: "1px solid rgba(0,0,0,0.3)",
              borderRight: "1px solid rgba(100,100,100,0.15)",
            }}
          />
        ))}

        {/* Top highlight */}
        <div
          className="absolute top-[20%] left-0 right-0 h-[20%]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Left end cap - blue interior */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: `${height * 0.4}px`,
          background: `radial-gradient(ellipse at center, 
            #3b82f6 0%, 
            #2563eb 35%, 
            #1e40af 65%, 
            #1a1a1a 100%)`,
          borderRadius: "50%",
          transform: "translateX(-50%) rotateY(75deg)",
          boxShadow: "inset 2px 0 8px rgba(0,0,0,0.5)",
        }}
      />

      {/* Right end cap - blue interior */}
      <div
        className="absolute right-0 top-0 bottom-0"
        style={{
          width: `${height * 0.4}px`,
          background: `radial-gradient(ellipse at center, 
            #3b82f6 0%, 
            #2563eb 35%, 
            #1e40af 65%, 
            #1a1a1a 100%)`,
          borderRadius: "50%",
          transform: "translateX(50%) rotateY(-75deg)",
          boxShadow: "inset -2px 0 8px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

export function FallingPipes() {
  return (
    <div className="relative w-full h-[600px]">
      {pipes.map((pipe) => (
        <motion.div
          key={pipe.id}
          className="absolute left-1/2"
          style={{
            x: "-50%",
          }}
          initial={{
            y: -400,
            rotate: pipe.finalRotation - 20,
          }}
          animate={{
            y: pipe.finalY,
            rotate: pipe.finalRotation,
          }}
          transition={{
            delay: pipe.delay,
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
            y: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              mass: 1.5,
            },
            rotate: {
              type: "spring",
              damping: 15,
              stiffness: 80,
            },
          }}
        >
          <CorrugatedPipe width={pipe.width} />
        </motion.div>
      ))}
    </div>
  );
}
