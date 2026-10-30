"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [heavy, setHeavy] = useState(false);
  const angles = useMemo(() => {
    const map: Record<string, React.MutableRefObject<number>> = {};
    for (const p of PLANETS) {
      map[p.slug] = { current: Math.random() * Math.PI * 2 };
    }
    return map;
  }, []);

  const angleRefs = useRef(angles);

  useEffect(() => {
    let cancelled = false;
    const arm = () => {
      if (!cancelled) setHeavy(true);
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    let id: number;
    if (typeof ric === "function") {
      id = ric(arm, { timeout: 900 });
    } else {
      id = window.setTimeout(arm, 350) as unknown as number;
    }
    return () => {
      cancelled = true;
      if (typeof ric === "function" && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback: (n: number) => void }).cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

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
      {heavy && <AsteroidBelt />}
      <CameraController angles={angleRefs.current} />
      {heavy && <SolarEffects />}
    </>
  );
}
