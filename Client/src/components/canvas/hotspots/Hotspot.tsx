"use client";

import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { setSelectedHotspot } from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch } from "@/store/hooks";

type HotspotProps = {
  id: string;
  label: string;
  hint?: string;
  href: string;
  position: [number, number, number];
};

export function Hotspot({ id, label, hint, href, position }: HotspotProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);
  const ring = useRef<Mesh>(null);

  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * (hovered ? 1.4 : 0.5);
      const s = hovered ? 1.15 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ring.current.scale.setScalar(s);
    }
  });

  const activate = () => {
    dispatch(setSelectedHotspot(id));
    router.push(href);
  };

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          activate();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.16, 28, 28]} />
        <meshStandardMaterial
          color={hovered ? "#4AF2C8" : "#6B8CFF"}
          emissive={hovered ? "#4AF2C8" : "#6B8CFF"}
          emissiveIntensity={hovered ? 1.6 : 0.85}
          roughness={0.2}
          metalness={0.45}
        />
      </mesh>

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.26, 0.32, 48]} />
        <meshBasicMaterial
          color="#4AF2C8"
          transparent
          opacity={hovered ? 0.9 : 0.5}
        />
      </mesh>

      <Billboard position={[0, 0.48, 0]}>
        <Text
          fontSize={0.16}
          color="#F3F4F7"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#050508"
        >
          {label}
        </Text>
        {hint ? (
          <Text
            position={[0, -0.18, 0]}
            fontSize={0.1}
            color="#9AA3B5"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.008}
            outlineColor="#050508"
          >
            {hint}
          </Text>
        ) : null}
      </Billboard>
    </group>
  );
}
