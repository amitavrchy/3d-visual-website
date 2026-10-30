# 3D Visual Website — Project Build Spec (Agent-Ready)

> Stack: Next.js + Redux + RQ + RHF/zod + framer-motion + **three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, gsap, leva**. NestJS + Prisma + JWT. Optional: `maath`, `three-stdlib`, `@react-three/rapier` (stretch), `valtio` ❌ use Redux instead for scene UI state.

---

## 1. Vision & Audience

**Vision:** A portfolio-grade **immersive 3D studio site** for fictional studio **“KODE / LUMEN Labs”** — WebGL as the primary medium: navigable scenes, project dioramas, configurable materials, postprocessing beauty, without abandoning content clarity. Inspired by Messenger (character space), Vast (interior/exterior WebGL), Orage, iyO craft, KODE Immersive.

**Audience:** Creative directors hiring studios; Awwwards jurors; 3D/web engineers; brand clients.

**Promise:** “Enter the work. Don’t just scroll past it.”

---

## 2. References

| Site | Steal | Link |
|------|-------|------|
| Messenger | Character navigation, configurable avatars — SOTD high score | https://www.awwwards.com/sites/messenger |
| iyO | Product WebGL excellence, shaders, exploded views | https://www.awwwards.com/sites/iyo |
| Vast | Interior/exterior WebGL experiences — SOTD | https://www.awwwards.com/sites/vast |
| Orage | 3D + drag interactions — SOTD | https://www.awwwards.com/sites/orage |
| KODE Immersive | Immersive studio positioning — SOTD 2025 | https://www.awwwards.com/sites/kode-immersive |

---

## 3. Design System

### Color
| Token | Hex |
|-------|-----|
| `--abyss` | `#050508` |
| `--panel` | `#0F1118` |
| `--grid` | `#22263A` |
| `--text` | `#F3F4F7` |
| `--muted` | `#9AA3B5` |
| `--signal` | `#4AF2C8` |
| `--hot` | `#FF5C7A` |
| `--cool` | `#6B8CFF` |

UI is glass panels over WebGL (`backdrop-filter` careful on perf — prefer solid translucent).

### Typography
- Display: `Space Grotesk`
- Body: `Inter`
- Code/labels: `JetBrains Mono`

### Motion / 3D principles
- Camera: drei `CameraControls` or custom lerp; never nausea-inducing FOV
- Postprocessing: selective Bloom + Vignette + SMAA; toggleable Quality Low/Med/High
- Leva panel **dev only** (`process.env.NODE_ENV === 'development'`)
- GSAP for HTML overlay timelines; R3F frame loop for world
- Loading: suspense + blurred project poster; progress `%`

---

## 4. Sitemap

### `/`
Immersive landing scene (studio atrium). Hotspots → Projects / About / Contact. HTML overlay intro copy.

### `/work` · `/work/[slug]`
Project list as 3D gallery wall OR hybrid grid with WebGL preview on hover. Case study: problem/solution, media, tech stack chips, embedded scene variant.

### `/playground`
Interactive lab: material configurator (metalness/roughness/color), particle density, post FX toggles — state in Redux `sceneUiSlice`.

### `/about`
Team with optional lightweight avatar meshes; philosophy; clients logo wall (2D fine).

### `/contact`
Form (RHF+zod) + optional “leave a note in the 3D world” that drops a floating message mesh (stored via API).

### `/lab/[experiment]` stretch routes
### Admin: projects CMS, messages moderation

**Signature:** Navigable atrium; project diorama scenes; quality settings; contact notes in-world; leva-free production UI for same controls.

---

## 5. Features

### MVP
- R3F atrium with 3–5 hotspot portals
- Projects from Nest with `sceneConfig` JSON
- At least 2 unique project scenes (reuse lighting kit)
- Playground material + bloom controls (production UI)
- Contact form + optional world notes
- Quality preset + reduced motion → 2D portfolio fallback route `/work` static

