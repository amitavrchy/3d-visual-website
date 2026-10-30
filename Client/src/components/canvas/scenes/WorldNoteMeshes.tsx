"use client";

import { Float } from "@react-three/drei";
import { useQuery } from "@tanstack/react-query";
import { fetchWorldNotes } from "@/lib/api";
import { FALLBACK_NOTES } from "@/lib/fallback-data";

/** Colored floating chips in the atrium — labels live in the HTML contact flow. */
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
      {notes.slice(0, 8).map((note) => (
        <Float
          key={note.id}
          speed={1}
          floatIntensity={0.4}
          rotationIntensity={0.2}
          position={[note.x, note.y, note.z]}
        >
          <mesh>
            <boxGeometry args={[0.32, 0.2, 0.04]} />
            <meshStandardMaterial
              color={note.color}
              emissive={note.color}
              emissiveIntensity={0.45}
              metalness={0.25}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.26, 0.08]} />
            <meshBasicMaterial color="#050508" transparent opacity={0.45} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
