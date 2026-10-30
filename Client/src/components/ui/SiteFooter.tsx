import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-[#22263A] px-6 py-8 text-[14px] text-[#9AA3B5]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="display-font text-[16px] text-[#F3F4F7]">
          KODE / LUMEN Labs
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/work" className="hover:text-[#4AF2C8]">
            Work
          </Link>
          <Link href="/contact" className="hover:text-[#4AF2C8]">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-[#4AF2C8]">
            Admin
          </Link>
          <a
            href="https://polyhaven.com/hdris"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#4AF2C8]"
          >
            HDR credits
          </a>
        </nav>
      </div>
    </footer>
  );
}
