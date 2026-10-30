"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const AppCanvas = dynamic(
  () => import("./AppCanvas").then((m) => m.AppCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-[#050508] text-[14px] text-[#9AA3B5]">
        Loading scene…
      </div>
    ),
  },
);

export function DynamicCanvas(props: ComponentProps<typeof AppCanvas>) {
  return <AppCanvas {...props} />;
}
