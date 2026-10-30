"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { PlanetHero } from "@/components/solar/PlanetHero";
import {
  AnimatedStatCards,
  FunFactBubbles,
  OrbitMiniDiagram,
  SizeCompare,
} from "@/components/solar/PlanetPageExtras";
import {
  getAdjacent,
  getPlanet,
  PLANETS,
  TEXTURE_CREDIT,
  type PlanetSlug,
} from "@/lib/planets";
import { cn } from "@/lib/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { beginReturnHome } from "@/features/solar/solarSlice";

const SLUGS = new Set(PLANETS.map((p) => p.slug));

export default function PlanetPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as PlanetSlug;
  const dispatch = useAppDispatch();
  const phase = useAppSelector((s) => s.solar.phase);
  const scrollRef = useRef(0);

  if (!SLUGS.has(slug)) {
    notFound();
  }
  const planet = getPlanet(slug)!;
  const { prev, next } = getAdjacent(slug);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current = Math.min(1, window.scrollY / max);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () => {
    if (phase !== "idle") return;
    dispatch(beginReturnHome({ color: planet.accent }));
  };

  return (
    <div
      className="relative min-h-screen pb-24 pt-24 md:pt-28"
      style={{
        background: `radial-gradient(120% 80% at 50% -10%, ${planet.gradientFrom} 0%, ${planet.gradientTo} 55%)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-40 h-64 w-64 rounded-full blur-3xl"
          style={{ background: `${planet.accent}22` }}
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-16 top-72 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `${planet.accent}18` }}
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={goHome}
            className="mono-label rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[12px] text-[#9AA3B5] transition hover:border-white/30 hover:text-white"
          >
            Back to Solar System
          </button>
          <nav className="flex flex-wrap gap-1.5">
            {PLANETS.map((p) => (
              <Link
                key={p.slug}
                href={`/planets/${p.slug}`}
                className={cn(
                  "mono-label rounded-full border px-2.5 py-1 text-[11px] transition",
                  p.slug === slug
                    ? "text-[#050508]"
                    : "border-white/10 text-[#9AA3B5] hover:text-white",
                )}
                style={
                  p.slug === slug
                    ? { background: planet.accent, borderColor: planet.accent }
                    : undefined
                }
              >
                {p.name}
              </Link>
            ))}
          </nav>
        </div>

        <PlanetHero data={planet} scrollRef={scrollRef} />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55 }}
          className="mt-8 max-w-2xl text-[16px] text-[#C8CDD8] md:text-[18px]"
        >
          {planet.summary}
        </motion.p>

        <AnimatedStatCards data={planet} />
        <SizeCompare data={planet} />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <OrbitMiniDiagram data={planet} />
          <FunFactBubbles data={planet} />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <Link
            href={`/planets/${prev.slug}`}
            className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/25"
          >
            <p className="mono-label text-[10px] text-[#9AA3B5]">Previous</p>
            <p className="display-font text-[18px] text-white group-hover:opacity-90" style={{ color: prev.accent }}>
              {prev.name}
            </p>
          </Link>
          <button
            type="button"
            onClick={goHome}
            className="rounded-md px-4 py-3 text-[14px] font-semibold text-[#050508] transition hover:brightness-110"
            style={{ background: planet.accent }}
          >
            Return to orbits
          </button>
          <Link
            href={`/planets/${next.slug}`}
            className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right transition hover:border-white/25"
          >
            <p className="mono-label text-[10px] text-[#9AA3B5]">Next</p>
            <p className="display-font text-[18px] text-white" style={{ color: next.accent }}>
              {next.name}
            </p>
          </Link>
        </div>

        <p className="mt-10 text-[11px] text-[#9AA3B5]/80">{TEXTURE_CREDIT}</p>
      </div>
    </div>
  );
}
