# KODE / LUMEN Labs — Server

NestJS + Prisma + JWT API. Deploy this folder independently from `Client/`.

## Setup

```bash
cp .env.example .env
docker compose up -d          # Postgres on :5432
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run start:dev             # http://localhost:4000
```

Default admin: `admin@lumenlabs.studio` / `admin123!`

## Endpoints

| Method | Path | Auth |
|--------|------|------|
| GET | `/` `/health` | public |
| POST | `/auth/login` | public |
| GET | `/auth/me` | JWT |
| GET | `/projects` `/projects/:slug` | public |
| CRUD | `/projects` | ADMIN |
| GET | `/world-notes` | public (approved) |
| POST | `/world-notes` | public |
| PATCH | `/world-notes/:id/approve` | ADMIN |
| POST | `/contact` | public |
| GET | `/contact` | ADMIN |
| GET | `/experiments` | public |

## Deploy

Build with `npm run build`, start with `npm run start:prod`. Set `DATABASE_URL`, `JWT_SECRET`, `CLIENT_ORIGIN`, and `PORT`.
