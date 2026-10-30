"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Color,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
} from "three";
import { scrollState } from "@/lib/scrollState";

function localProgress(p: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (p - a) / Math.max(1e-6, b - a)));
}

const vert = /* glsl */ `
uniform float uTime;
uniform float uDisplace;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  float n = snoise(position * 1.35 + uTime * 0.35);
  float n2 = snoise(position * 2.4 - uTime * 0.22);
  float d = n * 0.22 + n2 * 0.08;
  vec3 pos = position + normal * d * uDisplace;
  vNoise = d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vView = -mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const frag = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.8);
  float band = 0.5 + 0.5 * sin(vNoise * 12.0 + uTime * 1.4 + fresnel * 4.0);
  vec3 irid = mix(uColorA, uColorB, band);
  irid = mix(irid, uColorC, fresnel);
  float glow = fresnel * 1.4 + abs(vNoise) * 0.6;
  vec3 col = irid * (0.55 + glow) * uIntensity;
  col += fresnel * vec3(0.85, 0.95, 1.0) * 0.55;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function IridescentBlob() {
  const mesh = useRef<Mesh>(null);
  const mat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDisplace: { value: 0 },
        uIntensity: { value: 0.2 },
        uColorA: { value: new Color("#4AF2C8") },
        uColorB: { value: new Color("#6B8CFF") },
        uColorC: { value: new Color("#FF5C7A") },
      },
      vertexShader: vert,
      fragmentShader: frag,
    });
  }, []);

  const geo = useMemo(() => new IcosahedronGeometry(1, 64), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;
    mat.uniforms.uTime!.value = t;

    // Appear in spark, peak ignition, shrink into crystal
    let scale = 0;
    let displace = 0;
    let intensity = 0.15;
    if (p < 0.14) {
      scale = 0.05 + p * 0.4;
      displace = 0.15;
      intensity = 0.12;
    } else if (p < 0.3) {
      const l = localProgress(p, 0.14, 0.3);
      scale = 0.35 + l * 0.85;
      displace = 0.55 + l * 0.9;
      intensity = 0.35 + l * 0.7;
    } else if (p < 0.48) {
      const l = localProgress(p, 0.3, 0.48);
      scale = 1.2 + Math.sin(l * Math.PI) * 0.55;
      displace = 1.5 - l * 0.5;
      intensity = 1.4 + l * 0.8;
    } else if (p < 0.66) {
      const l = localProgress(p, 0.48, 0.66);
      scale = 1.1 - l * 0.55;
      displace = 0.9 - l * 0.4;
      intensity = 1.0 - l * 0.35;
    } else if (p < 0.84) {
      const l = localProgress(p, 0.66, 0.84);
      scale = 0.55 - l * 0.15;
      displace = 0.35;
      intensity = 0.55;
    } else {
      const l = localProgress(p, 0.84, 1);
      scale = 0.4 + l * 0.15;
      displace = 0.25 + Math.sin(t) * 0.05;
      intensity = 0.7 + l * 0.2;
    }

    mat.uniforms.uDisplace!.value = displace;
    mat.uniforms.uIntensity!.value = intensity;
    if (mesh.current) {
      mesh.current.scale.setScalar(scale);
      mesh.current.rotation.y = t * 0.18;
      mesh.current.rotation.x = Math.sin(t * 0.35) * 0.15;
      mesh.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <mesh ref={mesh} geometry={geo} material={mat} position={[0, 0, 0]} />
  );
}
