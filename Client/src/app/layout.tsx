import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteFooter } from "@/components/ui/SiteFooter";
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
    default: "LUMEN — Origin | Immersive 3D Experience",
    template: "%s · LUMEN",
  },
  description:
    "A cinematic scroll journey through the birth of light — Void, Spark, Ignition, Nebula, Crystal, Awakening. By LUMEN Labs.",
  openGraph: {
    title: "LUMEN — Origin",
    description: "Scroll-driven WebGL narrative: the origin of light.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${code.variable} h-full antialiased`}
    >
      <body className="relative min-h-full overflow-x-hidden bg-[#03040a] text-[14px] text-[#F3F4F7]">
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
              <SiteFooter />
            </ReducedMotionGate>
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
