"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CHAPTERS, chapterAt, scrollState } from "@/lib/scrollState";

export function ChapterOverlay() {
  const [activeId, setActiveId] = useState(CHAPTERS[0]!.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setProgress(scrollState.progress);
      setActiveId(chapterAt(scrollState.progress).id);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const chapter = CHAPTERS.find((c) => c.id === activeId) ?? CHAPTERS[0]!;
  const lines = chapter.title.split("\n");

  return (
    <>
      <div className="relative z-10" style={{ height: "600vh" }} aria-hidden>
        {CHAPTERS.map((c) => (
          <section
            key={c.id}
            id={c.id}
            className="flex h-[100vh] items-end px-6 pb-24 md:items-center md:px-16 md:pb-0"
          >
            <div className="pointer-events-none max-w-xl opacity-0" aria-hidden>
              <h2>{c.title.replace(/\n/g, " ")}</h2>
            </div>
          </section>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between px-5 py-24 md:px-12 md:py-28">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label text-[11px] tracking-[0.22em] text-[#4AF2C8]">
              {chapter.label}
            </p>
            <motion.h1
              key={chapter.id + "-title"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="display-font mt-3 max-w-xl text-[36px] font-semibold leading-[1.02] text-[#F3F4F7] md:text-[56px]"
            >
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>
            <motion.p
              key={chapter.id + "-body"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 max-w-md text-[15px] leading-relaxed text-[#9AA3B5] md:text-[17px]"
            >
              {chapter.body}
            </motion.p>
          </div>

          <ol className="hidden flex-col gap-2 sm:flex" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a
                  href={"#" + c.id}
                  className={
                    "pointer-events-auto mono-label block text-[10px] tracking-[0.18em] transition " +
                    (c.id === activeId
                      ? "text-[#4AF2C8]"
                      : "text-[#9AA3B5]/50 hover:text-[#F3F4F7]")
                  }
                >
                  {String(c.index + 1).padStart(2, "0")}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="w-40 md:w-56">
            <div className="mono-label mb-2 flex justify-between text-[10px] text-[#9AA3B5]">
              <span>SCROLL</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-[#22263A]">
              <div
                className="h-full bg-gradient-to-r from-[#4AF2C8] to-[#6B8CFF] transition-[width] duration-100"
                style={{ width: progress * 100 + "%" }}
              />
            </div>
          </div>

          {activeId === "awakening" ? (
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Link
                href="/work"
                className="rounded-md bg-[#4AF2C8] px-5 py-3 text-[14px] font-semibold text-[#050508] transition hover:bg-[#7af7d8]"
              >
                Enter the work
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-[#F3F4F7]/20 px-5 py-3 text-[14px] text-[#F3F4F7] transition hover:border-[#4AF2C8] hover:text-[#4AF2C8]"
              >
                Start a brief
              </Link>
            </div>
          ) : (
            <p className="mono-label hidden text-[10px] tracking-[0.2em] text-[#9AA3B5] md:block">
              Scroll to continue the origin
            </p>
          )}
        </div>
      </div>
    </>
  );
}
