"use client";

import { Float, Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import type { Project } from "@/lib/api";

type Props = { project: Project };

function SignalDiorama({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.28;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.62, 1.7, 6]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={1.35}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.2, 0]}>
        <torusGeometry args={[0.95, 0.02, 12, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function OrbitDiorama({ color }: { color: string }) {
  const orb = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (orb.current) orb.current.rotation.y += d * 0.45;
    if (ring.current) ring.current.rotation.z -= d * 0.3;
  });
  return (
    <Float speed={1.6} floatIntensity={0.55}>
      <mesh ref={orb} position={[0, 1.2, 0]} castShadow>
        <torusKnotGeometry args={[0.58, 0.18, 160, 18]} />
        <meshStandardMaterial
          color={color}
          metalness={0.88}
          roughness={0.14}
          emissive={color}
          emissiveIntensity={0.22}
        />
      </mesh>
      <mesh ref={ring} position={[0, 1.2, 0]} rotation={[Math.PI / 2.6, 0.2, 0]}>
        <torusGeometry args={[1.35, 0.02, 12, 100]} />
        <meshBasicMaterial color="#F3F4F7" transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

function ThresholdDiorama({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-1.25, 1.35, -0.3]} castShadow>
        <boxGeometry args={[0.28, 2.7, 1.8]} />
        <meshStandardMaterial color="#171b28" roughness={0.75} />
      </mesh>
      <mesh position={[1.25, 1.35, -0.3]} castShadow>
        <boxGeometry args={[0.28, 2.7, 1.8]} />
        <meshStandardMaterial color="#171b28" roughness={0.75} />
      </mesh>
      <mesh position={[0, 2.65, -0.3]}>
        <boxGeometry args={[2.8, 0.22, 1.8]} />
        <meshStandardMaterial color="#0F1118" />
      </mesh>
      <mesh position={[0, 1.35, -0.2]}>
        <planeGeometry args={[1.9, 2.35]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.65}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 1.2]}>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#0A0B10" roughness={1} />
      </mesh>
    </group>
  );
}

export function ProjectDiorama({ project }: Props) {
  const theme = project.sceneConfig.theme?.primary ?? "#4AF2C8";
  const accent = project.sceneConfig.theme?.accent ?? "#FF5C7A";
  const kind = project.sceneConfig.diorama ?? "signal";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#090A10" roughness={0.95} metalness={0.15} />
      </mesh>
      <Grid
        position={[0, 0.01, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.4}
        cellColor="#1a1e30"
        sectionSize={2}
        sectionThickness={1}
        sectionColor={theme}
        fadeDistance={10}
        infiniteGrid
      />
      {kind === "orbit" ? (
        <OrbitDiorama color={theme} />
      ) : kind === "threshold" ? (
        <ThresholdDiorama color={theme} />
      ) : (
        <SignalDiorama color={theme} accent={accent} />
      )}
    </group>
  );
}
