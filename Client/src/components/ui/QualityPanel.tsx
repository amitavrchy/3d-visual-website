"use client";

import { Settings2 } from "lucide-react";
import { useState } from "react";
import {
  setBloom,
  setPrefer2d,
  setQuality,
  type Quality,
} from "@/features/sceneUi/sceneUiSlice";
import { cn } from "@/lib/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const QUALITIES: Quality[] = ["low", "med", "high"];

export function QualityPanel({ compact = false }: { compact?: boolean }) {
  const dispatch = useAppDispatch();
  const { quality, bloom, prefer2d } = useAppSelector((s) => s.sceneUi);
  const [open, setOpen] = useState(!compact);

  return (
    <aside className="pointer-events-auto absolute bottom-4 left-4 z-40 md:bottom-6 md:left-6">
      {compact && !open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass-panel flex h-11 w-11 items-center justify-center rounded-lg text-[#F3F4F7] transition hover:text-[#4AF2C8]"
          aria-label="Open quality settings"
        >
          <Settings2 size={18} />
        </button>
      ) : (
        <div className="glass-panel w-[min(100vw-2rem,260px)] rounded-lg p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="mono-label text-[14px] text-[#9AA3B5]">Performance</p>
            {compact ? (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[14px] text-[#9AA3B5] hover:text-[#F3F4F7]"
              >
                Close
              </button>
            ) : null}
          </div>
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
        </div>
      )}
    </aside>
  );
}
