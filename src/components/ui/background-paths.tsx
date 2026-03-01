"use client";

const PATH_LEN = 1800;

function FloatingPaths({ position, gradId }: { position: number; gradId: string }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        opacity: (0.08 + i * 0.018) * 0.75,
        duration: 20 + i * 0.5,
        delay: -(i * 0.55),
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#0e7490" />
                        <stop offset="50%"  stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                    <style>{`
                        @keyframes bp-flow-${gradId} {
                            from { stroke-dashoffset: ${PATH_LEN}; }
                            to   { stroke-dashoffset: ${-PATH_LEN}; }
                        }
                    `}</style>
                </defs>
                {paths.map((path) => (
                    <path
                        key={path.id}
                        d={path.d}
                        stroke={`url(#${gradId})`}
                        strokeWidth={path.width}
                        strokeOpacity={path.opacity}
                        fill="none"
                        strokeDasharray={`${PATH_LEN * 0.25} ${PATH_LEN * 0.75}`}
                        strokeLinecap="round"
                        style={{
                            animation: `bp-flow-${gradId} ${path.duration}s linear ${path.delay}s infinite`,
                            willChange: "stroke-dashoffset",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <FloatingPaths position={1}  gradId="bp-a" />
            <FloatingPaths position={-1} gradId="bp-b" />
        </div>
    );
}
