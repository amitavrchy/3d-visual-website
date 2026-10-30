"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, InstancedMesh, Object3D } from "three";

const COUNT = 420;
const dummy = new Object3D();

export function AsteroidBelt() {
  const mesh = useRef<InstancedMesh>(null);
  const seeds = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      r: 10.6 + Math.random() * 1.8,
      a: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 0.35,
      s: 0.015 + Math.random() * 0.045,
      speed: 0.04 + Math.random() * 0.08,
      tilt: Math.random() * Math.PI,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i]!;
      s.a += delta * s.speed;
      dummy.position.set(Math.cos(s.a) * s.r, s.y, Math.sin(s.a) * s.r);
      dummy.rotation.set(s.tilt, s.a, s.tilt * 0.5);
      dummy.scale.setScalar(s.s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={new Color("#8a7f72")} roughness={0.9} metalness={0.15} />
    </instancedMesh>
  );
}
