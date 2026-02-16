"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Group, Mesh, Object3D } from "three";
import { pipeModel } from "@/lib/assets";
import { PipeViewerSprite } from "@/components/hero/pipe-viewer-sprite";

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

class PipeCanvasErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <PipeViewerSprite />;
    }
    return this.props.children;
  }
}

function PremiumPipeMesh({ reduceMotion, onReady }: { reduceMotion: boolean; onReady: () => void }) {
  const { scene } = useGLTF(pipeModel.premiumGlb);
  const rootRef = useRef<Group>(null);

  const prepared = useMemo<Group>(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) {
        return;
      }
      object.castShadow = true;
      object.receiveShadow = true;
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((state) => {
    if (!rootRef.current) {
      return;
    }
    rootRef.current.rotation.y = reduceMotion ? -0.08 : -0.08 + Math.sin(state.clock.elapsedTime * 0.22) * 0.03;
    rootRef.current.rotation.x = reduceMotion ? 0.04 : 0.04 + Math.sin(state.clock.elapsedTime * 0.3) * 0.012;
    rootRef.current.position.y = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.45) * 0.014;
  });

  return (
    <group ref={rootRef}>
      <Center scale={0.9} position={[0, -0.03, 0]}>
        <primitive object={prepared} />
      </Center>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-lg border border-white/15 bg-slate-900/85 px-3 py-2 font-mono text-[11px] tracking-[0.18em] text-slate-200">
        LOADING PREMIUM MODEL
      </div>
    </Html>
  );
}

export function PipeViewer3D() {
  const reduceMotion = usePrefersReducedMotion();
  const [contextLost, setContextLost] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!modelReady) {
        setTimedOut(true);
      }
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [modelReady]);

  if (contextLost || timedOut) {
    return <PipeViewerSprite />;
  }

  return (
    <PipeCanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 0.22, 6.45], fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (event) => {
              event.preventDefault();
              setContextLost(true);
            },
            { once: true }
          );
        }}
      >
        <ambientLight intensity={0.18} />
        <hemisphereLight args={["#cbd5e1", "#020617", 0.48]} />
        <directionalLight position={[3.1, 3.1, 2.2]} intensity={1.25} color="#f8fafc" castShadow />
        <directionalLight position={[-3.2, -0.8, 2.5]} intensity={0.8} color="#93c5fd" />
        <spotLight position={[0.4, 2.1, 3.5]} intensity={0.52} angle={0.28} penumbra={0.9} color="#ffffff" />
        <Suspense fallback={<Loader />}>
          <PremiumPipeMesh reduceMotion={reduceMotion} onReady={() => setModelReady(true)} />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls
          autoRotate={!reduceMotion}
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.09}
          enablePan={false}
          enableZoom={false}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.95}
        />
        <ContactShadows position={[0, -1.28, 0]} scale={6.3} blur={1.9} opacity={0.58} far={3.2} />
      </Canvas>
    </PipeCanvasErrorBoundary>
  );
}
