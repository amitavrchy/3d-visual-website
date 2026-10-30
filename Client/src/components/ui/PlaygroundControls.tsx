"use client";

import { updatePlayground } from "@/features/sceneUi/sceneUiSlice";
import { setBloom } from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function PlaygroundControls() {
  const dispatch = useAppDispatch();
  const playground = useAppSelector((s) => s.sceneUi.playground);
  const bloom = useAppSelector((s) => s.sceneUi.bloom);

  return (
    <aside className="glass-panel absolute bottom-4 right-4 z-40 w-[min(100%,320px)] rounded-lg p-4 md:bottom-6 md:right-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Controls</p>
        <span className="text-[14px] text-[#9AA3B5]">Live</span>
      </div>

      <label className="mb-3 block text-[14px] text-[#F3F4F7]">
        Surface color
        <input
          type="color"
          value={playground.color}
          onChange={(e) => dispatch(updatePlayground({ color: e.target.value }))}
          className="mt-1.5 h-11 w-full cursor-pointer rounded border border-[#22263A] bg-transparent"
        />
      </label>

      {(
        [
          ["metalness", playground.metalness, "Metalness"],
          ["roughness", playground.roughness, "Roughness"],
        ] as const
      ).map(([key, value, label]) => (
        <label key={key} className="mb-3 block text-[14px] text-[#F3F4F7]">
          <span className="flex justify-between">
            <span>{label}</span>
            <span className="font-mono text-[#9AA3B5]">{value.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={(e) =>
              dispatch(updatePlayground({ [key]: Number(e.target.value) }))
            }
            className="mt-1.5 w-full accent-[#4AF2C8]"
          />
        </label>
      ))}

      <label className="mb-3 block text-[14px] text-[#F3F4F7]">
        <span className="flex justify-between">
          <span>Particle density</span>
          <span className="font-mono text-[#9AA3B5]">
            {playground.particleDensity}
          </span>
        </span>
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
          className="mt-1.5 w-full accent-[#6B8CFF]"
        />
      </label>

      <div className="space-y-2 border-t border-[#22263A] pt-3">
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
        <label className="flex items-center justify-between text-[14px] text-[#F3F4F7]">
          Bloom
          <input
            type="checkbox"
            checked={bloom}
            onChange={(e) => dispatch(setBloom(e.target.checked))}
            className="h-4 w-4 accent-[#4AF2C8]"
          />
        </label>
      </div>
    </aside>
  );
}
