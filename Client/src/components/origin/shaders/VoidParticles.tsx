"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
} from "three";
import { scrollState } from "@/lib/scrollState";

const COUNT = 1200;

const vert = /* glsl */ `
uniform float uTime;
uniform float uAlpha;
attribute float aSeed;
varying float vA;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.25 + aSeed * 40.0) * 0.15;
  p.x += cos(uTime * 0.18 + aSeed * 20.0) * 0.08;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.2 + aSeed * 2.5) * (180.0 / -mv.z);
  vA = uAlpha * (0.35 + aSeed * 0.65);
}
`;

const frag = /* glsl */ `
varying float vA;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float s = smoothstep(0.5, 0.0, d);
  if (s < 0.02) discard;
  gl_FragColor = vec4(0.72, 0.78, 0.95, s * vA);
}
`;

export function VoidParticles() {
  const ref = useRef<Points>(null);
  const { geo, mat } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
      seeds[i] = Math.random();
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(pos, 3));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    const material = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uAlpha: { value: 1 } },
      vertexShader: vert,
      fragmentShader: frag,
    });
    return { geo: geometry, mat: material };
  }, []);

  useFrame((state) => {
    mat.uniforms.uTime!.value = state.clock.elapsedTime;
    const p = scrollState.progress;
    mat.uniforms.uAlpha!.value = Math.max(0, 1 - p / 0.28) * 0.85;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}
