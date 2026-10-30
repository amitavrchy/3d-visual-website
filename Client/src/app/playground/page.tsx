"use client";

import dynamic from "next/dynamic";
import { PlaygroundScene } from "@/components/canvas/scenes/PlaygroundScene";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { PlaygroundControls } from "@/components/ui/PlaygroundControls";
import { QualityPanel } from "@/components/ui/QualityPanel";

const DevLeva =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/ui/DevLeva").then((m) => m.DevLeva), {
        ssr: false,
      })
    : () => null;

export default function PlaygroundPage() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <DynamicCanvas cameraPosition={[2.2, 1.8, 4.5]} fov={40}>
        <PlaygroundScene />
      </DynamicCanvas>
      <div className="pointer-events-none absolute left-4 top-24 z-30 max-w-md md:left-8 md:top-28">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Playground</p>
        <h1 className="display-font mt-2 text-[34px] font-semibold md:text-[44px]">
          Material + FX lab
        </h1>
        <p className="mt-2 text-[15px] text-[#9AA3B5]">
          Production UI mirrors Leva controls. State lives in Redux{" "}
          <code className="text-[#4AF2C8]">sceneUiSlice</code>.
        </p>
      </div>
      <QualityPanel />
      <PlaygroundControls />
      <DevLeva />
    </section>
  );
}
