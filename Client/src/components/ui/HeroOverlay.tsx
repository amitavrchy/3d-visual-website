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
      gsap.fromTo(
        ref.current.querySelectorAll("[data-reveal]"),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out" },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end p-4 pb-28 md:p-8 md:pb-10"
    >
      <p data-reveal className="mono-label mb-3 text-[14px] text-[#4AF2C8]">
        Immersive studio
      </p>
      <h1
        data-reveal
        className="display-font max-w-xl text-[34px] font-semibold leading-[1.05] text-[#F3F4F7] md:text-[56px]"
      >
        Enter the work.
        <br />
        Don&apos;t just scroll past it.
      </h1>
      <p
        data-reveal
        className="mt-3 max-w-md text-[15px] leading-relaxed text-[#9AA3B5] md:text-[16px]"
      >
        KODE / LUMEN Labs builds navigable WebGL atriums, project dioramas, and
        material playgrounds for brands that need presence — not slides.
      </p>
      <div data-reveal className="pointer-events-auto mt-5 flex flex-wrap gap-3">
        <Link
          href="/work"
          className="rounded bg-[#4AF2C8] px-4 py-2.5 text-[15px] font-semibold text-[#050508] transition hover:bg-[#7af7d8]"
        >
          Explore work
        </Link>
        <Link
          href="/playground"
          className="rounded border border-[#22263A] px-4 py-2.5 text-[15px] text-[#F3F4F7] transition hover:border-[#4AF2C8]"
        >
          Open playground
        </Link>
      </div>
    </div>
  );
}
