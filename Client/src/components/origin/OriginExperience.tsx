"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { ChapterOverlay } from "./ChapterOverlay";
import { IntroLoader } from "./IntroLoader";
import { useLenisScroll } from "./useLenisScroll";
import Link from "next/link";
import { QualityPanel } from "@/components/ui/QualityPanel";

const OriginCanvas = dynamic(
  () => import("./OriginCanvas").then((m) => m.OriginCanvas),
  { ssr: false },
);

export function OriginExperience() {
  const prefer2d = useAppSelector((s) => s.sceneUi.prefer2d);
  const [booted, setBooted] = useState(false);
  const onDone = useCallback(() => setBooted(true), []);

  useLenisScroll(!prefer2d && booted);

  if (prefer2d) {
    return (
      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-28">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Readable mode</p>
        <h1 className="display-font mt-3 text-[48px] font-semibold leading-[0.95] md:text-[64px]">
          LUMEN <span className="text-[#4AF2C8]">—</span> Origin
        </h1>
        <p className="mt-4 text-[18px] text-[#F3F4F7]">
          The birth of light as a metaphor for creative work — without WebGL.
        </p>
        <p className="mt-3 text-[16px] leading-relaxed text-[#9AA3B5]">
          Scroll chapters: Void → Spark → Ignition → Nebula → Crystal →
          Awakening. Prefer 2D or reduced motion is on.
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
    <div className="relative min-h-screen bg-[#03040a]">
      {!booted && <IntroLoader onDone={onDone} />}
      <OriginCanvas />
      <ChapterOverlay />
      <QualityPanel compact />
    </div>
  );
}
