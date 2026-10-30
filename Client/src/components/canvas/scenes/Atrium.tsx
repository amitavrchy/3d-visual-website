"use client";

import { Float, Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { Hotspot } from "../hotspots/Hotspot";
import { WorldNoteMeshes } from "./WorldNoteMeshes";

const HOTSPOTS = [
  { id: "work", label: "Work", href: "/work", position: [-2.4, 1.35, -0.4] as [number, number, number] },
  { id: "playground", label: "Playground", href: "/playground", position: [0, 1.7, -1.6] as [number, number, number] },
  { id: "about", label: "About", href: "/about", position: [2.3, 1.4, -0.2] as [number, number, number] },
  { id: "contact", label: "Contact", href: "/contact", position: [0.2, 0.95, 1.8] as [number, number, number] },
];

export function Atrium() {
  const coreRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        key: i,
        position: [
          Math.sin(i * 0.7) * (2.2 + (i % 5) * 0.15),
          0.6 + (i % 7) * 0.22,
          Math.cos(i * 0.55) * (2 + (i % 4) * 0.2),
        ] as [number, number, number],
        scale: 0.03 + (i % 3) * 0.015,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.08;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0F1118" roughness={0.9} metalness={0.1} />
      </mesh>
      <Grid
        position={[0, 0.01, 0]}
        args={[12, 12]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#22263A"
        sectionSize={2}
        sectionThickness={1.1}
        sectionColor="#4AF2C8"
        fadeDistance={14}
        infiniteGrid
      />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh ref={coreRef} position={[0, 1.35, 0]} castShadow>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial
            color="#6B8CFF"
            emissive="#4AF2C8"
            emissiveIntensity={0.35}
            metalness={0.7}
            roughness={0.2}
            wireframe={false}
          />
        </mesh>
      </Float>

      <group ref={orbitRef} position={[0, 1.35, 0]}>
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[1.55, 0.025, 16, 100]} />
          <meshBasicMaterial color="#4AF2C8" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[0.4, Math.PI / 3, 0.2]}>
          <torusGeometry args={[1.95, 0.018, 16, 120]} />
          <meshBasicMaterial color="#FF5C7A" transparent opacity={0.45} />
        </mesh>
      </group>

      {particles.map((p) => (
        <mesh key={p.key} position={p.position} scale={p.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#9AA3B5" transparent opacity={0.55} />
        </mesh>
      ))}

      {HOTSPOTS.map((h) => (
        <Hotspot key={h.id} {...h} />
      ))}

      <WorldNoteMeshes />
    </group>
  );
}
