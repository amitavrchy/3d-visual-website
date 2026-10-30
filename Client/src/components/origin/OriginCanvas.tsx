"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useAppSelector } from "@/store/hooks";
import { OriginScene } from "./OriginScene";

export function OriginCanvas() {
  const quality = useAppSelector((s) => s.sceneUi.quality);
  const dpr: [number, number] =
    quality === "low" ? [1, 1] : quality === "med" ? [1, 1.5] : [1, 2];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: quality !== "low",
          powerPreference: "high-performance",
          alpha: false,
        }}
        camera={{ position: [0, 0.2, 8.5], fov: 42, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#03040a");
        }}
      >
        <Suspense fallback={null}>
          <OriginScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
