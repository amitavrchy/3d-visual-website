"use client";

import { setBloom, setPrefer2d, setQuality, type Quality } from "@/features/sceneUi/sceneUiSlice";
import { cn } from "@/lib/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const QUALITIES: Quality[] = ["low", "med", "high"];

export function QualityPanel() {
  const dispatch = useAppDispatch();
  const { quality, bloom, prefer2d } = useAppSelector((s) => s.sceneUi);

  return (
    <aside className="glass-panel pointer-events-auto absolute bottom-4 left-4 z-40 w-[min(100%,280px)] rounded-lg p-3 md:bottom-6 md:left-6">
      <p className="mono-label mb-2 text-[14px] text-[#9AA3B5]">Quality</p>
      <div className="mb-3 flex gap-1">
        {QUALITIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => dispatch(setQuality(q))}
            className={cn(
              "flex-1 rounded px-2 py-1.5 text-[14px] capitalize transition-colors",
              quality === q
                ? "bg-[#4AF2C8] text-[#050508]"
                : "bg-[#22263A] text-[#F3F4F7] hover:bg-[#2c3148]",
            )}
          >
            {q}
          </button>
        ))}
      </div>
      <label className="mb-2 flex items-center justify-between gap-2 text-[14px] text-[#F3F4F7]">
        <span>Bloom</span>
        <input
          type="checkbox"
          checked={bloom}
          disabled={quality === "low"}
          onChange={(e) => dispatch(setBloom(e.target.checked))}
          className="h-4 w-4 accent-[#4AF2C8]"
        />
      </label>
      <label className="flex items-center justify-between gap-2 text-[14px] text-[#F3F4F7]">
        <span>Prefer 2D</span>
        <input
          type="checkbox"
          checked={prefer2d}
          onChange={(e) => dispatch(setPrefer2d(e.target.checked))}
          className="h-4 w-4 accent-[#4AF2C8]"
        />
      </label>
    </aside>
  );
}
