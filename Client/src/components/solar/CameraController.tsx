"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { PLANETS } from "@/lib/planets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFlying } from "@/features/solar/solarSlice";

const homePos = new Vector3(0, 11, 22);
const homeLook = new Vector3(0, 0, 0);
const tmp = new Vector3();
const look = new Vector3();

type AngleMap = Record<string, React.MutableRefObject<number>>;

export function CameraController({ angles }: { angles: AngleMap }) {
  const { camera } = useThree();
  const focus = useAppSelector((s) => s.solar.focus);
  const flying = useAppSelector((s) => s.solar.flying);
  const dispatch = useAppDispatch();
  const progress = useRef(0);
  const fromPos = useRef(new Vector3());
  const fromLook = useRef(new Vector3());
  const targetPos = useRef(new Vector3());
  const targetLook = useRef(new Vector3());
  const active = useRef(false);

  useEffect(() => {
    camera.position.copy(homePos);
    camera.lookAt(homeLook);
  }, [camera]);

  useEffect(() => {
    if (!flying || !focus) return;
    const planet = PLANETS.find((p) => p.slug === focus);
    if (!planet) return;
    const a = angles[focus]?.current ?? 0;
    const px = Math.cos(a) * planet.orbitRadius;
    const pz = Math.sin(a) * planet.orbitRadius;
    fromPos.current.copy(camera.position);
    fromLook.current.set(0, 0, 0);
    targetLook.current.set(px, 0, pz);
    // Approach from slightly above and outside
    const dir = new Vector3(px, 0, pz).normalize();
    targetPos.current.set(
      px + dir.x * planet.size * 4.5,
      planet.size * 2.2 + 1.2,
      pz + dir.z * planet.size * 4.5,
    );
    progress.current = 0;
    active.current = true;
  }, [flying, focus, angles, camera]);

  useFrame((_, delta) => {
    if (!active.current) {
      if (!flying) {
        // gentle idle drift toward home
        camera.position.x = MathUtils.damp(camera.position.x, homePos.x, 1.2, delta);
        camera.position.y = MathUtils.damp(camera.position.y, homePos.y, 1.2, delta);
        camera.position.z = MathUtils.damp(camera.position.z, homePos.z, 1.2, delta);
        camera.lookAt(homeLook);
      }
      return;
    }
    progress.current = Math.min(1, progress.current + delta * 0.75);
    const t = progress.current;
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    tmp.copy(fromPos.current).lerp(targetPos.current, e);
    camera.position.copy(tmp);
    look.copy(fromLook.current).lerp(targetLook.current, e);
    camera.lookAt(look);
    if (t >= 1) {
      active.current = false;
      dispatch(setFlying(false));
    }
  });

  return null;
}
