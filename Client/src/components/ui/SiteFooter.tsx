"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLANETS } from "@/lib/planets";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative z-20 border-t border-[#22263A] px-6 py-10 text-[14px] text-[#9AA3B5]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="display-font text-[22px] text-[#F3F4F7]">
            ORBIT <span className="text-[#4AF2C8]">/</span> Solar
          </p>
          <p className="mt-2 max-w-sm text-[15px] leading-relaxed">
            An animated WebGL solar system with dedicated planet pages and NASA-style facts.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/" className="hover:text-[#4AF2C8]">
            System
          </Link>
          {PLANETS.map((p) => (
            <Link key={p.slug} href={`/planets/${p.slug}`} className="hover:text-[#4AF2C8]">
              {p.name}
            </Link>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[13px] text-[#5a6178]">
        (c) {new Date().getFullYear()} ORBIT / Solar -- textures CC-BY Solar System Scope
      </p>
    </footer>
  );
}
