"use client";

import { useEffect } from "react";
import { setPrefer2d } from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function ReducedMotionGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const prefer2d = useAppSelector((s) => s.sceneUi.prefer2d);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) dispatch(setPrefer2d(true));
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [dispatch]);

  return (
    <>
      {prefer2d ? (
        <div className="sr-only" aria-live="polite">
          Reduced motion detected. Prefer the Skip 3D work grid.
        </div>
      ) : null}
      {children}
    </>
  );
}
