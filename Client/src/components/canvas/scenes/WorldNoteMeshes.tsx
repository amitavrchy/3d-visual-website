"use client";

import { Float, Html } from "@react-three/drei";
import { useQuery } from "@tanstack/react-query";
import { fetchWorldNotes } from "@/lib/api";
import { FALLBACK_NOTES } from "@/lib/fallback-data";

export function WorldNoteMeshes() {
  const { data: notes = FALLBACK_NOTES } = useQuery({
    queryKey: ["world-notes"],
    queryFn: async () => {
      try {
        return await fetchWorldNotes();
      } catch {
        return FALLBACK_NOTES;
      }
    },
  });

  return (
    <group>
      {notes.map((note) => (
        <Float
          key={note.id}
          speed={1.1}
          floatIntensity={0.5}
          rotationIntensity={0.2}
          position={[note.x, note.y, note.z]}
        >
          <mesh>
            <boxGeometry args={[0.35, 0.22, 0.04]} />
            <meshStandardMaterial
              color={note.color}
              emissive={note.color}
              emissiveIntensity={0.4}
              metalness={0.2}
              roughness={0.4}
            />
          </mesh>
          <Html distanceFactor={7} position={[0, 0.28, 0]} center>
            <div className="max-w-[180px] rounded bg-[#0F1118]/92 px-2 py-1 text-[14px] text-[#F3F4F7]">
              <p className="mono-label mb-1 text-[14px] text-[#4AF2C8]">
                {note.author}
              </p>
              <p className="leading-snug">{note.message}</p>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  );
}
