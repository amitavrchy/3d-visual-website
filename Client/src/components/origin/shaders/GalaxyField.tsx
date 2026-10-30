"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
} from "three";
import { scrollState } from "@/lib/scrollState";

const COUNT = 4500;

const vert = /* glsl */ `
uniform float uTime;
uniform float uProgress;
attribute float aSize;
attribute float aSeed;
varying float vAlpha;
varying vec3 vColor;

void main(){
  float ang = aSeed * 6.2831 + uTime * (0.05 + aSeed * 0.08);
  float radius = length(position.xz);
  float arms = 3.0;
  float twist = ang + radius * 0.55 * arms;
  vec3 p = position;
  p.x = cos(twist) * radius;
  p.z = sin(twist) * radius;
  p.y += sin(uTime * 0.4 + aSeed * 20.0) * 0.08;

  // Pull inward during crystal / awaken
  float pull = smoothstep(0.48, 0.9, uProgress);
  p *= mix(1.0, 0.35, pull * 0.7);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float sizeBoost = mix(1.0, 1.8, smoothstep(0.3, 0.55, uProgress));
  gl_PointSize = aSize * sizeBoost * (220.0 / -mv.z);
  vAlpha = mix(0.0, 1.0, smoothstep(0.35, 0.55, uProgress)) *
           mix(1.0, 0.25, smoothstep(0.75, 0.95, uProgress));
  float hue = fract(aSeed + radius * 0.08);
  vColor = mix(vec3(0.29, 0.95, 0.78), vec3(0.42, 0.55, 1.0), hue);
  vColor = mix(vColor, vec3(1.0, 0.36, 0.48), smoothstep(0.6, 1.2, radius) * 0.35);
}
`;

const frag = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float soft = smoothstep(0.5, 0.0, d);
  if (soft < 0.01) discard;
  gl_FragColor = vec4(vColor, soft * vAlpha);
}
`;

export function GalaxyField() {
  const points = useRef<Points>(null);
  const { geo, mat } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.55) * 4.2;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.55 * (1 - r / 5);
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(a) * r;
      sizes[i] = 0.6 + Math.random() * 2.2;
      seeds[i] = Math.random();
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    const material = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: vert,
      fragmentShader: frag,
    });
    return { geo: geometry, mat: material };
  }, []);

  useFrame((state) => {
    mat.uniforms.uTime!.value = state.clock.elapsedTime;
    mat.uniforms.uProgress!.value = scrollState.progress;
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return <points ref={points} geometry={geo} material={mat} />;
}
