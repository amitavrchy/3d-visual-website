"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import type { Project } from "@/lib/api";

type Props = {
  project: Project;
};

function SignalDiorama({ color }: { color: string }) {
  const ref = useRef<Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.35;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.55, 1.6, 6]} />
        <meshStandardMaterial color={color} metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#4AF2C8"
          emissive="#4AF2C8"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

function OrbitDiorama({ color }: { color: string }) {
  const orb = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (orb.current) orb.current.rotation.y += d * 0.5;
  });
  return (
    <Float speed={2} floatIntensity={0.8}>
      <mesh ref={orb} position={[0, 1.1, 0]} castShadow>
        <torusKnotGeometry args={[0.55, 0.18, 128, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.18}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function ThresholdDiorama({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-1.1, 1.2, -0.4]} castShadow>
        <boxGeometry args={[0.25, 2.4, 1.6]} />
        <meshStandardMaterial color="#22263A" roughness={0.8} />
      </mesh>
      <mesh position={[1.1, 1.2, -0.4]} castShadow>
        <boxGeometry args={[0.25, 2.4, 1.6]} />
        <meshStandardMaterial color="#22263A" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.35, -0.4]}>
        <boxGeometry args={[2.5, 0.2, 1.6]} />
        <meshStandardMaterial color="#0F1118" />
      </mesh>
      <mesh position={[0, 1.2, -0.35]}>
        <planeGeometry args={[1.7, 2.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

export function ProjectDiorama({ project }: Props) {
  const theme = project.sceneConfig.theme?.primary ?? "#4AF2C8";
  const kind = project.sceneConfig.diorama ?? "signal";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.5, 48]} />
        <meshStandardMaterial color="#0B0C12" roughness={0.95} />
      </mesh>
      {kind === "orbit" ? (
        <OrbitDiorama color={theme} />
      ) : kind === "threshold" ? (
        <ThresholdDiorama color={theme} />
      ) : (
        <SignalDiorama color={theme} />
      )}
    </group>
  );
}
