"use client";

import { Html } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
} from "three";
import type { PlanetData } from "@/lib/planets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setHovered, startFlyTo } from "@/features/solar/solarSlice";
import { useProgressiveTexture } from "@/hooks/useProgressiveTexture";

type PlanetBodyProps = {
  data: PlanetData;
  angleRef: React.MutableRefObject<number>;
};

function EarthExtras({ size, spinSpeed, paused }: { size: number; spinSpeed: number; paused: boolean }) {
  const cloudsRef = useRef<Mesh>(null);
  const moonRef = useRef<Group>(null);
  const moonAngle = useRef(Math.random() * Math.PI * 2);
  const clouds = useProgressiveTexture("/textures/planets/2k_earth_clouds.webp", { preview: null });
  const moon = useProgressiveTexture("/textures/planets/2k_moon.webp", { preview: null });

  useFrame((_, delta) => {
    if (paused) return;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * spinSpeed * 1.15;
    moonAngle.current += delta * 0.9;
    if (moonRef.current) {
      const r = size * 2.4;
      moonRef.current.position.set(
        Math.cos(moonAngle.current) * r,
        Math.sin(moonAngle.current * 0.3) * size * 0.15,
        Math.sin(moonAngle.current) * r,
      );
    }
  });

  return (
    <>
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={clouds ?? undefined}
          color={clouds ? "#ffffff" : "#cfe8ff"}
          transparent
          opacity={clouds ? 0.45 : 0.2}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.14}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshBasicMaterial color="#4AF2C8" transparent opacity={0.12} side={BackSide} depthWrite={false} />
      </mesh>
      <group ref={moonRef}>
        <mesh>
          <sphereGeometry args={[size * 0.27, 16, 16]} />
          <meshStandardMaterial
            map={moon ?? undefined}
            color={moon ? "#ffffff" : "#b8b8b8"}
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
      </group>
    </>
  );
}

function SaturnRings({ size }: { size: number }) {
  const rings = useProgressiveTexture("/textures/planets/2k_saturn_ring_alpha.webp", { preview: null });
  return (
    <mesh rotation={[Math.PI / 2.35, 0, 0]}>
      <ringGeometry args={[size * 1.35, size * 2.4, 64]} />
      <meshStandardMaterial
        map={rings ?? undefined}
        color={rings ? "#ffffff" : "#c9b896"}
        transparent
        side={DoubleSide}
        opacity={0.92}
        depthWrite={false}
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
}

export function PlanetBody({ data, angleRef }: PlanetBodyProps) {
  const dispatch = useAppDispatch();
  const hovered = useAppSelector((s) => s.solar.hovered);
  const paused = useAppSelector((s) => s.solar.paused);
  const phase = useAppSelector((s) => s.solar.phase);
  const group = useRef<Group>(null);
  const planet = useRef<Mesh>(null);
  const highlight = useRef<Mesh>(null);
  const map = useProgressiveTexture(data.texture);
  const isHovered = hovered === data.slug;
  const busy = phase !== "idle";

  useFrame((_, delta) => {
    if (!paused) {
      angleRef.current += delta * data.orbitSpeed * 0.35;
      if (planet.current) planet.current.rotation.y += delta * data.spinSpeed;
    }
    if (group.current) {
      const a = angleRef.current;
      group.current.position.set(
        Math.cos(a) * data.orbitRadius,
        0,
        Math.sin(a) * data.orbitRadius,
      );
    }
    if (highlight.current) {
      const mat = highlight.current.material as { opacity: number };
      mat.opacity = MathUtils.damp(mat.opacity, isHovered && !busy ? 0.4 : 0, 8, delta);
      const s = MathUtils.damp(highlight.current.scale.x, isHovered && !busy ? 1.2 : 1.05, 8, delta);
      highlight.current.scale.setScalar(s);
    }
  });

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (busy) return;
    document.body.style.cursor = "pointer";
    dispatch(setHovered(data.slug));
  };
  const onPointerOut = () => {
    document.body.style.cursor = "auto";
    dispatch(setHovered(null));
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (busy) return;
    dispatch(startFlyTo({ slug: data.slug, color: data.accent }));
  };

  return (
    <group ref={group}>
      <group rotation={[0, 0, data.tilt]}>
        <mesh
          ref={planet}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          onClick={onClick}
        >
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial
            map={map ?? undefined}
            color={map ? "#ffffff" : data.accent}
            roughness={0.75}
            metalness={0.08}
            emissive={data.accent}
            emissiveIntensity={isHovered ? 0.2 : map ? 0.04 : 0.18}
          />
        </mesh>

        {data.slug === "earth" && (
          <EarthExtras size={data.size} spinSpeed={data.spinSpeed} paused={paused} />
        )}
        {data.slug === "saturn" && <SaturnRings size={data.size} />}

        <mesh ref={highlight} scale={1.05}>
          <sphereGeometry args={[data.size, 24, 24]} />
          <meshBasicMaterial
            color={data.accent}
            transparent
            opacity={0}
            side={BackSide}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {isHovered && !busy && (
        <Html distanceFactor={14} position={[0, data.size + 0.55, 0]} center zIndexRange={[40, 0]}>
          <div className="pointer-events-none rounded-md border border-white/15 bg-[#050508]/80 px-3 py-1.5 backdrop-blur-sm">
            <p className="mono-label text-[10px] tracking-[0.18em] text-[#4AF2C8]">
              {String(data.order).padStart(2, "0")}
            </p>
            <p className="display-font text-[16px] font-semibold text-white">{data.name}</p>
          </div>
        </Html>
      )}
    </group>
  );
}
