"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (
    pathname === "/" ||
    pathname.startsWith("/playground") ||
    pathname.startsWith("/lab")
  ) {
    return null;
  }

  return (
    <footer className="relative z-20 border-t border-[#22263A] px-6 py-10 text-[14px] text-[#9AA3B5]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="display-font text-[22px] text-[#F3F4F7]">
            KODE <span className="text-[#4AF2C8]">/</span> LUMEN
          </p>
          <p className="mt-2 max-w-sm text-[15px] leading-relaxed">
            Immersive product studio. WebGL as the medium — clarity as the
            contract.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/work" className="hover:text-[#4AF2C8]">
            Work
          </Link>
          <Link href="/playground" className="hover:text-[#4AF2C8]">
            Lab
          </Link>
          <Link href="/about" className="hover:text-[#4AF2C8]">
            Studio
          </Link>
          <Link href="/contact" className="hover:text-[#4AF2C8]">
            Brief
          </Link>
          <Link href="/admin" className="hover:text-[#4AF2C8]">
            Admin
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[14px] text-[#22263A]">
        © {new Date().getFullYear()} KODE / LUMEN Labs — portfolio demo product
      </p>
    </footer>
  );
}
