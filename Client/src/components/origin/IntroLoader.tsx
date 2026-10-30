"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type IntroLoaderProps = {
  onDone: () => void;
};

export function IntroLoader({ onDone }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      setProgress((p) => Math.min(100, p + (100 - p) * 0.06 + 1.2));
      if (frame < 90) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(onDone, 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#03040a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      aria-busy={!leaving}
    >
      <p className="mono-label mb-6 text-[12px] tracking-[0.28em] text-[#4AF2C8]">
        LUMEN — ORIGIN
      </p>
      <div className="h-[1px] w-48 overflow-hidden bg-[#22263A]">
        <div
          className="h-full bg-gradient-to-r from-[#4AF2C8] via-[#6B8CFF] to-[#FF5C7A]"
          style={{ width: progress + "%" }}
        />
      </div>
      <p className="mono-label mt-4 text-[12px] text-[#9AA3B5]">
        {Math.floor(progress).toString().padStart(3, "0")}
      </p>
    </motion.div>
  );
}
