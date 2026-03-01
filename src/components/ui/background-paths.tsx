"use client";

import { motion } from "framer-motion";

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Animated gradient blob 1 */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '500px',
                    height: '500px',
                    top: '-10%',
                    left: '-5%',
                    background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(8,145,178,0.08) 50%, transparent 70%)',
                }}
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -40, 30, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            {/* Animated gradient blob 2 */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '600px',
                    height: '400px',
                    top: '15%',
                    right: '-10%',
                    background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(8,145,178,0.06) 50%, transparent 70%)',
                }}
                animate={{
                    x: [0, -40, 30, 0],
                    y: [0, 50, -20, 0],
                    scale: [1, 0.9, 1.05, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            
            {/* Animated gradient blob 3 */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '450px',
                    height: '450px',
                    bottom: '-5%',
                    left: '30%',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(8,145,178,0.05) 50%, transparent 70%)',
                }}
                animate={{
                    x: [0, 40, -25, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.05, 0.92, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
}
