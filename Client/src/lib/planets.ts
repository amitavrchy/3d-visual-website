export type PlanetSlug =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export type PlanetData = {
  slug: PlanetSlug;
  name: string;
  order: number;
  orbitRadius: number;
  size: number;
  orbitSpeed: number;
  spinSpeed: number;
  tilt: number;
  texture: string;
  accent: string;
  summary: string;
  diameterKm: string;
  distanceAu: string;
  dayLength: string;
  yearLength: string;
  moons: string;
  temperature: string;
  facts: string[];
  /** Diameter relative to Earth (Earth = 1) */
  sizeVsEarth: number;
  /** Approximate moon count for visuals */
  moonCount: number;
  cuteBubble: string;
  gradientFrom: string;
  gradientTo: string;
};

export const PLANETS: PlanetData[] = [
  {
    slug: "mercury",
    name: "Mercury",
    order: 1,
    orbitRadius: 4.2,
    size: 0.28,
    orbitSpeed: 0.48,
    spinSpeed: 0.15,
    tilt: 0.034,
    texture: "/textures/planets/2k_mercury.webp",
    accent: "#b1b1b1",
    summary: "The swiftest planet -- a cratered world of extremes closest to the Sun.",
    diameterKm: "4,879 km",
    distanceAu: "0.39 AU",
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    moons: "0",
    temperature: "-180 C to 430 C",
    facts: [
      "Mercury has almost no atmosphere to trap heat, so nights are bitterly cold.",
      "A year on Mercury is shorter than its own day.",
      "Its surface is covered in ancient impact basins like Caloris.",
    ],
    sizeVsEarth: 0.38,
    moonCount: 0,
    cuteBubble: "Speedy little rock!",
    gradientFrom: "#1a1a1e",
    gradientTo: "#050508",
  },
  {
    slug: "venus",
    name: "Venus",
    order: 2,
    orbitRadius: 5.6,
    size: 0.4,
    orbitSpeed: 0.35,
    spinSpeed: -0.04,
    tilt: 3.1,
    texture: "/textures/planets/2k_venus_atmosphere.webp",
    accent: "#e8c37a",
    summary: "Earth's twin in size -- wrapped in a runaway greenhouse of toxic clouds.",
    diameterKm: "12,104 km",
    distanceAu: "0.72 AU",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    moons: "0",
    temperature: "~465 C (surface)",
    facts: [
      "Venus spins backwards relative to most planets in the solar system.",
      "Its thick CO2 atmosphere creates crushing surface pressure.",
      "A day on Venus lasts longer than its year.",
    ],
    sizeVsEarth: 0.95,
    moonCount: 0,
    cuteBubble: "Hot, cloudy, and backwards!",
    gradientFrom: "#2a1f12",
    gradientTo: "#050508",
  },
  {
    slug: "earth",
    name: "Earth",
    order: 3,
    orbitRadius: 7.2,
    size: 0.42,
    orbitSpeed: 0.28,
    spinSpeed: 0.55,
    tilt: 0.41,
    texture: "/textures/planets/2k_earth_daymap.webp",
    accent: "#4AF2C8",
    summary: "Our living world -- oceans, continents, and a protective atmosphere.",
    diameterKm: "12,742 km",
    distanceAu: "1.00 AU",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    moons: "1 (Moon)",
    temperature: "-88 C to 58 C",
    facts: [
      "Earth is the only known planet that hosts life.",
      "About 71% of the surface is covered by water.",
      "The Moon stabilizes Earth's axial tilt and drives tides.",
    ],
    sizeVsEarth: 1,
    moonCount: 1,
    cuteBubble: "Home sweet home!",
    gradientFrom: "#0a1f1a",
    gradientTo: "#050508",
  },
  {
    slug: "mars",
    name: "Mars",
    order: 4,
    orbitRadius: 9.0,
    size: 0.32,
    orbitSpeed: 0.22,
    spinSpeed: 0.5,
    tilt: 0.44,
    texture: "/textures/planets/2k_mars.webp",
    accent: "#ff6b4a",
    summary: "The red planet -- dusty deserts, polar ice, and towering volcanoes.",
    diameterKm: "6,779 km",
    distanceAu: "1.52 AU",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    moons: "2 (Phobos, Deimos)",
    temperature: "-125 C to 20 C",
    facts: [
      "Olympus Mons is the tallest volcano in the solar system.",
      "Mars has seasons similar to Earth due to its axial tilt.",
      "Evidence suggests liquid water once flowed on the surface.",
    ],
    sizeVsEarth: 0.53,
    moonCount: 2,
    cuteBubble: "Rusty and adventurous!",
    gradientFrom: "#2a1210",
    gradientTo: "#050508",
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    order: 5,
    orbitRadius: 12.4,
    size: 1.05,
    orbitSpeed: 0.12,
    spinSpeed: 0.95,
    tilt: 0.05,
    texture: "/textures/planets/2k_jupiter.webp",
    accent: "#d4a574",
    summary: "The giant -- a swirling storm world that shields the inner planets.",
    diameterKm: "139,820 km",
    distanceAu: "5.20 AU",
    dayLength: "9.9 hours",
    yearLength: "11.9 Earth years",
    moons: "95+",
    temperature: "~-110 C (cloud tops)",
    facts: [
      "The Great Red Spot is a storm larger than Earth.",
      "Jupiter is mostly hydrogen and helium.",
      "Its magnetic field is the strongest of any planet.",
    ],
    sizeVsEarth: 11.2,
    moonCount: 8,
    cuteBubble: "King of the storms!",
    gradientFrom: "#2a1e12",
    gradientTo: "#050508",
  },
  {
    slug: "saturn",
    name: "Saturn",
    order: 6,
    orbitRadius: 15.6,
    size: 0.9,
    orbitSpeed: 0.09,
    spinSpeed: 0.85,
    tilt: 0.47,
    texture: "/textures/planets/2k_saturn.webp",
    accent: "#f0d9a0",
    summary: "The ringed jewel -- ice and rock particles orbiting in delicate bands.",
    diameterKm: "116,460 km",
    distanceAu: "9.58 AU",
    dayLength: "10.7 hours",
    yearLength: "29.4 Earth years",
    moons: "146+",
    temperature: "~-140 C",
    facts: [
      "Saturn's rings span hundreds of thousands of kilometers but are thin.",
      "It is less dense than water -- it would float in a giant bathtub.",
      "Titan, its largest moon, has lakes of liquid methane.",
    ],
    sizeVsEarth: 9.45,
    moonCount: 6,
    cuteBubble: "Look at those rings!",
    gradientFrom: "#2a2414",
    gradientTo: "#050508",
  },
  {
    slug: "uranus",
    name: "Uranus",
    order: 7,
    orbitRadius: 18.4,
    size: 0.62,
    orbitSpeed: 0.06,
    spinSpeed: 0.6,
    tilt: 1.71,
    texture: "/textures/planets/2k_uranus.webp",
    accent: "#7ec8e3",
    summary: "The ice giant tipped on its side -- pale cyan methane haze.",
    diameterKm: "50,724 km",
    distanceAu: "19.2 AU",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    moons: "28",
    temperature: "~-195 C",
    facts: [
      "Uranus rotates nearly on its side, likely from an ancient collision.",
      "Methane in the atmosphere gives it a blue-green color.",
      "It has faint rings discovered in 1977.",
    ],
    sizeVsEarth: 4,
    moonCount: 4,
    cuteBubble: "Tipped over ice giant!",
    gradientFrom: "#0e1e28",
    gradientTo: "#050508",
  },
  {
    slug: "neptune",
    name: "Neptune",
    order: 8,
    orbitRadius: 21.2,
    size: 0.6,
    orbitSpeed: 0.045,
    spinSpeed: 0.55,
    tilt: 0.49,
    texture: "/textures/planets/2k_neptune.webp",
    accent: "#4169e1",
    summary: "The farthest planet -- deep blue winds and dark storms.",
    diameterKm: "49,244 km",
    distanceAu: "30.1 AU",
    dayLength: "16.1 hours",
    yearLength: "165 Earth years",
    moons: "16",
    temperature: "~-200 C",
    facts: [
      "Neptune has the fastest winds in the solar system, over 2,000 km/h.",
      "It was the first planet found by mathematical prediction.",
      "Triton orbits backwards and may be a captured Kuiper Belt object.",
    ],
    sizeVsEarth: 3.88,
    moonCount: 4,
    cuteBubble: "Windiest world ever!",
    gradientFrom: "#0c1430",
    gradientTo: "#050508",
  },
];

export const SUN = {
  size: 2.2,
  texture: "/textures/planets/2k_sun.webp",
};

export const TEXTURE_CREDIT =
  "Planet and sky textures based on Solar System Scope (www.solarsystemscope.com/textures), licensed CC-BY 4.0. NASA fact references.";

export function getPlanet(slug: string): PlanetData | undefined {
  return PLANETS.find((p) => p.slug === slug);
}

export function getAdjacent(slug: PlanetSlug): {
  prev: PlanetData;
  next: PlanetData;
} {
  const i = PLANETS.findIndex((p) => p.slug === slug);
  const prev = PLANETS[(i - 1 + PLANETS.length) % PLANETS.length]!;
  const next = PLANETS[(i + 1) % PLANETS.length]!;
  return { prev, next };
}
