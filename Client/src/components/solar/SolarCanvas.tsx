"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import { SolarSystem } from "./SolarSystem";

export function SolarCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        camera={{ position: [0, 11, 22], fov: 42, near: 0.1, far: 200 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#020208");
        }}
      >
        <Suspense fallback={null}>
          <SolarSystem />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
