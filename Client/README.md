# KODE / LUMEN Labs — Client

Next.js immersive 3D studio frontend. Deploy this folder independently from `Server/`.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev                   # http://localhost:3000
```

Set `NEXT_PUBLIC_API_URL` to your Nest API (default `http://localhost:4000`).

The UI falls back to seeded local project data if the API is unreachable.

## Routes

- `/` — WebGL atrium + hotspots
- `/work` · `/work/[slug]` — HTML gallery + diorama
- `/playground` — material / particle / FX lab (Redux)
- `/about` · `/contact` · `/admin` · `/lab/[experiment]`

## Design

Font size floor: **14px**. Tokens in `src/app/globals.css` (`--abyss`, `--signal`, …).

## Deploy

```bash
npm run build
npm run start
```
