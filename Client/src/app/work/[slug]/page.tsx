"use client";

import Link from "next/link";
import { use } from "react";
import { ProjectDiorama } from "@/components/canvas/scenes/ProjectDiorama";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { QualityPanel } from "@/components/ui/QualityPanel";
import { useProject } from "@/hooks/useProjects";
import { useAppSelector } from "@/store/hooks";

export default function ProjectCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: project, isLoading, error } = useProject(slug);
  const prefer2d = useAppSelector((s) => s.sceneUi.prefer2d);

  if (isLoading) {
    return (
      <p className="px-6 pt-28 text-[15px] text-[#9AA3B5]">Loading case study…</p>
    );
  }

  if (error || !project) {
    return (
      <section className="px-6 pt-28">
        <h1 className="display-font text-[36px]">Project not found</h1>
        <Link href="/work" className="mt-4 inline-block text-[15px] text-[#4AF2C8]">
          Back to work
        </Link>
      </section>
    );
  }

  const cam = project.sceneConfig.camera;

  return (
    <section className="pb-24">
      {!prefer2d ? (
        <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden border-b border-[#22263A]">
          <DynamicCanvas
            cameraPosition={cam?.position ?? [0, 2, 6]}
            fov={cam?.fov ?? 42}
          >
            <ProjectDiorama project={project} />
          </DynamicCanvas>
          <QualityPanel />
        </div>
      ) : (
        <div
          className="flex h-[40vh] min-h-[280px] items-end px-6 pb-8 pt-28"
          style={{
            background: `linear-gradient(135deg, ${project.sceneConfig.theme?.primary ?? "#4AF2C8"}44, #050508)`,
          }}
        >
          <p className="mono-label text-[14px] text-[#F3F4F7]">2D cover</p>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-6 pt-10">
        <p className="mono-label text-[14px] text-[#4AF2C8]">
          {project.clientName} · {project.year}
        </p>
        <h1 className="display-font mt-2 text-[42px] font-semibold md:text-[52px]">
          {project.title}
        </h1>
        <p className="mt-3 text-[18px] text-[#9AA3B5]">{project.tagline}</p>
        <p className="mt-6 text-[16px] leading-relaxed text-[#F3F4F7]">
          {project.description}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mono-label text-[14px] text-[#9AA3B5]">Roles</h2>
            <ul className="mt-2 space-y-1 text-[15px]">
              {project.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mono-label text-[14px] text-[#9AA3B5]">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded border border-[#22263A] px-2 py-1 text-[14px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/work"
          className="mt-12 inline-block text-[15px] text-[#4AF2C8] hover:underline"
        >
          ← All projects
        </Link>
      </article>
    </section>
  );
}
