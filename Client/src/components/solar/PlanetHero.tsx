"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  Points,
  type Texture,
} from "three";
import type { PlanetData } from "@/lib/planets";
import { Bloom, EffectComposer, SMAA, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";

function FloatingMoons({
  count,
  accent,
  radius,
}: {
  count: number;
  accent: string;
  radius: number;
}) {
  const group = useRef<Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: Math.min(count, 8) }, (_, i) => ({
        r: radius * (1.45 + (i % 3) * 0.22),
        speed: 0.35 + i * 0.08,
        y: ((i % 2) * 2 - 1) * 0.15 * radius,
        size: 0.045 + (i % 3) * 0.02,
        phase: (i / Math.max(count, 1)) * Math.PI * 2,
      })),
    [count, radius],
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const s = seeds[i];
      if (!s) return;
      s.phase += delta * s.speed;
      child.position.set(
        Math.cos(s.phase) * s.r,
        s.y + Math.sin(s.phase * 1.3) * 0.08,
        Math.sin(s.phase) * s.r,
      );
    });
  });

  if (count <= 0) return null;
  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i}>
          <sphereGeometry args={[s.size, 16, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Sparkles({ accent, count = 120 }: { accent: string; count?: number }) {
  const ref = useRef<Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 1.35;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * 1.2;
      positions[i * 3] = Math.cos(th) * Math.cos(ph) * r;
      positions[i * 3 + 1] = Math.sin(ph) * r * 0.55;
      positions[i * 3 + 2] = Math.sin(th) * Math.cos(ph) * r;
      speeds[i] = 0.15 + Math.random() * 0.35;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position!.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = arr[ix]!;
      const z = arr[ix + 2]!;
      const a = Math.atan2(z, x) + delta * speeds[i]!;
      const r = Math.hypot(x, z);
      arr[ix] = Math.cos(a) * r;
      arr[ix + 2] = Math.sin(a) * r;
      arr[ix + 1]! += Math.sin(a * 2) * delta * 0.02;
    }
    ref.current.geometry.attributes.position!.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={accent}
        size={0.028}
        transparent
        opacity={0.75}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function CursorTilt({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.x * 0.22, 4, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -pointer.y * 0.14, 4, delta);
  });
  return <group ref={group}>{children}</group>;
}

function ScrollZoom({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const targetZ = MathUtils.lerp(4.35, 5.6, scrollRef.current);
    camera.position.z = MathUtils.damp(camera.position.z, targetZ, 3, delta);
  });
  return null;
}

function RotatingPlanet({
  data,
  entrance,
}: {
  data: PlanetData;
  entrance: React.MutableRefObject<number>;
}) {
  const mesh = useRef<Mesh>(null);
  const clouds = useRef<Mesh>(null);
  const root = useRef<Group>(null);
  const map = useTexture(data.texture);
  const cloudsMap = useTexture(
    data.slug === "earth" ? "/textures/planets/2k_earth_clouds.jpg" : data.texture,
  );
  const ringsMap = useTexture(
    data.slug === "saturn" ? "/textures/planets/2k_saturn_ring_alpha.png" : data.texture,
  );
  const cloudTex: Texture | undefined = data.slug === "earth" ? cloudsMap : undefined;
  const ringTex: Texture | undefined = data.slug === "saturn" ? ringsMap : undefined;
  const r = data.slug === "saturn" ? 0.92 : 1.05;

  useFrame((_, delta) => {
    entrance.current = Math.min(1, entrance.current + delta * 0.9);
    const e = 1 - Math.pow(1 - entrance.current, 3);
    if (root.current) {
      const s = MathUtils.lerp(0.15, 1, e);
      root.current.scale.setScalar(s);
      root.current.rotation.y = (1 - e) * Math.PI * 1.25;
    }
    if (mesh.current) mesh.current.rotation.y += delta * 0.28;
    if (clouds.current) clouds.current.rotation.y += delta * 0.36;
  });

  return (
    <group ref={root}>
      <mesh ref={mesh}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshStandardMaterial
          map={map}
          roughness={0.68}
          metalness={0.12}
          emissive={data.accent}
          emissiveIntensity={0.12}
        />
      </mesh>
      {cloudTex && (
        <mesh ref={clouds} scale={1.02}>
          <sphereGeometry args={[r, 64, 64]} />
          <meshStandardMaterial map={cloudTex} transparent opacity={0.45} depthWrite={false} />
        </mesh>
      )}
      <mesh scale={1.12}>
        <sphereGeometry args={[r, 32, 32]} />
        <meshBasicMaterial
          color={data.accent}
          transparent
          opacity={0.16}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {ringTex && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[r * 1.35, r * 2.05, 128]} />
          <meshStandardMaterial
            map={ringTex}
            transparent
            side={DoubleSide}
            opacity={0.95}
            depthWrite={false}
          />
        </mesh>
      )}
      <FloatingMoons count={data.moonCount} accent={data.accent} radius={r} />
      <Sparkles accent={data.accent} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 2, 3]} intensity={2.4} />
      <pointLight position={[-3, -1, -2]} intensity={0.8} color={data.accent} />
      <pointLight position={[0, 0, 0]} intensity={0.35} color={data.accent} distance={6} />
    </group>
  );
}

export function PlanetHero({
  data,
  scrollRef,
}: {
  data: PlanetData;
  scrollRef: React.MutableRefObject<number>;
}) {
  const entrance = useRef(0);

  return (
    <div className="relative isolate h-[min(58vh,560px)] min-h-[300px] w-full max-w-full overflow-hidden rounded-3xl border border-white/10 md:h-[min(64vh,640px)]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${data.accent}33 0%, transparent 55%), linear-gradient(180deg, ${data.gradientFrom}, ${data.gradientTo})`,
        }}
      />
      <Canvas
        className="!absolute inset-0 h-full w-full"
        style={{ touchAction: "none" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.15, 4.35], fov: 36, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={[data.gradientTo]} />
          <CursorTilt>
            <RotatingPlanet data={data} entrance={entrance} />
          </CursorTilt>
          <ScrollZoom scrollRef={scrollRef} />
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.85} luminanceThreshold={0.48} mipmapBlur />
            <Vignette offset={0.3} darkness={0.55} />
            <SMAA />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-10"
      >
        <p className="mono-label text-[11px] tracking-[0.22em]" style={{ color: data.accent }}>
          PLANET {String(data.order).padStart(2, "0")} / 08
        </p>
        <h1 className="display-font mt-1 text-[44px] font-semibold text-white md:text-[64px]">
          {data.name}
        </h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.85, type: "spring", stiffness: 260, damping: 18 }}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="text-[16px]">✨</span>
          <span className="text-[13px] text-white/90">{data.cuteBubble}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
