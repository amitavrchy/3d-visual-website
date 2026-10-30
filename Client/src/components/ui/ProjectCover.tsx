"use client";

import { cn } from "@/lib/cn";
import type { Project } from "@/lib/api";

type Props = {
  project: Project;
  className?: string;
  featured?: boolean;
};

export function ProjectCover({ project, className, featured }: Props) {
  const primary = project.sceneConfig.theme?.primary ?? "#4AF2C8";
  const secondary = project.sceneConfig.theme?.secondary ?? "#6B8CFF";
  const accent = project.sceneConfig.theme?.accent ?? "#FF5C7A";
  const kind = project.sceneConfig.diorama ?? "signal";

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[#22263A] bg-[#0A0B10]",
        featured ? "aspect-[21/9] md:aspect-[24/10]" : "aspect-[16/10]",
        className,
      )}
      style={{
        background: `
          radial-gradient(80% 70% at 20% 20%, ${primary}33 0%, transparent 55%),
          radial-gradient(70% 60% at 85% 75%, ${secondary}28 0%, transparent 50%),
          linear-gradient(160deg, #0A0B10 0%, #0F1118 100%)
        `,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`g-${project.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primary} stopOpacity="0.9" />
            <stop offset="100%" stopColor={secondary} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {kind === "orbit" ? (
          <>
            <ellipse
              cx="420"
              cy="250"
              rx="190"
              ry="78"
              fill="none"
              stroke={secondary}
              strokeWidth="2"
              opacity="0.7"
            />
            <ellipse
              cx="420"
              cy="250"
              rx="120"
              ry="48"
              fill="none"
              stroke={primary}
              strokeWidth="1.5"
              opacity="0.85"
            />
            <circle cx="420" cy="250" r="52" fill={`url(#g-${project.slug})`} />
            <circle cx="520" cy="210" r="8" fill={accent} />
          </>
        ) : kind === "threshold" ? (
          <>
            <rect x="250" y="90" width="40" height="320" fill="#1a1e2e" />
            <rect x="510" y="90" width="40" height="320" fill="#1a1e2e" />
            <rect x="250" y="90" width="300" height="28" fill="#141824" />
            <rect
              x="310"
              y="140"
              width="180"
              height="240"
              fill={primary}
              opacity="0.35"
            />
            <line
              x1="80"
              y1="420"
              x2="720"
              y2="420"
              stroke="#22263A"
              strokeWidth="2"
            />
          </>
        ) : (
          <>
            <circle
              cx="400"
              cy="230"
              r="100"
              fill="none"
              stroke={primary}
              strokeWidth="2"
              opacity="0.55"
            />
            <polygon
              points="400,150 470,270 330,270"
              fill={`url(#g-${project.slug})`}
              opacity="0.85"
            />
            <circle cx="400" cy="230" r="28" fill={accent} opacity="0.9" />
            <g stroke={secondary} strokeWidth="1" opacity="0.45">
              <line x1="160" y1="380" x2="640" y2="380" />
              <line x1="200" y1="400" x2="600" y2="400" />
            </g>
          </>
        )}
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508]/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <span className="mono-label text-[14px] text-[#F3F4F7]/85">
          {project.year ?? "—"} · {project.clientName ?? "Studio"}
        </span>
        {project.featured ? (
          <span className="mono-label text-[14px] text-[#4AF2C8]">Featured</span>
        ) : null}
      </div>
    </div>
  );
}
