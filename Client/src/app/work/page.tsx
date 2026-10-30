"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useProjects } from "@/hooks/useProjects";

export default function WorkPage() {
  const { data: projects = [], isLoading, isError } = useProjects();
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured?.id);

  return (
    <section className="pb-28 pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Selected work</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="display-font max-w-2xl text-[42px] font-semibold leading-[1.02] md:text-[56px]">
            Experiences you can walk into
          </h1>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#9AA3B5]">
            Each project ships as a readable case study first — with an optional
            WebGL diorama when you want the atmosphere.
          </p>
        </div>
      </div>

      {isLoading ? (
        <p className="mx-auto mt-16 max-w-6xl px-6 text-[15px] text-[#9AA3B5]">
          Loading projects…
        </p>
      ) : isError && projects.length === 0 ? (
        <p className="mx-auto mt-16 max-w-6xl px-6 text-[15px] text-[#FF5C7A]">
          Could not load projects.
        </p>
      ) : featured ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mt-12 max-w-6xl px-6"
          >
            <Link href={`/work/${featured.slug}`} className="group block">
              <ProjectCover project={featured} featured />
              <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="display-font text-[32px] font-semibold transition group-hover:text-[#4AF2C8] md:text-[40px]">
                    {featured.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-[16px] text-[#9AA3B5]">
                    {featured.tagline}
                  </p>
                </div>
                <span className="text-[15px] font-medium text-[#4AF2C8]">
                  Open case study →
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-2">
            {rest.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  <ProjectCover project={project} />
                  <h2 className="display-font mt-4 text-[26px] font-semibold transition group-hover:text-[#4AF2C8]">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#9AA3B5]">
                    {project.tagline}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="border border-[#22263A] px-2 py-1 text-[14px] text-[#9AA3B5]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.article>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
