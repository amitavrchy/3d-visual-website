"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { SolarHUD } from "./SolarHUD";

const SolarCanvas = dynamic(
  () => import("./SolarCanvas").then((m) => ({ default: m.SolarCanvas })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020208]" aria-hidden />,
  },
);

const CRITICAL = [
  "/textures/preview/2k_sun.webp",
  "/textures/preview/2k_earth_daymap.webp",
  "/textures/planets/2k_sun.webp",
];

export function SolarExperience() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of CRITICAL) {
      const l = document.createElement("link");
      l.rel = "preload";
      l.as = "image";
      l.href = href;
      l.type = "image/webp";
      document.head.appendChild(l);
      links.push(l);
    }
    return () => {
      links.forEach((l) => l.remove());
    };
  }, []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#020208]">
      <SolarCanvas />
      <SolarHUD />
    </section>
  );
}
