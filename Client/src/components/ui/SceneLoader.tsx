"use client";

import { useEffect, useState } from "react";

type Props = {
  label?: string;
};

export function SceneLoader({ label = "Calibrating scene" }: Props) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        return Math.min(92, p + 7 + Math.floor(Math.random() * 8));
      });
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050508]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, #4AF2C822 0%, transparent 70%), radial-gradient(40% 40% at 70% 70%, #6B8CFF18 0%, transparent 60%)",
        }}
      />
      <p className="display-font text-[28px] font-semibold tracking-tight md:text-[36px]">
        KODE <span className="text-[#4AF2C8]">/</span> LUMEN
      </p>
      <p className="mono-label mt-4 text-[14px] text-[#9AA3B5]">{label}</p>
      <div className="mt-6 h-[2px] w-48 overflow-hidden bg-[#22263A]">
        <div
          className="h-full bg-[#4AF2C8] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 font-mono text-[14px] text-[#4AF2C8]">{progress}%</p>
    </div>
  );
}
