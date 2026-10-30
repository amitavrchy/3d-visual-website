"use client";

import { BackSide } from "three";
import { useProgressiveTexture } from "@/hooks/useProgressiveTexture";

export function Starfield() {
  const map = useProgressiveTexture("/textures/sky/2k_stars_milky_way.webp", { preview: null });
  return (
    <mesh>
      <sphereGeometry args={[90, 32, 32]} />
      <meshBasicMaterial
        map={map ?? undefined}
        color={map ? "#ffffff" : "#07071a"}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
