"use client";

import { CameraControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import { StudioLighting } from "./lights/StudioLighting";
import { Effects } from "./post/Effects";

type AppCanvasProps = {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
};

export function AppCanvas({
  children,
  cameraPosition = [0, 2.2, 7],
  fov = 42,
}: AppCanvasProps) {
  const quality = useAppSelector((s) => s.sceneUi.quality);
  const dpr: [number, number] =
    quality === "low" ? [1, 1] : quality === "med" ? [1, 1.5] : [1, 2];

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        dpr={dpr}
        shadows={quality !== "low"}
        gl={{ antialias: quality !== "low", powerPreference: "high-performance" }}
        camera={{ position: cameraPosition, fov, near: 0.1, far: 80 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050508");
        }}
      >
        <Suspense fallback={null}>
          <StudioLighting />
          {children}
          <Effects />
          <CameraControls
            makeDefault
            minDistance={3}
            maxDistance={14}
            maxPolarAngle={Math.PI * 0.49}
            smoothTime={0.35}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
