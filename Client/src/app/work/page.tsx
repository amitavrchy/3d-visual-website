"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";

export default function WorkPage() {
  const { data: projects = [], isLoading } = useProjects();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <p className="mono-label text-[14px] text-[#4AF2C8]">Selected work</p>
      <h1 className="display-font mt-2 text-[40px] font-semibold md:text-[52px]">
        Project gallery
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] text-[#9AA3B5]">
        Crawlable case studies with optional WebGL dioramas. Skip 3D anytime —
        the story lives in HTML first.
      </p>

      {isLoading ? (
        <p className="mt-10 text-[15px] text-[#9AA3B5]">Loading projects…</p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="group"
            >
              <Link href={`/work/${project.slug}`} className="block">
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#22263A] bg-[#0F1118]"
                  style={{
                    background: `linear-gradient(135deg, ${project.sceneConfig.theme?.primary ?? "#4AF2C8"}33, #0F1118 60%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-end p-5">
                    <span className="mono-label text-[14px] text-[#F3F4F7]/80">
                      {project.year ?? "—"} · {project.clientName ?? "Studio"}
                    </span>
                  </div>
                </div>
                <h2 className="display-font mt-4 text-[26px] font-semibold group-hover:text-[#4AF2C8]">
                  {project.title}
                </h2>
                <p className="mt-2 text-[15px] text-[#9AA3B5]">{project.tagline}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <li
                      key={t}
                      className="rounded border border-[#22263A] px-2 py-1 text-[14px] text-[#9AA3B5]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
