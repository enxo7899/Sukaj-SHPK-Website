"use client";

import { motion } from "framer-motion";

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large animated gradient orbs */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '700px',
                    height: '700px',
                    top: '-15%',
                    left: '-10%',
                    background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(8,145,178,0.12) 40%, transparent 70%)',
                }}
                animate={{
                    x: [0, 80, -50, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.15, 0.9, 1],
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '800px',
                    height: '500px',
                    top: '10%',
                    right: '-15%',
                    background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(8,145,178,0.1) 45%, transparent 70%)',
                }}
                animate={{
                    x: [0, -60, 50, 0],
                    y: [0, 70, -30, 0],
                    scale: [1, 0.85, 1.1, 1],
                    rotate: [360, 270, 180, 90, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
            />
            
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '600px',
                    height: '600px',
                    bottom: '-10%',
                    left: '25%',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(8,145,178,0.08) 50%, transparent 70%)',
                }}
                animate={{
                    x: [0, 60, -40, 0],
                    y: [0, -50, 30, 0],
                    scale: [1, 1.08, 0.94, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 7,
                }}
            />

            {/* Animated grid particles */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <motion.circle
                            cx="20"
                            cy="20"
                            r="1"
                            fill="rgba(34,211,238,0.4)"
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </pattern>
                    <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="20%" stopColor="white" stopOpacity="1" />
                        <stop offset="80%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <mask id="grid-mask">
                        <rect width="100%" height="100%" fill="url(#grid-fade)" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" mask="url(#grid-mask)" />
            </svg>

            {/* Flowing light streaks */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-px"
                    style={{
                        width: '200px',
                        top: `${20 + i * 15}%`,
                        left: '-200px',
                        background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)',
                    }}
                    animate={{
                        x: ['0vw', '120vw'],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 1.5,
                    }}
                />
            ))}
        </div>
    );
}
