"use client";

import { Environment } from "@react-three/drei";
import { useAppSelector } from "@/store/hooks";

export function StudioLighting() {
  const quality = useAppSelector((s) => s.sceneUi.quality);
  const shadows = quality !== "low";

  return (
    <>
      <ambientLight intensity={0.35} color="#9AA3B5" />
      <directionalLight
        castShadow={shadows}
        position={[4.5, 8, 3]}
        intensity={1.35}
        color="#F3F4F7"
        shadow-mapSize-width={quality === "high" ? 1024 : 512}
        shadow-mapSize-height={quality === "high" ? 1024 : 512}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-3, 2.5, -2]} intensity={0.8} color="#4AF2C8" />
      <pointLight position={[2.5, 1.2, 3]} intensity={0.55} color="#6B8CFF" />
      {quality === "high" ? (
        <Environment preset="city" environmentIntensity={0.35} />
      ) : null}
    </>
  );
}
