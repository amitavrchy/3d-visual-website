"use client";

import {
  Bloom,
  EffectComposer,
  SMAA,
  Vignette,
} from "@react-three/postprocessing";
import { useAppSelector } from "@/store/hooks";

export function SolarEffects() {
  const quality = useAppSelector((s) => s.sceneUi.quality);

  if (quality === "low") return null;

  return (
    <EffectComposer multisampling={quality === "high" ? 4 : 0} enableNormalPass={false}>
      <Bloom
        intensity={1.35}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette offset={0.25} darkness={0.6} />
      <SMAA />
    </EffectComposer>
  );
}
