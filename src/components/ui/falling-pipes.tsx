"use client";

import { motion } from "framer-motion";

interface Pipe {
  id: number;
  width: number;
  delay: number;
  initialRotation: number;
  groundLevel: number;
}

const pipes: Pipe[] = [
  { id: 1, width: 280, delay: 0, initialRotation: -45, groundLevel: 480 },
  { id: 2, width: 320, delay: 0.2, initialRotation: 30, groundLevel: 420 },
  { id: 3, width: 260, delay: 0.4, initialRotation: -60, groundLevel: 360 },
  { id: 4, width: 300, delay: 0.6, initialRotation: 50, groundLevel: 300 },
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
            y: -200,
            rotate: pipe.initialRotation,
          }}
          animate={{
            y: [
              -200,
              pipe.groundLevel - 50,
              pipe.groundLevel - 20,
              pipe.groundLevel - 5,
              pipe.groundLevel,
            ],
            rotate: [
              pipe.initialRotation,
              pipe.initialRotation + 180,
              pipe.initialRotation + 270,
              pipe.initialRotation + 340,
              pipe.initialRotation + 360,
            ],
          }}
          transition={{
            delay: pipe.delay,
            duration: 1.8,
            times: [0, 0.5, 0.7, 0.85, 1],
            ease: "easeIn",
            y: {
              type: "tween",
              ease: [0.25, 0.1, 0.25, 1],
            },
            rotate: {
              type: "tween",
              ease: "linear",
            },
          }}
        >
          <CorrugatedPipe width={pipe.width} />
        </motion.div>
      ))}
    </div>
  );
}
