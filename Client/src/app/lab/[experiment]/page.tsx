"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";
import { fetchExperiments } from "@/lib/api";
import { FALLBACK_EXPERIMENTS } from "@/lib/fallback-data";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { PlaygroundScene } from "@/components/canvas/scenes/PlaygroundScene";
import { QualityPanel } from "@/components/ui/QualityPanel";

export default function ExperimentPage({
  params,
}: {
  params: Promise<{ experiment: string }>;
}) {
  const { experiment: slug } = use(params);
  const { data } = useQuery({
    queryKey: ["experiments"],
    queryFn: async () => {
      try {
        return await fetchExperiments();
      } catch {
        return FALLBACK_EXPERIMENTS;
      }
    },
  });

  const experiment =
    data?.find((e) => e.slug === slug) ??
    FALLBACK_EXPERIMENTS.find((e) => e.slug === slug);

  if (!experiment) {
    return (
      <section className="px-6 pt-28">
        <h1 className="display-font text-[36px]">Experiment not found</h1>
        <Link href="/playground" className="mt-4 inline-block text-[#4AF2C8]">
          Back to playground
        </Link>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <DynamicCanvas>
        <PlaygroundScene />
      </DynamicCanvas>
      <div className="pointer-events-none absolute left-6 top-24 z-30 max-w-lg md:top-28">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Lab</p>
        <h1 className="display-font mt-2 text-[36px] font-semibold">
          {experiment.title}
        </h1>
        <p className="mt-2 text-[15px] text-[#9AA3B5]">{experiment.summary}</p>
      </div>
      <QualityPanel />
    </section>
  );
}
