"use client";

import { Html } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setSelectedHotspot } from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch } from "@/store/hooks";

type HotspotProps = {
  id: string;
  label: string;
  href: string;
  position: [number, number, number];
};

export function Hotspot({ id, label, href, position }: HotspotProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);

  const activate = () => {
    dispatch(setSelectedHotspot(id));
    router.push(href);
  };

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          activate();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={hovered ? "#4AF2C8" : "#6B8CFF"}
          emissive={hovered ? "#4AF2C8" : "#6B8CFF"}
          emissiveIntensity={hovered ? 1.4 : 0.7}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.34, 48]} />
        <meshBasicMaterial color="#4AF2C8" transparent opacity={0.55} />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <span className="mono-label whitespace-nowrap rounded bg-[#0F1118]/90 px-2 py-1 text-[14px] text-[#F3F4F7]">
          {label}
        </span>
      </Html>
    </group>
  );
}
