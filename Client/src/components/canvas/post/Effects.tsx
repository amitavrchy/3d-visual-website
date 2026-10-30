"use client";

import {
  Bloom,
  EffectComposer,
  SMAA,
  Vignette,
} from "@react-three/postprocessing";
import { useAppSelector } from "@/store/hooks";

export function Effects() {
  const { quality, bloom, exposure } = useAppSelector((s) => s.sceneUi);

  if (quality === "low") return null;

  return (
    <EffectComposer multisampling={quality === "high" ? 4 : 0} enableNormalPass={false}>
      <Bloom
        intensity={bloom ? 0.55 * exposure : 0}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.35}
        mipmapBlur
      />
      <Vignette offset={0.28} darkness={0.55} />
      <SMAA />
    </EffectComposer>
  );
}
