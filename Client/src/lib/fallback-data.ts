import type { Experiment, Project, WorldNote } from "./api";

/** Local fallbacks so the UI works before Postgres is migrated. */
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-1",
    slug: "signal-atrium",
    title: "Signal Atrium",
    tagline: "A navigable lobby for spatial brand experiences.",
    description:
      "We designed a real-time atrium where visitors walk between project portals, leave notes in space, and tune lighting quality without leaving the WebGL canvas.",
    coverImage: "/images/projects/signal-atrium.svg",
    year: 2025,
    clientName: "LUMEN Labs",
    roles: ["Direction", "WebGL", "Interaction"],
    tech: ["R3F", "drei", "GSAP", "NestJS"],
    sceneConfig: {
      camera: { position: [0, 1.6, 6], target: [0, 1, 0], fov: 42 },
      theme: { primary: "#4AF2C8", secondary: "#6B8CFF", accent: "#FF5C7A" },
      diorama: "signal",
    },
    gallery: [],
    featured: true,
    sortOrder: 1,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    slug: "orbit-material-lab",
    title: "Orbit Material Lab",
    tagline: "Configurable metalness, bloom, and particle density.",
    description:
      "An interactive product stage inspired by iyO craft. Clients spin a hero object, swap PBR parameters, and preview postprocessing presets.",
    coverImage: "/images/projects/orbit-lab.svg",
    year: 2025,
    clientName: "Orbit Devices",
    roles: ["Shaders", "UX", "Frontend"],
    tech: ["Three.js", "postprocessing", "Redux", "zod"],
    sceneConfig: {
      camera: { position: [2.4, 1.8, 4.2], target: [0, 0.6, 0], fov: 40 },
      theme: { primary: "#6B8CFF", secondary: "#4AF2C8", accent: "#F3F4F7" },
      diorama: "orbit",
    },
    gallery: [],
      featured: false,
      sortOrder: 2,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    slug: "vast-threshold",
    title: "Vast Threshold",
    tagline: "Interior–exterior threshold with soft volumetric light.",
    description:
      "A cinematic threshold scene balancing architectural calm and brand heat.",
    coverImage: "/images/projects/vast-threshold.svg",
    year: 2024,
    clientName: "Threshold Collective",
    roles: ["Environment", "Lighting", "Narrative"],
    tech: ["R3F", "HDRI", "framer-motion"],
    sceneConfig: {
      camera: { position: [-3, 2, 5], target: [0, 1, 0], fov: 45 },
      theme: { primary: "#FF5C7A", secondary: "#9AA3B5", accent: "#4AF2C8" },
      diorama: "threshold",
    },
    gallery: [],
    featured: false,
    sortOrder: 3,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

export const FALLBACK_NOTES: WorldNote[] = [
  {
    id: "note-1",
    author: "Maya",
    message: "The atrium lighting feels like KODE at dusk.",
    color: "#4AF2C8",
    x: -1.2,
    y: 1.4,
    z: 0.8,
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "note-2",
    author: "Kenji",
    message: "Leave a note — it floats until we approve it.",
    color: "#6B8CFF",
    x: 1.4,
    y: 1.8,
    z: -0.6,
    approved: true,
    createdAt: new Date().toISOString(),
  },
];

export const FALLBACK_EXPERIMENTS: Experiment[] = [
  {
    id: "exp-1",
    slug: "bloom-sandbox",
    title: "Bloom Sandbox",
    summary: "Toggle bloom intensity against a rotating emissive lattice.",
    configJson: { bloomIntensity: 1.2, latticeDensity: 24 },
    published: true,
  },
];
