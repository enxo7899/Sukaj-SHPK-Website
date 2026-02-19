"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PipeViewerSprite } from "@/components/hero/pipe-viewer-sprite";
import {
  PerformanceContext,
  type DeviceCapabilities,
  type PerformanceTier,
} from "@/lib/performance";

const PipeViewer3DLazy = dynamic(
  () =>
    import("@/components/hero/pipe-viewer-3d").then((mod) => mod.PipeViewer3D),
  { ssr: false, loading: () => <PipeViewerSprite /> }
);

function useDeviceCapabilities(): DeviceCapabilities | null {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };

    let webglSupported = false;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      webglSupported = Boolean(gl);
    } catch {
      webglSupported = false;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.matchMedia("(max-width: 768px)").matches;

    const connection = nav.connection;
    const saveData = Boolean(connection?.saveData);
    const slowNetwork = Boolean(
      saveData ||
        (connection?.effectiveType &&
          /(^2g$|slow-2g)/i.test(connection.effectiveType))
    );

    const memory = nav.deviceMemory ?? 8;
    const cores = nav.hardwareConcurrency ?? 8;

    let tier: PerformanceTier = "high";
    if (slowNetwork || memory <= 2 || cores <= 2) {
      tier = "low";
    } else if (isMobile || memory <= 4 || cores <= 4) {
      tier = "medium";
    }

    setCapabilities({
      webglSupported,
      tier,
      isMobile,
      saveData,
    });
  }, []);

  return capabilities;
}

function StaticFallback({ showRetry, onRetry }: { showRetry?: boolean; onRetry?: () => void }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.12),transparent_45%)]">
      <Image
        src="/media/hero/pipe-static-fallback.webp"
        alt="HDPE/PVC Industrial Pipe - Sukaj SHPK"
        width={400}
        height={400}
        className="h-auto w-[280px] max-w-full object-contain sm:w-[320px] lg:w-[380px]"
        priority
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg border border-white/20 bg-slate-900/80 px-4 py-2 font-mono text-xs tracking-wider text-slate-200 transition-colors hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          TAP TO RETRY 3D
        </button>
      )}
    </div>
  );
}

export function Hero3DClient() {
  const capabilities = useDeviceCapabilities();
  const [retryKey, setRetryKey] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const contextLostTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRetry = useCallback(() => {
    setShowFallback(false);
    setRetryKey((k) => k + 1);
  }, []);

  const handleContextLost = useCallback(() => {
    if (contextLostTimerRef.current) clearTimeout(contextLostTimerRef.current);
    contextLostTimerRef.current = setTimeout(() => {
      setShowFallback(true);
    }, 4000);
  }, []);

  const handlePerformanceDrop = useCallback(() => {
    setShowFallback(true);
  }, []);

  useEffect(() => {
    return () => {
      if (contextLostTimerRef.current) clearTimeout(contextLostTimerRef.current);
    };
  }, []);

  if (capabilities === null) {
    return <PipeViewerSprite />;
  }

  if (!capabilities.webglSupported || capabilities.saveData) {
    return <StaticFallback />;
  }

  if (showFallback) {
    return <StaticFallback showRetry onRetry={handleRetry} />;
  }

  return (
    <PerformanceContext.Provider value={capabilities}>
      <div
        className="h-full w-full"
        onContextMenu={(e) => e.preventDefault()}
      >
        <PipeViewer3DLazy
          key={retryKey}
          onContextLost={handleContextLost}
          onPerformanceDrop={handlePerformanceDrop}
        />
      </div>
    </PerformanceContext.Provider>
  );
}
