"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HOTKEYS: Record<string, string> = {
  "1": "/work",
  "2": "/playground",
  "3": "/about",
  "4": "/contact",
  Escape: "/",
};

/** Number keys jump to atrium destinations; Esc returns home / opens menu feel. */
export function useHotspotKeyboard(enabled = true) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      const href = HOTKEYS[e.key];
      if (href) router.push(href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, router]);
}
