# ORBIT / Solar System

A fully animated WebGL solar system you can hover, pause, and fly through, with a NestJS studio API beside it.

## Overview

ORBIT is an immersive portfolio in two parts that deploy on their own. The homepage is a live solar system: a shader-driven Sun, eight textured planets on continuous orbits, Earth's clouds and Moon, Saturn's rings, five hundred instanced asteroids, and a milky-way starfield. Hover a planet for its name. Click it and the camera eases in, then the app opens a page for that world with size, distance, day and year length, moons, temperature, and short facts.

The same Next.js app also carries the studio: selected work, project dioramas, a material playground, experiment pages, an about page, and a contact form. Those routes read from the NestJS API when it is reachable and use local fallback data when it is not.

The API stores projects, world notes, contact messages, and experiments in PostgreSQL, and guards admin actions with JWT.

## Key features

- **Living solar system.** Mercury through Neptune orbit and spin. Orbit rings highlight on hover. The HUD lists every world and can pause the motion.
- **Sun and sky.** The Sun has a noise surface shader, a fresnel corona, and a point light. The sky is a starfield sphere.
- **Earth and Saturn.** Earth carries a cloud shell, an atmosphere glow, and a Moon. Saturn wears an alpha-mapped ring.
- **Asteroid belt.** Five hundred instanced dodecahedra drift between Mars and Jupiter.
- **Fly-in.** A click runs a two-stage camera move, then a cover transition into `/planets/[slug]`. Each planet page has stat cards, a size comparison, an orbit diagram, fact sections, and previous / next navigation.
- **Performance ladder.** Low, medium, and high presets live in Redux. The low preset skips bloom, vignette, and SMAA. The app detects `prefers-reduced-motion` and always offers a skip link.
- **Studio routes.** `/work` and `/work/[slug]` for case studies and dioramas, `/playground` for materials and particles, `/lab/[experiment]` for published experiments, plus `/about`, `/contact` (validated with Zod), and `/admin`.
- **API.** Public reads for projects, approved notes, and experiments. Admin create, update, delete, and note approval sit behind JWT. `GET /health` reports status.
- **Textures.** Planet, ring, cloud, and sky maps ship as WebP, based on Solar System Scope maps under CC-BY 4.0. The facts follow NASA planetary fact sheets.

## Tech stack

![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r186-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)

| Part | Stack |
|------|--------|
| `Client/` | Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Three.js, React Three Fiber, Drei, postprocessing, Redux Toolkit, TanStack Query, Axios, React Hook Form, Zod, Framer Motion |
| `Server/` | NestJS 12, Prisma 6, PostgreSQL 16, Passport JWT, class-validator, bcrypt, Vitest, Docker |

## Project structure

```
.
├── Client/                          Next.js app
│   ├── src/app/                     Home, planets, work, playground, lab, about, contact, admin
│   ├── src/components/solar/        Sun, planets, belt, camera, HUD, planet pages
│   ├── src/components/canvas/       Atrium, diorama, and playground scenes
│   ├── src/components/ui/           Header, footer, quality panel
│   ├── src/features/                Redux slices for solar state, scene UI, and auth
│   ├── src/lib/                     Planet catalog, API client, offline fallbacks
│   ├── public/textures/             WebP planet, ring, cloud, and sky maps
│   ├── netlify.toml                 Client build (Node 22, publish `.next`)
│   └── package.json
└── Server/                          NestJS API
    ├── src/                         Auth, projects, world notes, contact, experiments
    ├── prisma/                      Schema, migration, seed
    ├── docker-compose.yml           PostgreSQL 16
    ├── Dockerfile                   Production image (Node 22)
    └── package.json
```

## Getting started

You need Node.js 22 and npm. The API also needs Docker so Postgres can run from `Server/docker-compose.yml`.

Install each app from its own folder. Copy the server example env file before `npm install`, because Prisma reads `DATABASE_URL` while generating the client.

### Server

```bash
cd Server
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run start:dev
```

`.env.example` defines these variables:

| Variable | Role |
|----------|------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Access-token signing secret |
| `JWT_REFRESH_SECRET` | Declared in `.env.example` next to the access-token secret |
| `PORT` | Port the API listens on |
| `CLIENT_ORIGIN` | Browser origins allowed by CORS, separated by commas when there is more than one |

The seed script creates an admin user and prints the email and password when it finishes. Use that login on the admin page.

Scripts: `npm run start:dev`, `npm run build`, `npm run start:prod`, `npm run lint`, `npm test`, `npm run prisma:seed`.

### Client

```bash
cd Client
cp .env.example .env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the origin of the API: scheme, host, and the port named by `PORT`. Work, contact, lab, and admin call that origin. If it cannot be reached, the UI uses the data in `src/lib/fallback-data.ts`.

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

`Client/netlify.toml` builds with Node 22 and publishes the Next.js output. The server image is `Server/Dockerfile`. A production API needs `DATABASE_URL`, `JWT_SECRET`, `CLIENT_ORIGIN`, and `PORT`.

## Author

**Amitav Roy Chowdhury**  
[github.com/amitavrchy](https://github.com/amitavrchy)
