# 3D Visual Website — KODE / LUMEN Labs

Portfolio-grade immersive 3D studio site. **Client** (Next.js) and **Server** (NestJS) deploy separately.

| Folder | Stack | Default port |
|--------|-------|--------------|
| `Client/` | Next.js, R3F, Redux, React Query, RHF/zod, GSAP | 3000 |
| `Server/` | NestJS, Prisma, PostgreSQL, JWT | 4000 |

See `PROJECT_SPEC.md` for the full product spec.

## Quick start

```bash
# API
cd Server
cp .env.example .env
docker compose up -d
npm install && npx prisma migrate deploy && npm run prisma:seed
npm run start:dev

# Web
cd ../Client
cp .env.example .env.local
npm install && npm run dev
```

Font size floor across the UI: **14px**.
