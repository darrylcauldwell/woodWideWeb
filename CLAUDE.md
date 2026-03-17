# Wood Wide Web — Project Instructions

## What This Is

A scroll-driven 3D visualisation of a real mycorrhizal fungal network. Static SPA — no backend, no database, no API. Built with React 19 + Three.js, served by Caddy in Docker.

## Tech Stack

- **React 19** + **TypeScript 5.9** + **Vite 8**
- **Three.js 0.183** via React Three Fiber 9 + Drei 10
- **Zustand 5** for state management
- **Caddy 2** for static file serving in Docker
- **GitHub Actions** → GHCR for CI/CD

## Commands

```bash
npm run dev        # Local dev server (port 5173)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint

docker compose up -d --build    # Full stack with observability (port 3000)
docker compose down
```

## File Conventions

| Pattern | Location |
|---------|----------|
| 3D scene components | `src/components/canvas/` |
| Scroll narrative sections | `src/components/overlay/` |
| Interactive UI panels | `src/components/ui/` |
| Custom hooks | `src/hooks/` |
| Zustand store | `src/stores/appStore.ts` |
| Type definitions | `src/types/network.ts` |
| Utility functions | `src/utils/` |
| Static dataset | `public/data/network.json` |

## Architecture Notes

- Two modes: **narrative** (scroll-driven camera) and **interactive** (OrbitControls + HUD)
- Mode state lives in `appStore.ts` — components read from the store, not prop drilling
- Network data is loaded once via `useNetworkData` hook, layout computed in `graphLayout.ts`
- Particles are animated in `useNutrientFlow` — 2000 particles on desktop, 400 on mobile
- The Caddyfile handles SPA routing (`try_files`) and reverse proxies `/grafana` and `/prometheus` to the observability stack

## Docker

- `docker-compose.yml` — standalone local dev (builds from source)
- `docker-compose.prod.yml` — production (pulls from GHCR)
- `meweb/docker-compose.yml` — include file for meWeb shared hosting
- Observability stack matches meWeb versions (Prometheus v2.50.0, Grafana 10.3.1, Loki 3.0.0, etc.)
- `node-exporter` won't start on macOS Docker Desktop — this is expected

## Dataset

Based on Beiler et al. (2010/2015). 67 trees, 27 Rhizopogon fungal genets, 220 edges in a 30x30m Douglas fir plot.