### Stretch
- Rapier physics toys
- Multiplayer presence (skip)
- GLTF upload admin
- Pathtracing (too heavy — skip)

---

## 6. Frontend Architecture

```
components/canvas/
  AppCanvas.tsx          # dynamic ssr:false, dpr, performance
  lights/StudioLighting.tsx
  post/Effects.tsx
  scenes/Atrium.tsx
  scenes/ProjectDiorama.tsx
  hotspots/Hotspot.tsx
features/sceneUi/sceneUiSlice.ts  # quality, bloom, selectedMaterial, mute
features/auth/authSlice.ts
lib/gltf.ts
```

**Redux sceneUi:** `{ quality: 'low'|'med'|'high', bloom: boolean, exposure: number, playground: {...} }`.
**React Query:** projects, project detail, post contact, world notes.
**Assets:** `/public/models/*.glb`, `/public/hdr/*.hdr` (document free Poly Haven HDR).

**Recommended adds:** `maath`, `three-stdlib` if not pulled by drei.

---

## 7. Backend Prisma

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

enum Role { VISITOR ADMIN }

model User {
  id String @id @default(cuid())
  email String @unique
  passwordHash String
  name String
  role Role @default(ADMIN)
}

model Project {
  id String @id @default(cuid())
  slug String @unique
  title String
  tagline String
  description String
  coverImage String
  year Int?
  clientName String?
  roles String[]
  tech String[]
  sceneConfig Json  // camera, modelUrl, hotspot offsets, theme colors
  gallery String[]
  featured Boolean @default(false)
  sortOrder Int @default(0)
  published Boolean @default(true)
  createdAt DateTime @default(now())
}

model WorldNote {
  id String @id @default(cuid())
  author String
  message String
  color String @default("#4AF2C8")
  x Float
  y Float
  z Float
  approved Boolean @default(false)
  createdAt DateTime @default(now())
}

model ContactMessage {
  id String @id @default(cuid())
  name String
  email String
  company String?
  budget String?
  message String
  createdAt DateTime @default(now())
}

model Experiment {
  id String @id @default(cuid())
  slug String @unique
  title String
  summary String
  configJson Json
  published Boolean @default(false)
}
```

### Endpoints
| Method | Path | Auth |
|--------|------|------|
| GET | `/projects` `/projects/:slug` | public |
| CRUD | `/projects` | ADMIN |
| GET | `/world-notes` | public | approved only |
| POST | `/world-notes` | public | creates unapproved |
| PATCH | `/world-notes/:id/approve` | ADMIN |
| POST | `/contact` | public |
| GET | `/experiments` | public |

---

## 8. Perf / A11y / SEO

- **Budgets:** initial JS careful; load GLB only when scene enters; Draco compression
- Quality presets: low disables bloom/shadows, dpr 1; high allows bloom + shadows mapSize 1024
- Fallback `/work` CSS grid always linked from gate “Skip 3D”
- Keyboard: Tab hotspots; Enter activate; Esc open menu
- SEO: project case studies fully crawlable HTML (not canvas-only text)
- Lighthouse: Home with 3D may score Perf 50–70 — About/Work HTML ≥90 required

---

## 9. Build Order

1. AppCanvas + StudioLighting + Effects + quality slice
2. Atrium scene + hotspot routing
3. Nest projects seed + Work HTML pages
4. Project diorama from `sceneConfig`
5. Playground controls
6. Contact + world notes
7. Reduced-motion / Skip 3D path
8. Admin CMS + polish GSAP overlays

## 10. Acceptance

- [ ] User can navigate atrium hotspots to Work/About/Contact
- [ ] Quality preset measurably changes effect pipeline
- [ ] Project pages readable without WebGL
- [ ] World note appears after admin approve
- [ ] Leva not shipped in production bundle
- [ ] Contact message stored in Postgres
- [ ] No zustand; scene state in Redux
