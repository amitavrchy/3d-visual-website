"use client";

import Link from "next/link";
import { Atrium } from "@/components/canvas/scenes/Atrium";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { HeroOverlay } from "@/components/ui/HeroOverlay";
import { QualityPanel } from "@/components/ui/QualityPanel";
import { useHotspotKeyboard } from "@/hooks/useHotspotKeyboard";
import { useAppSelector } from "@/store/hooks";

export default function HomePage() {
  const prefer2d = useAppSelector((s) => s.sceneUi.prefer2d);
  useHotspotKeyboard(!prefer2d);

  if (prefer2d) {
    return (
      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(50% 40% at 30% 20%, #4AF2C822, transparent), radial-gradient(40% 35% at 80% 60%, #6B8CFF18, transparent)",
          }}
        />
        <p className="mono-label text-[14px] text-[#4AF2C8]">Readable mode</p>
        <h1 className="display-font mt-3 text-[48px] font-semibold leading-[0.95] md:text-[64px]">
          KODE <span className="text-[#4AF2C8]">/</span> LUMEN
        </h1>
        <p className="mt-4 text-[18px] text-[#F3F4F7]">
          Enter the work — without the WebGL layer.
        </p>
        <p className="mt-3 text-[16px] leading-relaxed text-[#9AA3B5]">
          Prefer 2D or reduced motion is on. The full case studies still live in
          HTML so nothing important is canvas-only.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="rounded bg-[#4AF2C8] px-5 py-3 text-[15px] font-semibold text-[#050508]"
          >
            View selected work
          </Link>
          <Link
            href="/contact"
            className="rounded border border-[#F3F4F7]/20 px-5 py-3 text-[15px]"
          >
            Start a brief
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <DynamicCanvas cameraPosition={[0, 2.4, 7.2]} fov={40}>
        <Atrium />
      </DynamicCanvas>
      <HeroOverlay />
      <QualityPanel compact />
    </section>
  );
}
