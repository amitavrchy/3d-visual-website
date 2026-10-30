"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import {
  BackSide,
  DoubleSide,
  Mesh,
  AdditiveBlending,
  type Texture,
} from "three";
import type { PlanetData } from "@/lib/planets";
import {
  Bloom,
  EffectComposer,
  SMAA,
} from "@react-three/postprocessing";

function RotatingPlanet({ data }: { data: PlanetData }) {
  const mesh = useRef<Mesh>(null);
  const clouds = useRef<Mesh>(null);
  const map = useTexture(data.texture);
  const cloudsMap = useTexture(
    data.slug === "earth" ? "/textures/planets/2k_earth_clouds.jpg" : data.texture,
  );
  const ringsMap = useTexture(
    data.slug === "saturn"
      ? "/textures/planets/2k_saturn_ring_alpha.png"
      : data.texture,
  );
  const cloudTex: Texture | undefined = data.slug === "earth" ? cloudsMap : undefined;
  const ringTex: Texture | undefined = data.slug === "saturn" ? ringsMap : undefined;

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.25;
    if (clouds.current) clouds.current.rotation.y += delta * 0.32;
  });

  const r = 1.35;

  return (
    <group rotation={[0.15, 0, data.tilt * 0.35]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshStandardMaterial
          map={map}
          roughness={0.7}
          metalness={0.1}
          emissive={data.accent}
          emissiveIntensity={0.08}
        />
      </mesh>
      {cloudTex && (
        <mesh ref={clouds} scale={1.02}>
          <sphereGeometry args={[r, 64, 64]} />
          <meshStandardMaterial map={cloudTex} transparent opacity={0.45} depthWrite={false} />
        </mesh>
      )}
      {data.slug === "earth" && (
        <mesh scale={1.12}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshBasicMaterial
            color="#4AF2C8"
            transparent
            opacity={0.14}
            side={BackSide}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
      {ringTex && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[r * 1.4, r * 2.5, 128]} />
          <meshStandardMaterial
            map={ringTex}
            transparent
            side={DoubleSide}
            opacity={0.95}
            depthWrite={false}
          />
        </mesh>
      )}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 2, 3]} intensity={2.2} />
      <pointLight position={[-3, -1, -2]} intensity={0.6} color={data.accent} />
    </group>
  );
}

export function PlanetHero({ data }: { data: PlanetData }) {
  return (
    <div className="relative h-[55vh] min-h-[340px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#020208] md:h-[62vh]">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.4, 4.2], fov: 40 }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#020208"]} />
          <RotatingPlanet data={data} />
          <Environment preset="night" />
          <EffectComposer>
            <Bloom intensity={0.85} luminanceThreshold={0.5} mipmapBlur />
            <SMAA />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020208] via-[#020208]/40 to-transparent p-6 md:p-8">
        <p className="mono-label text-[11px] tracking-[0.2em] text-[#4AF2C8]">
          PLANET {String(data.order).padStart(2, "0")} / 08
        </p>
        <h1 className="display-font text-[40px] font-semibold text-white md:text-[56px]">
          {data.name}
        </h1>
      </div>
    </div>
  );
}
