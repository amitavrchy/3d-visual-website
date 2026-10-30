"use client";

import { Canvas } from "@react-three/fiber";
import { SolarSystem } from "./SolarSystem";

export function SolarCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
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
        <SolarSystem />
      </Canvas>
    </div>
  );
}
