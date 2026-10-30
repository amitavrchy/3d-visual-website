"use client";

import { PlaygroundScene } from "@/components/canvas/scenes/PlaygroundScene";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { PlaygroundControls } from "@/components/ui/PlaygroundControls";
import { QualityPanel } from "@/components/ui/QualityPanel";
import { updatePlayground } from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch } from "@/store/hooks";

const PRESETS = [
  {
    name: "Signal",
    color: "#4AF2C8",
    metalness: 0.72,
    roughness: 0.18,
    particleDensity: 420,
  },
  {
    name: "Orbit",
    color: "#6B8CFF",
    metalness: 0.9,
    roughness: 0.12,
    particleDensity: 680,
  },
  {
    name: "Ember",
    color: "#FF5C7A",
    metalness: 0.45,
    roughness: 0.35,
    particleDensity: 280,
  },
];

export default function PlaygroundPage() {
  const dispatch = useAppDispatch();

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <DynamicCanvas cameraPosition={[2.4, 1.9, 4.8]} fov={38}>
        <PlaygroundScene />
      </DynamicCanvas>

      <div className="pointer-events-none absolute left-5 top-24 z-30 max-w-md md:left-8 md:top-28">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Material lab</p>
        <h1 className="display-font mt-2 text-[36px] font-semibold leading-tight md:text-[48px]">
          Tune the finish live
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#9AA3B5]">
          Same controls we ship to clients — metalness, roughness, particles,
          bloom. State lives in Redux so the UI and scene stay in sync.
        </p>
        <div className="pointer-events-auto mt-5 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() =>
                dispatch(
                  updatePlayground({
                    color: preset.color,
                    metalness: preset.metalness,
                    roughness: preset.roughness,
                    particleDensity: preset.particleDensity,
                    autoRotate: true,
                  }),
                )
              }
              className="rounded border border-[#F3F4F7]/15 px-3 py-2 text-[14px] text-[#F3F4F7] transition hover:border-[#4AF2C8] hover:text-[#4AF2C8]"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <QualityPanel compact />
      <PlaygroundControls />
    </section>
  );
}
