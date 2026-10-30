"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export function HeroOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ref.current.querySelectorAll("[data-reveal]"),
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1 },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-end"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#050508] via-[#050508]/75 to-transparent" />

      <div className="relative px-5 pb-24 pt-8 md:px-10 md:pb-12 lg:px-14">
        <p data-reveal className="mono-label text-[14px] text-[#4AF2C8]">
          Immersive product studio
        </p>

        <h1
          data-reveal
          className="display-font mt-3 max-w-4xl text-[48px] font-semibold leading-[0.95] tracking-tight text-[#F3F4F7] md:text-[72px] lg:text-[88px]"
        >
          KODE <span className="text-[#4AF2C8]">/</span> LUMEN
        </h1>

        <p
          data-reveal
          className="mt-4 max-w-xl text-[18px] font-medium leading-snug text-[#F3F4F7] md:text-[22px]"
        >
          Enter the work. Don&apos;t just scroll past it.
        </p>

        <p
          data-reveal
          className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#9AA3B5] md:text-[16px]"
        >
          We design navigable WebGL experiences — atriums, product stages, and
          case-study dioramas — for brands that need presence, not another PDF.
        </p>

        <div
          data-reveal
          className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/work"
            className="rounded bg-[#4AF2C8] px-5 py-3 text-[15px] font-semibold text-[#050508] transition hover:bg-[#7af7d8]"
          >
            View selected work
          </Link>
          <Link
            href="/playground"
            className="rounded border border-[#F3F4F7]/20 px-5 py-3 text-[15px] text-[#F3F4F7] transition hover:border-[#4AF2C8] hover:text-[#4AF2C8]"
          >
            Try the material lab
          </Link>
        </div>

        <p
          data-reveal
          className="pointer-events-none mt-6 hidden text-[14px] text-[#9AA3B5] md:block"
        >
          Drag to look · scroll to zoom · click glowing portals · keys 1–4 to jump
        </p>
      </div>
    </div>
  );
}
