"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Atrium } from "@/components/canvas/scenes/Atrium";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { HeroOverlay } from "@/components/ui/HeroOverlay";
import { QualityPanel } from "@/components/ui/QualityPanel";
import { useHotspotKeyboard } from "@/hooks/useHotspotKeyboard";
import { useAppSelector } from "@/store/hooks";

const DevLeva =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/ui/DevLeva").then((m) => m.DevLeva), {
        ssr: false,
      })
    : () => null;

export default function HomePage() {
  const prefer2d = useAppSelector((s) => s.sceneUi.prefer2d);
  useHotspotKeyboard(!prefer2d);

  if (prefer2d) {
    return (
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-28">
        <p className="mono-label text-[14px] text-[#4AF2C8]">2D fallback</p>
        <h1 className="display-font mt-3 text-[40px] font-semibold leading-tight md:text-[52px]">
          KODE / LUMEN Labs
        </h1>
        <p className="mt-4 text-[16px] text-[#9AA3B5]">
          Reduced motion or Prefer 2D is on. Browse the HTML portfolio instead of
          the WebGL atrium.
        </p>
        <Link
          href="/work"
          className="mt-6 inline-flex w-fit rounded bg-[#4AF2C8] px-4 py-2.5 text-[15px] font-semibold text-[#050508]"
        >
          View work grid
        </Link>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <DynamicCanvas>
        <Atrium />
      </DynamicCanvas>
      <HeroOverlay />
      <QualityPanel />
      <DevLeva />
    </section>
  );
}
