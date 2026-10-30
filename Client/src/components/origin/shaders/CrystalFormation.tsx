"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils } from "three";
import { scrollState } from "@/lib/scrollState";

const CRYSTALS = [
  { pos: [1.4, 0.2, 0.6] as const, scale: 0.35, rot: [0.3, 0.5, 0.1] as const, color: "#4AF2C8" },
  { pos: [-1.2, -0.1, 0.8] as const, scale: 0.28, rot: [0.1, -0.4, 0.3] as const, color: "#6B8CFF" },
  { pos: [0.3, 0.9, -0.7] as const, scale: 0.42, rot: [-0.2, 0.8, 0.15] as const, color: "#A8B4FF" },
  { pos: [-0.7, 0.5, -1.1] as const, scale: 0.22, rot: [0.5, 0.2, -0.3] as const, color: "#FF5C7A" },
  { pos: [0.9, -0.5, -0.4] as const, scale: 0.3, rot: [0.2, -0.6, 0.4] as const, color: "#7af7d8" },
  { pos: [-1.5, 0.7, 0.1] as const, scale: 0.18, rot: [-0.4, 0.3, 0.5] as const, color: "#6B8CFF" },
  { pos: [0.1, -0.8, 1.0] as const, scale: 0.25, rot: [0.6, 0.1, -0.2] as const, color: "#4AF2C8" },
  { pos: [1.6, 0.6, -0.9] as const, scale: 0.2, rot: [-0.3, 0.7, 0.2] as const, color: "#F3F4F7" },
];

export function CrystalFormation() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;
    let appear = 0;
    if (p > 0.58) {
      appear = MathUtils.clamp((p - 0.58) / 0.2, 0, 1);
    }
    if (group.current) {
      group.current.visible = appear > 0.01;
      group.current.rotation.y = t * 0.08;
      group.current.children.forEach((child, i) => {
        const target = CRYSTALS[i]!.scale * appear;
        child.scale.setScalar(MathUtils.lerp(child.scale.x, target, 0.08));
        child.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
        child.position.y =
          CRYSTALS[i]!.pos[1] + Math.sin(t * 0.7 + i) * 0.04 * appear;
      });
    }
  });

  return (
    <group ref={group}>
      {CRYSTALS.map((c, i) => (
        <mesh
          key={i}
          position={[c.pos[0], c.pos[1], c.pos[2]]}
          rotation={[c.rot[0], c.rot[1], c.rot[2]]}
          scale={0.001}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.45}
            metalness={0.85}
            roughness={0.18}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
    </group>
  );
}
