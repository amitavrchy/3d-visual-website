"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { PLANETS } from "@/lib/planets";

const LINKS = [
  { href: "/", label: "System" },
  { href: "/planets/earth", label: "Planets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onPlanet = pathname.startsWith("/planets");

  return (
    <header
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6",
        !isHome && "bg-gradient-to-b from-[#050508] to-transparent",
      )}
    >
      <Link
        href="/"
        className="pointer-events-auto display-font text-[20px] font-semibold tracking-tight text-[#F3F4F7] md:text-[24px]"
        aria-label="Solar System home"
      >
        ORBIT <span className="text-[#4AF2C8]">/</span>{" "}
        <span className="text-[#9AA3B5]">Solar</span>
      </Link>

      <nav className="pointer-events-auto flex flex-wrap items-center justify-end gap-1 md:gap-2">
        {LINKS.map((link) => {
          const active =
            link.href === "/"
              ? isHome
              : link.href.startsWith("/planets")
                ? onPlanet
                : pathname.startsWith(link.href);
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
        <div className="ml-1 hidden items-center gap-1 lg:flex">
          {PLANETS.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/planets/${p.slug}`}
              className="mono-label rounded-full border border-white/10 px-2 py-1 text-[10px] text-[#9AA3B5] hover:border-[#4AF2C8]/40 hover:text-[#4AF2C8]"
            >
              {p.name.slice(0, 3)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
