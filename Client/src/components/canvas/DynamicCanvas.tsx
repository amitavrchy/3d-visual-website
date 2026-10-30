"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { SceneLoader } from "@/components/ui/SceneLoader";

const AppCanvas = dynamic(
  () => import("./AppCanvas").then((m) => m.AppCanvas),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  },
);

export function DynamicCanvas(props: ComponentProps<typeof AppCanvas>) {
  return <AppCanvas {...props} />;
}
