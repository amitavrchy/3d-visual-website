# 3D Visual Website — LUMEN Origin (Agent-Ready Spec)

> Stack: Next.js + Redux Toolkit + RQ + RHF/zod + framer-motion + **three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, gsap, lenis**. NestJS + Prisma 6 + JWT.

---

## 1. Vision & Audience

**Vision:** A portfolio-grade **cinematic scroll WebGL experience** for fictional studio **LUMEN Labs** titled **Origin** — the birth of light as a metaphor for creative work becoming form. One coherent narrative drives every visual.

**Audience:** Creative directors; Awwwards/FWA jurors; 3D/web engineers; brand clients.

**Promise:** "Scroll the birth of light. Leave with meaning."

**References (techniques stolen):**
| Site | Steal |
|------|-------|
| Igloo Inc (Awwwards SOTY 2024) | Cinematic camera journey through one continuous world |
| Lusion v3 | Scroll-forward 3D picture; cursor-reactive beauty |
| Pioneer / Persepolis | Unbroken scroll-driven camera path with chapter meaning |
| Active Theory / Prometheus | Chapter narrative + interactive scroll moments |
| Bruno Simon | Memorable singular concept, not generic shapes |

---

## 2. Concept — LUMEN Origin

A single photon of intention travels from **void → spark → ignition → nebula → crystal → awakening**. Typography and camera chapters are inseparable from the shaders they reveal. This is not a decorative blob farm; every scene answers "what does creation feel like?"

### Chapters
| # | Id | Visual | Copy intent |
|---|----|--------|-------------|
| 01 | void | Sparse drifting starfield, deep fog | Before form, waiting |
| 02 | spark | Noise-displaced iridescent icosahedron | A single intention |
| 03 | ignition | Bloom peak + additive light rays | Light finds direction |
| 04 | nebula | GPU spiral galaxy particles | Matter gathers |
| 05 | crystal | Metallic octahedra crystallize | Pattern becomes structure |
| 06 | awakening | Soft core + CTA | Creation begins with you |

---

## 3. Design System

| Token | Hex |
|-------|-----|
| `--abyss` | `#03040a` |
| `--panel` | `#0F1118` |
| `--text` | `#F3F4F7` |
| `--muted` | `#9AA3B5` |
| `--signal` | `#4AF2C8` |
| `--hot` | `#FF5C7A` |
| `--cool` | `#6B8CFF` |

- Display: Space Grotesk · Body: Inter · Labels: JetBrains Mono
- Post: Bloom + ChromaticAberration + Noise + Vignette (quality-gated)
- Scroll: Lenis + GSAP ticker; mutable `scrollState` for 60fps R3F
- Camera: keyframed path + mouse parallax damp
- Loader: branded progress bar before experience unlocks
- Quality Low/Med/High via Redux `sceneUiSlice` (dpr clamp)

---

## 4. Sitemap

### `/` — Origin experience (primary)
Fixed WebGL canvas + 600vh scroll chapters + overlay UI + intro loader.

### `/work`, `/work/[slug]`, `/playground`, `/about`, `/contact`, `/admin`
Existing studio pages remain for case studies / lab / contact.

---

## 5. Implementation notes for agents

- Custom GLSL: `IridescentBlob`, `GalaxyField`, `VoidParticles`
- Do **not** use zustand — Redux for UI; module `scrollState` for scroll progress
- `npm run build` must pass; keep dpr ≤ 2; hide heavy effects on `quality === "low"`
- Author commits as amitavrchy (`155712340+amitavrchy@users.noreply.github.com`)
