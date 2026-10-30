"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Lab" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Brief" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isImmersive = pathname === "/" || pathname.startsWith("/playground");

  return (
    <header
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6",
        !isImmersive && "bg-gradient-to-b from-[#050508] to-transparent",
      )}
    >
      <Link
        href="/"
        className="pointer-events-auto display-font text-[20px] font-semibold tracking-tight text-[#F3F4F7] md:text-[24px]"
        aria-label="KODE / LUMEN home"
      >
        KODE <span className="text-[#4AF2C8]">/</span> LUMEN
      </Link>

      <nav className="pointer-events-auto flex flex-wrap items-center justify-end gap-1 md:gap-2">
        {LINKS.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "mono-label rounded-md px-2.5 py-2 text-[14px] transition-colors",
                active
                  ? "bg-[#4AF2C8]/12 text-[#4AF2C8]"
                  : "text-[#9AA3B5] hover:text-[#F3F4F7]",
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/work"
          className="mono-label ml-1 hidden rounded-md border border-[#F3F4F7]/15 px-3 py-2 text-[14px] text-[#9AA3B5] transition hover:border-[#4AF2C8] hover:text-[#4AF2C8] sm:inline-block"
        >
          Skip 3D
        </Link>
        <Link
          href="/contact"
          className="ml-1 rounded-md bg-[#4AF2C8] px-3 py-2 text-[14px] font-semibold text-[#050508] transition hover:bg-[#7af7d8]"
        >
          Start a brief
        </Link>
      </nav>
    </header>
  );
}
