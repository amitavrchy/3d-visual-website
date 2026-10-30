"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils, PerspectiveCamera, Vector2 } from "three";
import { getCameraSample } from "@/lib/cameraPath";
import { scrollState } from "@/lib/scrollState";

export function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef(new Vector2(0, 0));
  const targetMouse = useRef(new Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    mouse.current.x = MathUtils.damp(
      mouse.current.x,
      targetMouse.current.x,
      4,
      delta,
    );
    mouse.current.y = MathUtils.damp(
      mouse.current.y,
      targetMouse.current.y,
      4,
      delta,
    );
    const sample = getCameraSample(
      scrollState.progress,
      mouse.current.x,
      mouse.current.y,
    );
    camera.position.lerp(sample.position, 1 - Math.exp(-3.2 * delta));
    camera.lookAt(sample.lookAt);
    const persp = camera as PerspectiveCamera;
    if (persp.isPerspectiveCamera) {
      persp.fov = MathUtils.damp(persp.fov, sample.fov, 3, delta);
      persp.updateProjectionMatrix();
    }
  });

  return null;
}
