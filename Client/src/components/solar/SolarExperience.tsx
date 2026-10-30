"use client";

import { SolarCanvas } from "./SolarCanvas";
import { SolarHUD } from "./SolarHUD";

export function SolarExperience() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#020208]">
      <SolarCanvas />
      <SolarHUD />
    </section>
  );
}
