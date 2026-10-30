"use client";

import { Environment } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { OriginEffects } from "./OriginEffects";
import { CrystalFormation } from "./shaders/CrystalFormation";
import { GalaxyField } from "./shaders/GalaxyField";
import { IridescentBlob } from "./shaders/IridescentBlob";
import { LightRays } from "./shaders/LightRays";
import { VoidParticles } from "./shaders/VoidParticles";

export function OriginScene() {
  return (
    <>
      <color attach="background" args={["#03040a"]} />
      <fog attach="fog" args={["#03040a", 8, 28]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 4, 2]} intensity={1.4} color="#4AF2C8" />
      <pointLight position={[-4, 1, -2]} intensity={0.9} color="#6B8CFF" />
      <pointLight position={[0, -2, 3]} intensity={0.55} color="#FF5C7A" />
      <Environment preset="night" environmentIntensity={0.35} />

      <VoidParticles />
      <IridescentBlob />
      <LightRays />
      <GalaxyField />
      <CrystalFormation />

      <CameraRig />
      <OriginEffects />
    </>
  );
}
