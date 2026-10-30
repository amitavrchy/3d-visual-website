"use client";

import Link from "next/link";
import { use } from "react";
import { ProjectDiorama } from "@/components/canvas/scenes/ProjectDiorama";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { QualityPanel } from "@/components/ui/QualityPanel";
import { useProject, useProjects } from "@/hooks/useProjects";
import { CASE_STUDIES } from "@/lib/case-studies";
import { useAppSelector } from "@/store/hooks";

export default function ProjectCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: project, isLoading, error } = useProject(slug);
  const { data: all = [] } = useProjects();
  const prefer2d = useAppSelector((s) => s.sceneUi.prefer2d);
  const extra = CASE_STUDIES[slug];
  const next = all.find((p) => p.slug !== slug);

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
  const primary = project.sceneConfig.theme?.primary ?? "#4AF2C8";

  return (
    <section className="pb-28">
      {!prefer2d ? (
        <div className="relative h-[58vh] min-h-[380px] w-full overflow-hidden">
          <DynamicCanvas
            cameraPosition={cam?.position ?? [0, 2, 6]}
            fov={cam?.fov ?? 42}
          >
            <ProjectDiorama project={project} />
          </DynamicCanvas>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050508] to-transparent" />
          <QualityPanel compact />
        </div>
      ) : (
        <div
          className="flex h-[42vh] min-h-[300px] items-end px-6 pb-10 pt-28"
          style={{
            background: `linear-gradient(135deg, ${primary}40, #050508 65%)`,
          }}
        >
          <p className="mono-label text-[14px] text-[#F3F4F7]">2D cover</p>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-6 pt-10">
        <p className="mono-label text-[14px] text-[#4AF2C8]">
          {project.clientName} · {project.year}
        </p>
        <h1 className="display-font mt-2 text-[42px] font-semibold leading-[1.02] md:text-[56px]">
          {project.title}
        </h1>
        <p className="mt-4 text-[20px] leading-snug text-[#9AA3B5]">
          {project.tagline}
        </p>
        <p className="mt-8 text-[16px] leading-[1.7] text-[#F3F4F7]">
          {project.description}
        </p>

        {extra ? (
          <div className="mt-14 space-y-10">
            {(
              [
                ["Problem", extra.problem],
                ["Approach", extra.approach],
                ["Outcome", extra.outcome],
              ] as const
            ).map(([title, body]) => (
              <section key={title}>
                <h2 className="mono-label text-[14px] text-[#4AF2C8]">{title}</h2>
                <p className="mt-3 text-[16px] leading-[1.7] text-[#F3F4F7]">
                  {body}
                </p>
              </section>
            ))}
            <section>
              <h2 className="mono-label text-[14px] text-[#4AF2C8]">
                Deliverables
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {extra.deliverables.map((d) => (
                  <li
                    key={d}
                    className="border-l-2 border-[#4AF2C8] pl-3 text-[15px] text-[#F3F4F7]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        <div className="mt-14 grid gap-10 border-t border-[#22263A] pt-10 sm:grid-cols-2">
          <div>
            <h2 className="mono-label text-[14px] text-[#9AA3B5]">Roles</h2>
            <ul className="mt-3 space-y-1.5 text-[15px]">
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
                  className="border border-[#22263A] px-2.5 py-1 text-[14px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#22263A] pt-8">
          <Link href="/work" className="text-[15px] text-[#9AA3B5] hover:text-[#4AF2C8]">
            ← All projects
          </Link>
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="text-[15px] font-medium text-[#4AF2C8]"
            >
              Next: {next.title} →
            </Link>
          ) : (
            <Link href="/contact" className="text-[15px] font-medium text-[#4AF2C8]">
              Start a brief →
            </Link>
          )}
        </div>
      </article>
    </section>
  );
}
