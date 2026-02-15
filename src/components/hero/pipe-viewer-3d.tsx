"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Group, Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { pipeModel } from "@/lib/assets";

function PremiumPipeMesh() {
  const { scene } = useGLTF(pipeModel.premiumGlb);
  const rootRef = useRef<Group>(null);

  const prepared = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) {
        return;
      }
      object.castShadow = true;
      object.receiveShadow = true;

      const name = object.name.toLowerCase();
      const isSocket = name.includes("socket");
      const isBranding = name.includes("branding");
      const isBrandingShadow = name.includes("shadow");

      object.material = new MeshPhysicalMaterial({
        color: isBrandingShadow ? "#111827" : isBranding ? "#dbe2ee" : isSocket ? "#02040a" : "#030a16",
        roughness: isBrandingShadow ? 0.72 : isBranding ? 0.35 : isSocket ? 0.7 : 0.54,
        metalness: isBrandingShadow ? 0 : isBranding ? 0.16 : 0.03,
        clearcoat: isBrandingShadow ? 0.04 : isBranding ? 0.24 : 0.16,
        clearcoatRoughness: isBrandingShadow ? 0.9 : isBranding ? 0.42 : 0.68,
        emissive: isBranding ? "#1f2937" : "#01030a",
        emissiveIntensity: isBranding ? 0.01 : 0.01,
      });
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!rootRef.current) {
      return;
    }
    rootRef.current.rotation.y = -0.08;
    rootRef.current.rotation.x = 0.04 + Math.sin(state.clock.elapsedTime * 0.3) * 0.012;
    rootRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.014;
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
  return (
    <Canvas camera={{ position: [0.7, 0.22, 6.45], fov: 30 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#cbd5e1", "#020617", 0.48]} />
      <directionalLight position={[3.1, 3.1, 2.2]} intensity={1.25} color="#f8fafc" castShadow />
      <directionalLight position={[-3.2, -0.8, 2.5]} intensity={0.8} color="#93c5fd" />
      <spotLight position={[0.4, 2.1, 3.5]} intensity={0.52} angle={0.28} penumbra={0.9} color="#ffffff" />
      <Suspense fallback={<Loader />}>
        <PremiumPipeMesh />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.52}
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
  );
}

useGLTF.preload(pipeModel.premiumGlb);
