# Technology Stack

## Stack
- Next.js, latest **stable** release, App Router (no canary/RC)
- TypeScript, strict mode
- Tailwind CSS for styling
- Framer Motion, or native CSS scroll-driven animations where they cover
  the need, for the scroll-storytelling layer

## Architecture — three layers, kept simple
1. **Domain models** (`lib/models`) — plain TypeScript **classes** for
   Farmer, Nursery, ProjectMetric, Organization. Encapsulate fields and
   small behaviors here (e.g. `farmer.hasAvailableSeedlings()`,
   `nursery.isReady()`). This is where "classes" belong in this codebase.
2. **Services/repositories** (`lib/services`) — classes that load and
   shape data from the content layer behind a small interface (e.g.
   `FarmerRepository`, `MetricsService`), so the JSON/content source can
   be swapped for a real CMS or API later without touching components.
3. **Components** (`components/`) — **functional components only** (React
   Server Components by default, `"use client"` only where interactivity
   is required — video, scroll listeners, forms, counters). Do not use
   React class components; that fights the App Router's server-rendering
   model. "Correct use of classes" in this project means the domain and
   service layers above, not the UI layer.

No farmer, nursery, or metric data is ever hardcoded inside a page or
component — it always flows through the models/services layer, seeded
from `lib/content/*.json` (or `.ts`) placeholder data for now.

## Media & performance
- `next/image` everywhere, modern formats, responsive `sizes`
- `next/font` for zero-layout-shift type
- Hero video: native `<video>`, `autoplay muted loop playsInline`, a real
  `poster` image, `preload="metadata"`, mounted/played only when in or
  near the viewport (IntersectionObserver), and compressed before it's
  added to `/public/videos/` — if the source file is large, compress it
  externally first rather than relying on the build to compensate for it
- Animate only `transform`/`opacity`; honor `prefers-reduced-motion` with
  a simple-fade fallback everywhere motion is used
- Minimal client JS; prefer Server Components

## Map
Default to a custom, stylized SVG/illustrated regional map with
area-level pins — it matches the premium aesthetic and needs no API key
or account setup. Only move to Leaflet/Mapbox later if precise real-time
geolocation becomes a real requirement.

## SEO
- Per-route metadata via the App Router Metadata API (title, description,
  Open Graph, Twitter card) on every route
- `app/sitemap.ts` and `app/robots.ts`
- JSON-LD for the organization/website
- Semantic landmarks (`header`/`nav`/`main`/`footer`/`section`),
  descriptive `alt` text sourced from the data model
- Farmer profile pages statically generated (`generateStaticParams`) so
  each is independently indexable and shareable

## Code quality
ESLint + Prettier, meaningful naming, no default or fabricated content
baked into components — everything content-shaped flows through the data
layer above.
