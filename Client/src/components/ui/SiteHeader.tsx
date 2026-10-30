"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Enter" },
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-4 p-4 md:p-6">
      <Link
        href="/"
        className="pointer-events-auto display-font text-[22px] font-semibold tracking-tight text-[#F3F4F7] md:text-[28px]"
      >
        KODE <span className="text-[#4AF2C8]">/</span> LUMEN
      </Link>
      <nav className="pointer-events-auto flex flex-wrap justify-end gap-2 md:gap-3">
        {LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "mono-label rounded px-2.5 py-1.5 text-[14px] transition-colors",
                active
                  ? "bg-[#4AF2C8]/15 text-[#4AF2C8]"
                  : "text-[#9AA3B5] hover:text-[#F3F4F7]",
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/work"
          className="mono-label rounded border border-[#22263A] px-2.5 py-1.5 text-[14px] text-[#9AA3B5] hover:border-[#4AF2C8] hover:text-[#4AF2C8]"
        >
          Skip 3D
        </Link>
      </nav>
    </header>
  );
}
