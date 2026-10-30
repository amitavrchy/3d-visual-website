"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { scrollState } from "@/lib/scrollState";

export function LightRays() {
  const group = useRef<Group>(null);
  const rays = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        key: i,
        rot: (i / 12) * Math.PI * 2,
        len: 2.2 + (i % 4) * 0.45,
        width: 0.04 + (i % 3) * 0.02,
        phase: i * 0.4,
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;
    let opacity = 0;
    if (p > 0.28 && p < 0.55) {
      const mid = (p - 0.28) / 0.27;
      opacity = Math.sin(Math.min(1, mid) * Math.PI) * 0.55;
    }
    if (group.current) {
      group.current.rotation.z = t * 0.12;
      group.current.visible = opacity > 0.02;
      group.current.children.forEach((child, i) => {
        const mesh = child as Mesh;
        const mat = mesh.material as MeshBasicMaterial;
        mat.opacity = opacity * (0.5 + 0.5 * Math.sin(t * 2 + rays[i]!.phase));
        mesh.scale.y = 0.7 + opacity * 1.4;
      });
    }
  });

  return (
    <group ref={group}>
      {rays.map((r) => (
        <mesh key={r.key} rotation={[0, 0, r.rot]}>
          <planeGeometry args={[r.width, r.len]} />
          <meshBasicMaterial
            color={r.key % 2 === 0 ? "#4AF2C8" : "#6B8CFF"}
            transparent
            opacity={0}
            blending={AdditiveBlending}
            depthWrite={false}
            side={DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
