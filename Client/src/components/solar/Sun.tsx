"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
  Color,
  DataTexture,
  Group,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
} from "three";
import { SUN } from "@/lib/planets";
import { useProgressiveTexture } from "@/hooks/useProgressiveTexture";

const coronaVert = /* glsl */ `
varying vec3 vNormal;
varying vec3 vWorldPos;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const coronaFrag = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vWorldPos;
void main(){
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.4);
  float pulse = 0.75 + 0.25 * sin(uTime * 1.6);
  vec3 col = uColor * fresnel * pulse;
  gl_FragColor = vec4(col, fresnel * 0.85);
}
`;

const surfaceVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
void main(){
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const surfaceFrag = /* glsl */ `
uniform sampler2D uMap;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i); float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main(){
  vec2 uv = vUv + vec2(uTime * 0.012, sin(uTime * 0.08) * 0.004);
  vec3 base = texture2D(uMap, uv).rgb;
  float n = noise(uv * 18.0 + uTime * 0.15);
  float n2 = noise(uv * 40.0 - uTime * 0.22);
  float flare = smoothstep(0.45, 0.95, n * 0.65 + n2 * 0.45);
  vec3 hot = vec3(1.0, 0.72, 0.25);
  vec3 core = vec3(1.0, 0.95, 0.7);
  vec3 col = mix(base * 1.15, hot, flare * 0.55);
  col = mix(col, core, pow(flare, 2.0) * 0.35);
  float rim = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 1.5);
  col += rim * vec3(1.0, 0.55, 0.1) * 0.25;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function Sun() {
  const group = useRef<Group>(null);
  const map = useProgressiveTexture(SUN.texture);
  const fallback = useMemo(() => {
    const data = new Uint8Array([255, 170, 60, 255]);
    const t = new DataTexture(data, 1, 1);
    t.colorSpace = SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);

  const surfaceMat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uMap: { value: fallback },
        uTime: { value: 0 },
      },
      vertexShader: surfaceVert,
      fragmentShader: surfaceFrag,
    });
  }, [fallback]);

  useEffect(() => {
    surfaceMat.uniforms.uMap!.value = map ?? fallback;
  }, [map, fallback, surfaceMat]);

  const coronaMat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color("#ff9a3c") },
      },
      vertexShader: coronaVert,
      fragmentShader: coronaFrag,
      transparent: true,
      depthWrite: false,
      side: BackSide,
      blending: AdditiveBlending,
    });
  }, []);

  const geo = useMemo(() => new SphereGeometry(1, 48, 48), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    surfaceMat.uniforms.uTime!.value = t;
    coronaMat.uniforms.uTime!.value = t;
    if (group.current) group.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={group}>
      <mesh geometry={geo} material={surfaceMat} scale={SUN.size} />
      <mesh geometry={geo} material={coronaMat} scale={SUN.size * 1.28} />
      <mesh scale={SUN.size * 1.55}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.08}
          depthWrite={false}
          side={BackSide}
        />
      </mesh>
      <pointLight color="#ffaa55" intensity={85} distance={80} decay={2} />
      <pointLight color="#ffe0a0" intensity={18} distance={30} decay={2} />
    </group>
  );
}
