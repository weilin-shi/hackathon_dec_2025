# Atlas Dashboard (Next.js static export)

Lightweight dashboard shell for Vercel. Ships as a static export with a sidebar + chart-ready main area.

## Running locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Build & export

```bash
npm run build
npm run export
```

The static output lands in `out/`. Deploy to Vercel by connecting the repo and keeping the default Next.js build command (`next build`). Static export is enabled via `next.config.mjs` (`output: 'export'`), so it will also work on any static host.

## Customizing

- Replace the sample data in `app/page.tsx` with your own metrics or wired-up chart components.
- Global styling lives in `app/globals.css`; typography uses Space Grotesk via `next/font`.
- Layout uses the Next.js App Router and is ready for incremental sections or API data fetching if you prefer SSR.
