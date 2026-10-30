"use client";

import { useTexture } from "@react-three/drei";
import { BackSide } from "three";

export function Starfield() {
  const map = useTexture("/textures/sky/2k_stars_milky_way.jpg");
  return (
    <mesh>
      <sphereGeometry args={[90, 64, 64]} />
      <meshBasicMaterial map={map} side={BackSide} depthWrite={false} />
    </mesh>
  );
}
