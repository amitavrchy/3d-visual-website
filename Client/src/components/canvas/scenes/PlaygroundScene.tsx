"use client";

import { Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { useAppSelector } from "@/store/hooks";

export function PlaygroundScene() {
  const mesh = useRef<Mesh>(null);
  const { playground } = useAppSelector((s) => s.sceneUi);

  useFrame((_, delta) => {
    if (mesh.current && playground.autoRotate) {
      mesh.current.rotation.y += delta * 0.45;
      mesh.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial color="#0B0C12" roughness={1} />
      </mesh>
      <Float speed={1.2} floatIntensity={0.4}>
        <mesh ref={mesh} position={[0, 1.15, 0]} castShadow>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial
            color={playground.color}
            metalness={playground.metalness}
            roughness={playground.roughness}
            emissive={playground.color}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>
      <Sparkles
        count={Math.max(40, Math.floor(playground.particleDensity / 4))}
        scale={5}
        size={2.5}
        speed={0.4}
        color={playground.color}
      />
    </group>
  );
}
