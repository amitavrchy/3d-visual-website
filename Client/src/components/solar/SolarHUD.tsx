"use client";

import Link from "next/link";
import { PLANETS, TEXTURE_CREDIT } from "@/lib/planets";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPaused } from "@/features/solar/solarSlice";
import { cn } from "@/lib/cn";

export function SolarHUD() {
  const hovered = useAppSelector((s) => s.solar.hovered);
  const paused = useAppSelector((s) => s.solar.paused);
  const flying = useAppSelector((s) => s.solar.flying);
  const dispatch = useAppDispatch();
  const planet = PLANETS.find((p) => p.slug === hovered);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-5 md:p-8">
      <div className="pt-16 md:pt-20">
        <p className="mono-label text-[11px] tracking-[0.22em] text-[#4AF2C8]">
          IMMERSIVE ORBITARY
        </p>
        <h1 className="display-font mt-2 max-w-xl text-[36px] font-semibold leading-[1.05] text-white md:text-[52px]">
          Solar System
        </h1>
        <p className="mt-3 max-w-md text-[14px] text-[#9AA3B5] md:text-[15px]">
          Hover a world for its name. Click to fly in -- then explore dedicated pages with NASA-style facts.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="pointer-events-auto flex max-w-full flex-wrap gap-1.5">
          {PLANETS.map((p) => (
            <Link
              key={p.slug}
              href={`/planets/${p.slug}`}
              className={cn(
                "mono-label rounded-full border px-2.5 py-1 text-[11px] tracking-wide transition",
                hovered === p.slug
                  ? "border-[#4AF2C8] bg-[#4AF2C8]/15 text-[#4AF2C8]"
                  : "border-white/10 bg-white/5 text-[#9AA3B5] hover:border-white/25 hover:text-white",
              )}
            >
              {p.name}
            </Link>
          ))}
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(setPaused(!paused))}
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-[#F3F4F7] backdrop-blur hover:border-[#4AF2C8]/40"
          >
            {paused ? "Resume orbits" : "Pause orbits"}
          </button>
          {flying && (
            <span className="mono-label text-[11px] text-[#4AF2C8]">Flying...</span>
          )}
        </div>
      </div>

      {planet && (
        <div className="pointer-events-none absolute bottom-28 left-5 max-w-xs rounded-lg border border-white/10 bg-[#050508]/70 p-4 backdrop-blur md:left-8">
          <p className="mono-label text-[10px] text-[#4AF2C8]">
            PLANET {String(planet.order).padStart(2, "0")}
          </p>
          <h2 className="display-font text-[22px] font-semibold text-white">{planet.name}</h2>
          <p className="mt-1 text-[13px] text-[#9AA3B5]">{planet.summary}</p>
          <p className="mt-2 text-[12px] text-[#4AF2C8]">Click to visit</p>
        </div>
      )}

      <p className="pointer-events-none absolute bottom-2 right-5 max-w-sm text-right text-[10px] text-[#9AA3B5]/70 md:right-8">
        {TEXTURE_CREDIT}
      </p>
    </div>
  );
}
