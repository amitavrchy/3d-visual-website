"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo } from "react";
import { Vector2 } from "three";
import { useAppSelector } from "@/store/hooks";

export function OriginEffects() {
  const quality = useAppSelector((s) => s.sceneUi.quality);
  const bloom = useAppSelector((s) => s.sceneUi.bloom);
  const offset = useMemo(() => new Vector2(0.0009, 0.0009), []);

  if (quality === "low") return null;

  return (
    <EffectComposer
      multisampling={quality === "high" ? 4 : 0}
      enableNormalPass={false}
    >
      <Bloom
        intensity={bloom ? (quality === "high" ? 1.15 : 0.85) : 0}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
        radialModulation
        modulationOffset={0.35}
      />
      <Noise opacity={0.035} premultiply />
      <Vignette offset={0.22} darkness={0.65} />
    </EffectComposer>
  );
}
