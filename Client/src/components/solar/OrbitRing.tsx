"use client";

type OrbitRingProps = {
  radius: number;
  active?: boolean;
};

export function OrbitRing({ radius, active }: OrbitRingProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
      <meshBasicMaterial
        color={active ? "#4AF2C8" : "#3a4058"}
        transparent
        opacity={active ? 0.55 : 0.22}
        depthWrite={false}
      />
    </mesh>
  );
}
