export type CaseStudyExtra = {
  problem: string;
  approach: string;
  outcome: string;
  deliverables: string[];
};

export const CASE_STUDIES: Record<string, CaseStudyExtra> = {
  "signal-atrium": {
    problem:
      "The client needed a hiring and pitch surface that felt like entering the studio — not a scroll of case-study cards. Directors were bouncing after three screenshots.",
    approach:
      "We built a navigable WebGL atrium with portal hotspots, quality presets for laptop vs desktop, and HTML overlays that stay crawlable. Camera motion stays gentle; content never lives only on canvas.",
    outcome:
      "Average session depth rose; creative directors could orbit the work before booking a call. The atrium became the default first meeting room.",
    deliverables: [
      "Realtime atrium scene",
      "Hotspot routing system",
      "Quality + reduced-motion fallbacks",
      "World-note moderation CMS",
    ],
  },
  "orbit-material-lab": {
    problem:
      "Hardware marketing locked finishes too early. Stakeholders argued over metalness and bloom from stills that never matched the product stage.",
    approach:
      "A live PBR playground with Redux-backed controls — same knobs in production UI and (dev-only) Leva. Particle density and post FX toggle without rebuilds.",
    outcome:
      "Design and marketing aligned on a finish in one workshop. The lab ships as an embeddable configurator pattern for future SKUs.",
    deliverables: [
      "Material configurator",
      "Bloom / exposure presets",
      "Shareable playground state model",
      "Product-stage lighting kit",
    ],
  },
  "vast-threshold": {
    problem:
      "An architecture brand wanted interior–exterior continuity online without a nausea-inducing flythrough or a flat photo carousel.",
    approach:
      "A threshold diorama with soft emissive glass, constrained camera orbits, and narrative hotspots. HTML case copy carries SEO; the scene carries atmosphere.",
    outcome:
      "The threshold became the brand’s signature opener — calm enough for Awwwards jurors, clear enough for clients on mid-range laptops.",
    deliverables: [
      "Threshold environment",
      "Lighting + vignette kit",
      "Hybrid HTML / WebGL case study",
      "Performance quality ladder",
    ],
  },
};
