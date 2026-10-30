"use client";

import dynamic from "next/dynamic";
import { SolarHUD } from "./SolarHUD";

const SolarCanvas = dynamic(
  () => import("./SolarCanvas").then((m) => ({ default: m.SolarCanvas })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020208]" aria-hidden />,
  },
);

export function SolarExperience() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#020208]">
      <SolarCanvas />
      <SolarHUD />
    </section>
  );
}
