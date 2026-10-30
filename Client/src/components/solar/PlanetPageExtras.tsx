"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PlanetData } from "@/lib/planets";
import { PLANETS } from "@/lib/planets";

function useCountUp(target: number, enabled: boolean, decimals = 0) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    mv.set(0);
    mv.set(target);
  }, [enabled, target, mv]);
  useEffect(() => spring.on("change", (v) => setVal(v)), [spring]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
}

export function AnimatedStatCards({ data }: { data: PlanetData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const diam = parseInt(data.diameterKm.replace(/[^0-9]/g, ""), 10) || 0;
  const dist = parseFloat(data.distanceAu) || 0;
  const diamStr = useCountUp(diam, inView);
  const distStr = useCountUp(dist, inView, 2);

  const cards = [
    { label: "Diameter", display: `${diamStr} km`, tip: "Across the equator" },
    { label: "Distance", display: `${distStr} AU`, tip: "From the Sun" },
    { label: "Day length", display: data.dayLength, tip: "One rotation" },
    { label: "Year length", display: data.yearLength, tip: "One orbit" },
    { label: "Moons", display: data.moons, tip: "Natural satellites" },
    { label: "Temperature", display: data.temperature, tip: "Surface / cloud tops" },
  ];

  return (
    <div ref={ref} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 28, rotateX: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
          style={{
            boxShadow: `0 0 0 1px ${data.accent}22, 0 12px 40px -16px ${data.accent}55`,
          }}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl transition group-hover:opacity-60"
            style={{ background: data.accent }}
          />
          <p className="mono-label text-[10px] tracking-[0.16em] text-[#9AA3B5]">{c.label}</p>
          <p className="mt-2 display-font text-[22px] font-semibold text-white">{c.display}</p>
          <p className="mt-1 text-[12px] text-[#9AA3B5] opacity-0 transition group-hover:opacity-100">
            {c.tip}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export function SizeCompare({ data }: { data: PlanetData }) {
  const earth = PLANETS.find((p) => p.slug === "earth")!;
  const max = Math.max(data.sizeVsEarth, 1);
  const planetPct = (data.sizeVsEarth / max) * 100;
  const earthPct = (1 / max) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-8"
    >
      <h2 className="display-font text-[22px] font-semibold text-white md:text-[26px]">
        Size vs Earth
      </h2>
      <p className="mt-1 text-[13px] text-[#9AA3B5]">
        Relative diameters (Earth = 1.00x)
      </p>
      <div className="mt-8 flex items-end justify-center gap-10 md:gap-16">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }}
            className="rounded-full shadow-[0_0_40px]"
            style={{
              width: `${Math.max(36, planetPct * 1.1)}px`,
              height: `${Math.max(36, planetPct * 1.1)}px`,
              background: `radial-gradient(circle at 35% 30%, #fff8, ${data.accent})`,
              boxShadow: `0 0 40px ${data.accent}66`,
            }}
          />
          <p className="mono-label text-[11px] text-white">{data.name}</p>
          <p className="text-[13px]" style={{ color: data.accent }}>
            {data.sizeVsEarth.toFixed(2)}x
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.28 }}
            className="rounded-full"
            style={{
              width: `${Math.max(28, earthPct * 1.1)}px`,
              height: `${Math.max(28, earthPct * 1.1)}px`,
              background: "radial-gradient(circle at 35% 30%, #8cf, #2a6)",
              boxShadow: "0 0 28px #4AF2C866",
            }}
          />
          <p className="mono-label text-[11px] text-white">Earth</p>
          <p className="text-[13px] text-[#4AF2C8]">1.00x</p>
        </div>
      </div>
    </motion.section>
  );
}

export function OrbitMiniDiagram({ data }: { data: PlanetData }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md md:p-8"
    >
      <h2 className="display-font text-[22px] font-semibold text-white">Orbit sketch</h2>
      <p className="mt-1 text-[13px] text-[#9AA3B5]">Cute relative order around the Sun</p>
      <div className="relative mx-auto mt-6 aspect-square max-w-sm">
        <div className="absolute left-1/2 top-1/2 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb347] shadow-[0_0_30px_#ff9a3c]" />
        {PLANETS.map((p) => {
          const r = 18 + p.order * 9;
          const active = p.slug === data.slug;
          const dur = 7 + p.order * 2.2;
          return (
            <div key={p.slug} className="absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: r * 2 + "%",
                  height: r * 2 + "%",
                  borderColor: active ? data.accent + "99" : "rgba(255,255,255,0.08)",
                }}
              />
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: r * 2 + "%",
                  height: r * 2 + "%",
                  marginLeft: -r + "%",
                  marginTop: -r + "%",
                  animation: "orbit-spin " + dur + "s linear infinite",
                }}
              >
                <div
                  className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                  style={{
                    background: active ? data.accent : "#777",
                    boxShadow: active ? "0 0 12px " + data.accent : undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export function FunFactBubbles({ data }: { data: PlanetData }) {
  return (
    <section className="mt-12">
      <h2 className="display-font text-[24px] font-semibold text-white md:text-[28px]">
        Key facts
      </h2>
      <ul className="mt-5 space-y-4">
        {data.facts.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.015, x: 4 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[14px] text-[#C8CDD8] backdrop-blur-lg"
            style={{ boxShadow: `inset 0 0 0 1px ${data.accent}18` }}
          >
            <span
              className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-[#050508]"
              style={{ background: data.accent }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {f}
            <motion.span
              className="absolute -right-2 -top-2 text-[18px]"
              animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 2.4 + i * 0.3, repeat: Infinity }}
            >
              {i === 0 ? "💫" : i === 1 ? "🪐" : "🔭"}
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
