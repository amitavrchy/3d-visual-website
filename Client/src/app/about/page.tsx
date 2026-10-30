"use client";

import { motion } from "framer-motion";

const TEAM = [
  { name: "Aria Vale", role: "Creative Director", accent: "#4AF2C8" },
  { name: "Noah Kim", role: "WebGL Lead", accent: "#6B8CFF" },
  { name: "Sana Ortiz", role: "Interaction Design", accent: "#FF5C7A" },
];

const CLIENTS = ["Orbit", "Threshold", "Signal Co", "Northline", "Aperture"];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <p className="mono-label text-[14px] text-[#4AF2C8]">About</p>
      <h1 className="display-font mt-2 text-[42px] font-semibold md:text-[56px]">
        KODE / LUMEN Labs
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#9AA3B5]">
        We treat WebGL as a primary medium — navigable scenes, configurable
        materials, and postprocessing beauty — without abandoning content
        clarity. Inspired by Messenger, Vast, Orage, iyO, and KODE Immersive.
      </p>

      <h2 className="display-font mt-16 text-[28px] font-semibold">Philosophy</h2>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#F3F4F7]">
        Camera motion should never induce nausea. Quality presets respect
        hardware. HTML carries SEO and accessibility; the canvas carries
        presence. Enter the work — don&apos;t just scroll past it.
      </p>

      <h2 className="display-font mt-16 text-[28px] font-semibold">Team</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#22263A]"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${member.accent}66, #0F1118)`,
              }}
              aria-hidden
            >
              <span className="display-font text-[28px] font-semibold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <h3 className="mt-4 text-[18px] font-semibold">{member.name}</h3>
            <p className="mono-label mt-1 text-[14px] text-[#9AA3B5]">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>

      <h2 className="display-font mt-16 text-[28px] font-semibold">Clients</h2>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {CLIENTS.map((c) => (
          <li
            key={c}
            className="display-font text-[22px] text-[#9AA3B5] transition hover:text-[#F3F4F7]"
          >
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
