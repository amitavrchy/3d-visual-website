"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { scrollState } from "@/lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    lenis.on("scroll", (instance) => {
      scrollState.progress = instance.progress;
      scrollState.velocity = instance.velocity;
      ScrollTrigger.update();
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add("lenis", "lenis-smooth");
    scrollState.ready = true;
    scrollState.progress = 0;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      scrollState.ready = false;
    };
  }, [enabled]);
}
