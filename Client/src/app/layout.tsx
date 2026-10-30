import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { ReducedMotionGate } from "@/components/ui/ReducedMotionGate";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "KODE / LUMEN Labs — Immersive 3D Studio",
    template: "%s · KODE / LUMEN Labs",
  },
  description:
    "Enter the work. Portfolio-grade immersive WebGL studio experiences by KODE / LUMEN Labs.",
  openGraph: {
    title: "KODE / LUMEN Labs",
    description: "Immersive 3D studio site — navigable atriums and project dioramas.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${code.variable} h-full antialiased`}
    >
      <body className="relative min-h-full overflow-x-hidden bg-[#050508] text-[14px] text-[#F3F4F7]">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-[14px] text-[#9AA3B5]">
              Loading…
            </div>
          }
        >
          <AppProviders>
            <ReducedMotionGate>
              <a href="#main" className="skip-link">
                Skip to content
              </a>
              <SiteHeader />
              <main id="main" className="relative min-h-screen">
                {children}
              </main>
            </ReducedMotionGate>
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
