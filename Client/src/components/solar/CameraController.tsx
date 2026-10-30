"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { PLANETS } from "@/lib/planets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPhase } from "@/features/solar/solarSlice";

const homePos = new Vector3(0, 11, 22);
const homeLook = new Vector3(0, 0, 0);
const tmp = new Vector3();
const look = new Vector3();
const planetPos = new Vector3();

type AngleMap = Record<string, React.MutableRefObject<number>>;

export function CameraController({ angles }: { angles: AngleMap }) {
  const { camera } = useThree();
  const focus = useAppSelector((s) => s.solar.focus);
  const phase = useAppSelector((s) => s.solar.phase);
  const dispatch = useAppDispatch();

  const progress = useRef(0);
  const fromPos = useRef(new Vector3());
  const fromLook = useRef(new Vector3());
  const midPos = useRef(new Vector3());
  const closePos = useRef(new Vector3());
  const targetLook = useRef(new Vector3());
  const stage = useRef<"idle" | "approach" | "zoom" | "hold">("idle");
  const holdLook = useRef(new Vector3());
  const holdPos = useRef(new Vector3());

  useEffect(() => {
    if (phase === "idle" && stage.current === "idle") {
      camera.position.copy(homePos);
      camera.lookAt(homeLook);
    }
  }, [camera, phase]);

  useEffect(() => {
    if (phase !== "approaching" || !focus) return;
    const planet = PLANETS.find((p) => p.slug === focus);
    if (!planet) return;
    const a = angles[focus]?.current ?? 0;
    const px = Math.cos(a) * planet.orbitRadius;
    const pz = Math.sin(a) * planet.orbitRadius;
    planetPos.set(px, 0, pz);
    fromPos.current.copy(camera.position);
    fromLook.current.set(0, 0, 0);
    targetLook.current.copy(planetPos);

    const dir = planetPos.clone().normalize();
    // Mid: nice overview of planet
    midPos.current.set(
      px + dir.x * planet.size * 5.2,
      planet.size * 1.8 + 0.9,
      pz + dir.z * planet.size * 5.2,
    );
    // Close: planet nearly fills frame (hero-matching framing)
    closePos.current.set(
      px + dir.x * planet.size * 2.15,
      planet.size * 0.35,
      pz + dir.z * planet.size * 2.15,
    );

    progress.current = 0;
    stage.current = "approach";
  }, [phase, focus, angles, camera]);

  useFrame((_, delta) => {
    // Keep locked on planet during hold/cover — never snap home
    if (stage.current === "hold") {
      camera.position.copy(holdPos.current);
      camera.lookAt(holdLook.current);
      return;
    }

    if (stage.current === "idle") {
      if (phase === "idle") {
        camera.position.x = MathUtils.damp(camera.position.x, homePos.x, 1.2, delta);
        camera.position.y = MathUtils.damp(camera.position.y, homePos.y, 1.2, delta);
        camera.position.z = MathUtils.damp(camera.position.z, homePos.z, 1.2, delta);
        camera.lookAt(homeLook);
      }
      return;
    }

    if (stage.current === "approach") {
      progress.current = Math.min(1, progress.current + delta * 0.85);
      const t = progress.current;
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      tmp.copy(fromPos.current).lerp(midPos.current, e);
      camera.position.copy(tmp);
      look.copy(fromLook.current).lerp(targetLook.current, e);
      camera.lookAt(look);
      if (t >= 1) {
        stage.current = "zoom";
        progress.current = 0;
        fromPos.current.copy(camera.position);
        fromLook.current.copy(targetLook.current);
        dispatch(setPhase("zooming"));
      }
      return;
    }

    if (stage.current === "zoom") {
      progress.current = Math.min(1, progress.current + delta * 1.15);
      const t = progress.current;
      const e = t * t * (3 - 2 * t);
      tmp.copy(fromPos.current).lerp(closePos.current, e);
      camera.position.copy(tmp);
      camera.lookAt(targetLook.current);
      if (t >= 1) {
        holdPos.current.copy(closePos.current);
        holdLook.current.copy(targetLook.current);
        stage.current = "hold";
        dispatch(setPhase("covering"));
      }
    }
  });

  // Reset stage when transition fully cleared
  useEffect(() => {
    if (phase === "idle") {
      stage.current = "idle";
    }
  }, [phase]);

  return null;
}
