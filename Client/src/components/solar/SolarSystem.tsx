"use client";

import { useMemo, useRef } from "react";
import { PLANETS } from "@/lib/planets";
import { AsteroidBelt } from "./AsteroidBelt";
import { CameraController } from "./CameraController";
import { OrbitRing } from "./OrbitRing";
import { PlanetBody } from "./PlanetBody";
import { SolarEffects } from "./SolarEffects";
import { Starfield } from "./Starfield";
import { Sun } from "./Sun";
import { useAppSelector } from "@/store/hooks";

export function SolarSystem() {
  const hovered = useAppSelector((s) => s.solar.hovered);
  const angles = useMemo(() => {
    const map: Record<string, React.MutableRefObject<number>> = {};
    for (const p of PLANETS) {
      map[p.slug] = { current: Math.random() * Math.PI * 2 };
    }
    return map;
  }, []);

  // Keep stable refs for each planet
  const angleRefs = useRef(angles);

  return (
    <>
      <color attach="background" args={["#020208"]} />
      <ambientLight intensity={0.12} />
      <hemisphereLight args={["#8899cc", "#050508", 0.35]} />
      <Starfield />
      <Sun />
      {PLANETS.map((p) => (
        <OrbitRing key={`orbit-${p.slug}`} radius={p.orbitRadius} active={hovered === p.slug} />
      ))}
      {PLANETS.map((p) => (
        <PlanetBody key={p.slug} data={p} angleRef={angleRefs.current[p.slug]!} />
      ))}
      <AsteroidBelt />
      <CameraController angles={angleRefs.current} />
      <SolarEffects />
    </>
  );
}
