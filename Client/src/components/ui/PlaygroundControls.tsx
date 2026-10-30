"use client";

import { updatePlayground } from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function PlaygroundControls() {
  const dispatch = useAppDispatch();
  const playground = useAppSelector((s) => s.sceneUi.playground);

  return (
    <aside className="glass-panel absolute bottom-4 right-4 z-40 w-[min(100%,320px)] rounded-lg p-4 md:bottom-6 md:right-6">
      <p className="mono-label mb-3 text-[14px] text-[#4AF2C8]">Material lab</p>
      <label className="mb-3 block text-[14px] text-[#F3F4F7]">
        Color
        <input
          type="color"
          value={playground.color}
          onChange={(e) => dispatch(updatePlayground({ color: e.target.value }))}
          className="mt-1 h-10 w-full cursor-pointer rounded border border-[#22263A] bg-transparent"
        />
      </label>
      {(
        [
          ["metalness", playground.metalness],
          ["roughness", playground.roughness],
        ] as const
      ).map(([key, value]) => (
        <label key={key} className="mb-3 block text-[14px] capitalize text-[#F3F4F7]">
          {key}: {value.toFixed(2)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={(e) =>
              dispatch(updatePlayground({ [key]: Number(e.target.value) }))
            }
            className="mt-1 w-full accent-[#4AF2C8]"
          />
        </label>
      ))}
      <label className="mb-3 block text-[14px] text-[#F3F4F7]">
        Particles: {playground.particleDensity}
        <input
          type="range"
          min={80}
          max={1200}
          step={20}
          value={playground.particleDensity}
          onChange={(e) =>
            dispatch(
              updatePlayground({ particleDensity: Number(e.target.value) }),
            )
          }
          className="mt-1 w-full accent-[#6B8CFF]"
        />
      </label>
      <label className="flex items-center justify-between text-[14px] text-[#F3F4F7]">
        Auto rotate
        <input
          type="checkbox"
          checked={playground.autoRotate}
          onChange={(e) =>
            dispatch(updatePlayground({ autoRotate: e.target.checked }))
          }
          className="h-4 w-4 accent-[#4AF2C8]"
        />
      </label>
    </aside>
  );
}
