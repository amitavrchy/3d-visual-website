"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TEAM = [
  {
    name: "Aria Vale",
    role: "Creative Director",
    bio: "Leads spatial narrative and brand systems for immersive launches.",
    accent: "#4AF2C8",
  },
  {
    name: "Noah Kim",
    role: "WebGL Lead",
    bio: "Builds performant R3F scenes, shaders, and quality ladders.",
    accent: "#6B8CFF",
  },
  {
    name: "Sana Ortiz",
    role: "Interaction Design",
    bio: "Turns complex 3D tools into calm, client-ready interfaces.",
    accent: "#FF5C7A",
  },
];

const PRINCIPLES = [
  {
    title: "HTML first",
    body: "Case studies stay crawlable and readable. Canvas adds presence — it never hides the story.",
  },
  {
    title: "Performance as design",
    body: "Low / med / high presets and reduced-motion paths are product features, not afterthoughts.",
  },
  {
    title: "Camera kindness",
    body: "No nausea FOV swings. Orbits stay intentional so directors can think while they look.",
  },
];

const CLIENTS = ["Orbit", "Threshold", "Signal Co", "Northline", "Aperture", "KODE"];

export default function AboutPage() {
  return (
    <section className="pb-28 pt-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Studio</p>
        <h1 className="display-font mt-3 max-w-3xl text-[44px] font-semibold leading-[1.02] md:text-[64px]">
          KODE <span className="text-[#4AF2C8]">/</span> LUMEN Labs
        </h1>
        <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-[#9AA3B5]">
          We are an immersive product studio. WebGL is the primary medium —
          navigable atriums, configurable materials, and diorama case studies —
          without abandoning clarity for creative directors and engineers.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded bg-[#4AF2C8] px-5 py-3 text-[15px] font-semibold text-[#050508]"
        >
          Start a brief
        </Link>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-8 px-6 md:grid-cols-3">
        {PRINCIPLES.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="border-t border-[#4AF2C8]/40 pt-5"
          >
            <h2 className="display-font text-[22px] font-semibold">{item.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#9AA3B5]">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-5xl px-6">
        <h2 className="display-font text-[32px] font-semibold">Team</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="flex h-36 w-full items-end border border-[#22263A] p-4"
                style={{
                  background: `linear-gradient(145deg, ${member.accent}33, #0F1118 55%)`,
                }}
              >
                <span className="display-font text-[28px] font-semibold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="mt-4 text-[18px] font-semibold">{member.name}</h3>
              <p className="mono-label mt-1 text-[14px] text-[#4AF2C8]">
                {member.role}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#9AA3B5]">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-5xl px-6">
        <h2 className="display-font text-[32px] font-semibold">Clients</h2>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="display-font text-[24px] text-[#9AA3B5] transition hover:text-[#F3F4F7]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
