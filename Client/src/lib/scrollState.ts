/** Mutable scroll state for 60fps R3F reads (avoids Redux thrash). */
export const scrollState = {
  progress: 0,
  velocity: 0,
  ready: false,
};

export type ChapterId =
  | "void"
  | "spark"
  | "ignition"
  | "nebula"
  | "crystal"
  | "awakening";

export type Chapter = {
  id: ChapterId;
  index: number;
  label: string;
  title: string;
  body: string;
  /** Normalized scroll range [start, end] */
  range: [number, number];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "void",
    index: 0,
    label: "01 — Void",
    title: "Before form,\nthere was waiting.",
    body: "Absolute silence. A field of almost-nothing. The moment before an idea chooses to become.",
    range: [0, 0.14],
  },
  {
    id: "spark",
    index: 1,
    label: "02 — Spark",
    title: "A single\nintention.",
    body: "Energy gathers into an iridescent core — unstable, luminous, alive with possibility.",
    range: [0.14, 0.3],
  },
  {
    id: "ignition",
    index: 2,
    label: "03 — Ignition",
    title: "Light finds\ndirection.",
    body: "The core ruptures into rays. Motion becomes purpose. Heat becomes meaning.",
    range: [0.3, 0.48],
  },
  {
    id: "nebula",
    index: 3,
    label: "04 — Nebula",
    title: "Matter\ngathers.",
    body: "A galaxy of particles orbit the birth. Chaos learns gravity. Fragments learn belonging.",
    range: [0.48, 0.66],
  },
  {
    id: "crystal",
    index: 4,
    label: "05 — Crystal",
    title: "Pattern becomes\nstructure.",
    body: "Geometry hardens from the dust. Facets catch light. Form finally holds.",
    range: [0.66, 0.84],
  },
  {
    id: "awakening",
    index: 5,
    label: "06 — Awakening",
    title: "Creation begins\nwith you.",
    body: "The journey settles into a quiet invitation. LUMEN Labs — where light becomes work.",
    range: [0.84, 1],
  },
];

export function chapterAt(progress: number): Chapter {
  for (const c of CHAPTERS) {
    if (progress >= c.range[0] && progress < c.range[1]) return c;
  }
  return CHAPTERS[CHAPTERS.length - 1]!;
}

export function chapterLocal(progress: number, chapter: Chapter): number {
  const [a, b] = chapter.range;
  if (b <= a) return 1;
  return Math.min(1, Math.max(0, (progress - a) / (b - a)));
}
