"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearTransition,
  setCoverOpacity,
  setPhase,
  startReveal,
} from "@/features/solar/solarSlice";

/**
 * Full-screen color veil that bridges solar fly-to and planet page remount.
 * Stays mounted in layout so it never unmounts mid-transition.
 */
export function TransitionOverlay() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { phase, coverOpacity, coverColor, pendingSlug, returnHome } =
    useAppSelector((s) => s.solar);

  // Drive cover fade-in when covering
  useEffect(() => {
    if (phase !== "covering") return;
    let raf = 0;
    let start = performance.now();
    const from = coverOpacity;
    const dur = 420;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = t * t * (3 - 2 * t);
      dispatch(setCoverOpacity(from + (1 - from) * e));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        dispatch(setPhase("covered"));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, dispatch]);

  // Navigate once fully covered
  useEffect(() => {
    if (phase !== "covered") return;
    if (returnHome) {
      router.push("/");
    } else if (pendingSlug) {
      router.push(`/planets/${pendingSlug}`);
    }
  }, [phase, pendingSlug, returnHome, router]);

  // On planet route arrival: reveal
  useEffect(() => {
    if (phase !== "covered") return;
    if (returnHome && pathname === "/") {
      dispatch(startReveal());
    }
    if (!returnHome && pendingSlug && pathname === `/planets/${pendingSlug}`) {
      dispatch(startReveal());
    }
  }, [pathname, phase, pendingSlug, returnHome, dispatch]);

  // Fade cover out during reveal
  useEffect(() => {
    if (phase !== "revealing") return;
    let raf = 0;
    let start = performance.now();
    const from = coverOpacity > 0.05 ? coverOpacity : 1;
    dispatch(setCoverOpacity(from));
    const dur = 550;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = t * t * (3 - 2 * t);
      dispatch(setCoverOpacity(from * (1 - e)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        dispatch(clearTransition());
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, dispatch]);

  const visible = coverOpacity > 0.001 || phase === "covering" || phase === "covered" || phase === "revealing";
  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{
        background: `radial-gradient(circle at 50% 45%, ${coverColor} 0%, #020208 72%)`,
        opacity: coverOpacity,
        transition: "none",
      }}
    />
  );
}
