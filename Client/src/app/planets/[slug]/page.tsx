"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PlanetHero } from "@/components/solar/PlanetHero";
import {
  getAdjacent,
  getPlanet,
  PLANETS,
  TEXTURE_CREDIT,
  type PlanetSlug,
} from "@/lib/planets";
import { cn } from "@/lib/cn";

const SLUGS = new Set(PLANETS.map((p) => p.slug));

export default function PlanetPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as PlanetSlug;
  if (!SLUGS.has(slug)) {
    notFound();
  }
  const planet = getPlanet(slug)!;
  const { prev, next } = getAdjacent(slug);

  const stats = [
    { label: "Diameter", value: planet.diameterKm },
    { label: "Distance", value: planet.distanceAu },
    { label: "Day length", value: planet.dayLength },
    { label: "Year length", value: planet.yearLength },
    { label: "Moons", value: planet.moons },
    { label: "Temperature", value: planet.temperature },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 md:px-8 md:pt-28">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="mono-label rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[12px] text-[#9AA3B5] transition hover:border-[#4AF2C8]/40 hover:text-[#4AF2C8]"
        >
          Back to Solar System
        </Link>
        <nav className="flex flex-wrap gap-1.5">
          {PLANETS.map((p) => (
            <Link
              key={p.slug}
              href={`/planets/${p.slug}`}
              className={cn(
                "mono-label rounded-full border px-2.5 py-1 text-[11px] transition",
                p.slug === slug
                  ? "border-[#4AF2C8] bg-[#4AF2C8]/15 text-[#4AF2C8]"
                  : "border-white/10 text-[#9AA3B5] hover:text-white",
              )}
            >
              {p.name}
            </Link>
          ))}
        </nav>
      </div>

      <PlanetHero data={planet} />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 max-w-2xl text-[16px] text-[#C8CDD8] md:text-[18px]"
      >
        {planet.summary}
      </motion.p>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-[#0a0c14]/80 p-4"
            style={{ boxShadow: `inset 0 0 0 1px ${planet.accent}22` }}
          >
            <p className="mono-label text-[10px] tracking-[0.16em] text-[#9AA3B5]">
              {s.label}
            </p>
            <p className="mt-1 display-font text-[20px] font-semibold text-white">
              {s.value}
            </p>
          </div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="mt-12"
      >
        <h2 className="display-font text-[24px] font-semibold text-white md:text-[28px]">
          Key facts
        </h2>
        <ul className="mt-4 space-y-3">
          {planet.facts.map((f, i) => (
            <li
              key={i}
              className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-[14px] text-[#C8CDD8]"
            >
              <span className="mr-2 text-[#4AF2C8]">{String(i + 1).padStart(2, "0")}</span>
              {f}
            </li>
          ))}
        </ul>
      </motion.section>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
        <Link
          href={`/planets/${prev.slug}`}
          className="group rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/25"
        >
          <p className="mono-label text-[10px] text-[#9AA3B5]">Previous</p>
          <p className="display-font text-[18px] text-white group-hover:text-[#4AF2C8]">
            {prev.name}
          </p>
        </Link>
        <Link
          href="/"
          className="rounded-md bg-[#4AF2C8] px-4 py-3 text-[14px] font-semibold text-[#050508] transition hover:bg-[#7af7d8]"
        >
          Return to orbits
        </Link>
        <Link
          href={`/planets/${next.slug}`}
          className="group rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-right transition hover:border-white/25"
        >
          <p className="mono-label text-[10px] text-[#9AA3B5]">Next</p>
          <p className="display-font text-[18px] text-white group-hover:text-[#4AF2C8]">
            {next.name}
          </p>
        </Link>
      </div>

      <p className="mt-10 text-[11px] text-[#9AA3B5]/80">{TEXTURE_CREDIT}</p>
    </div>
  );
}
