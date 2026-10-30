"use client";

import { Float, Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, type Group, type Mesh } from "three";
import { Hotspot } from "../hotspots/Hotspot";
import { WorldNoteMeshes } from "./WorldNoteMeshes";

const HOTSPOTS = [
  {
    id: "work",
    label: "Work",
    hint: "Case studies",
    href: "/work",
    position: [-2.8, 1.15, 0.2] as [number, number, number],
  },
  {
    id: "playground",
    label: "Lab",
    hint: "Materials",
    href: "/playground",
    position: [0, 1.55, -2.2] as [number, number, number],
  },
  {
    id: "about",
    label: "Studio",
    hint: "About us",
    href: "/about",
    position: [2.8, 1.15, 0.2] as [number, number, number],
  },
  {
    id: "contact",
    label: "Brief",
    hint: "Start a project",
    href: "/contact",
    position: [0, 0.85, 2.4] as [number, number, number],
  },
];

function Pillar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[0.35, 2.8, 0.35]} />
        <meshStandardMaterial color="#161925" metalness={0.35} roughness={0.55} />
      </mesh>
      <mesh position={[0, 2.85, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#22263A" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#22263A" />
      </mesh>
    </group>
  );
}

export function Atrium() {
  const coreRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);
  const beamRef = useRef<Mesh>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => ({
        key: i,
        position: [
          Math.sin(i * 0.65) * (3.2 + (i % 6) * 0.18),
          0.4 + (i % 9) * 0.28,
          Math.cos(i * 0.5) * (2.6 + (i % 5) * 0.22),
        ] as [number, number, number],
        scale: 0.025 + (i % 4) * 0.012,
      })),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.22;
      coreRef.current.rotation.x = Math.sin(t * 0.35) * 0.12;
      coreRef.current.position.y = 1.55 + Math.sin(t * 0.8) * 0.08;
    }
    if (orbitRef.current) orbitRef.current.rotation.y -= delta * 0.14;
    if (beamRef.current) {
      const mat = beamRef.current.material as { opacity: number };
      mat.opacity = 0.08 + Math.sin(t * 1.4) * 0.04;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 72]} />
        <meshStandardMaterial color="#0B0D14" roughness={0.88} metalness={0.35} />
      </mesh>

      <Grid
        position={[0, 0.015, 0]}
        args={[16, 16]}
        cellSize={0.5}
        cellThickness={0.45}
        cellColor="#1a1e30"
        sectionSize={2.5}
        sectionThickness={1.05}
        sectionColor="#4AF2C8"
        fadeDistance={16}
        fadeStrength={1.2}
        infiniteGrid
      />

      <Pillar position={[-3.6, 0, -2.2]} />
      <Pillar position={[3.6, 0, -2.2]} />
      <Pillar position={[-3.6, 0, 2.2]} />
      <Pillar position={[3.6, 0, 2.2]} />

      <mesh position={[0, 3.1, -2.2]}>
        <boxGeometry args={[7.6, 0.18, 0.4]} />
        <meshStandardMaterial color="#141824" metalness={0.3} roughness={0.5} />
      </mesh>

      <mesh ref={beamRef} position={[0, 2.2, 0]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.15, 2.4, 4.2, 32, 1, true]} />
        <meshBasicMaterial
          color="#4AF2C8"
          transparent
          opacity={0.1}
          side={DoubleSide}
        />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh ref={coreRef} castShadow>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#6B8CFF"
            emissive="#4AF2C8"
            emissiveIntensity={0.45}
            metalness={0.78}
            roughness={0.16}
          />
        </mesh>
      </Float>

      <group ref={orbitRef} position={[0, 1.55, 0]}>
        <mesh rotation={[Math.PI / 2.5, 0.25, 0]}>
          <torusGeometry args={[1.7, 0.02, 16, 120]} />
          <meshStandardMaterial
            color="#4AF2C8"
            emissive="#4AF2C8"
            emissiveIntensity={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh rotation={[0.55, Math.PI / 3.2, 0.15]}>
          <torusGeometry args={[2.15, 0.014, 16, 140]} />
          <meshStandardMaterial
            color="#FF5C7A"
            emissive="#FF5C7A"
            emissiveIntensity={0.5}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh rotation={[-0.4, 0.8, 0.5]}>
          <torusGeometry args={[2.55, 0.01, 12, 160]} />
          <meshBasicMaterial color="#9AA3B5" transparent opacity={0.35} />
        </mesh>
      </group>

      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.35, 0.55, 48]} />
        <meshStandardMaterial color="#12151f" metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.56, 0]}>
        <torusGeometry args={[1.05, 0.03, 12, 64]} />
        <meshStandardMaterial
          color="#4AF2C8"
          emissive="#4AF2C8"
          emissiveIntensity={0.6}
        />
      </mesh>

      {particles.map((p) => (
        <mesh key={p.key} position={p.position} scale={p.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#9AA3B5" transparent opacity={0.4} />
        </mesh>
      ))}

      {HOTSPOTS.map((h) => (
        <Hotspot key={h.id} {...h} />
      ))}

      <WorldNoteMeshes />
    </group>
  );
}
