# 3D Visual Website -- ORBIT / Solar System (Agent-Ready Spec)

> Stack: Next.js 16 + Redux Toolkit + RQ + framer-motion + **three, @react-three/fiber, @react-three/drei, @react-three/postprocessing**. NestJS + Prisma 6 + JWT (API unchanged).

---

## 1. Vision & Audience

**Vision:** A portfolio-grade **fully animated 3D solar system** homepage. Hover planets for labels, click to fly the camera in, then land on dedicated planet pages with rotating 3D heroes and NASA-style facts.

**Audience:** Creative directors; Awwwards/FWA jurors; 3D/web engineers; educators; brand clients.

**Promise:** "Explore the solar system in the browser. Leave with wonder."

**Texture credit:** Solar System Scope textures (www.solarsystemscope.com/textures), CC-BY 4.0. Facts referenced from NASA planetary fact sheets.

---

## 2. Concept -- ORBIT / Solar

Home is a live WebGL solar system:
- **Sun** -- animated surface noise shader, corona glow, bloom, point lights
- **8 planets** -- Mercury through Neptune with real map textures, continuous orbits + axial spin
- **Earth** -- cloud layer + atmosphere glow + Moon
- **Saturn** -- ring mesh with alpha texture
- **Asteroid belt** -- ~900 instanced dodecahedra between Mars and Jupiter
- **Sky** -- milky-way starfield sphere
- **Interaction** -- hover highlight + HTML label; click triggers smooth camera fly-to then navigates to `/planets/[slug]`

Each planet page:
- Rotating 3D hero (same textures / rings / clouds)
- Stats: diameter, distance (AU), day/year length, moons, temperature
- Scroll-animated fact sections (framer-motion)
- Nav menu of all planets + previous / next + back to system

---

## 3. Tech notes

| Concern | Choice |
|---------|--------|
| State | Redux Toolkit only (`solarSlice`: hovered, focus, flying, paused) -- no zustand |
| Post | `@react-three/postprocessing` Bloom + Vignette + SMAA |
| Perf | `dpr={[1, 1.75]}`, instanced asteroids, frustumCulled false only where needed |
| Routing | App Router: `/` solar home, `/planets/[slug]` x8 |
| Brand | ORBIT / Solar (replaces LUMEN Origin) |

---

## 4. Key paths (Client)

- `src/components/solar/*` -- scene, sun, planets, belt, HUD, canvas, camera fly, planet hero
- `src/lib/planets.ts` -- data + facts + texture paths + credit
- `src/features/solar/solarSlice.ts`
- `public/textures/planets/*`, `public/textures/sky/*`

---

## 5. Out of scope / removed

- LUMEN Origin scroll chapters, crystal/galaxy shaders, Lenis-driven camera narrative (deleted)
- Zustand (never used)

API / Nest / Prisma remain as secondary CMS for other portfolio routes if present.
