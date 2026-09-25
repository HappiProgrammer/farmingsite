# Project Structure

app/
  layout.tsx                  — root layout, fonts, metadata defaults
  page.tsx                    — home: the full scroll narrative
  the-project/page.tsx        — AIVDP / SOWEDA section, expanded
  impact/page.tsx             — impact numbers, expanded
  farmers/page.tsx            — farmer directory
  farmers/[slug]/page.tsx     — farmer profile + nursery
  nurseries/page.tsx          — nursery showcase directory
  stories/page.tsx            — video stories
  contact/page.tsx
  sitemap.ts
  robots.ts

components/
  layout/        — Navbar, Footer
  home/          — HeroVideo, ScrollScene, the 8 home-page scene sections
  farmers/       — FarmerCard, FarmerProfile, NurseryGallery
  shared/        — ImpactCounter, VerificationBadge, ProjectMap, StoryCard,
                   OrganizationSection
  ui/            — small design-system primitives (Button, SectionHeading…)

lib/
  models/        — Farmer.ts, Nursery.ts, ProjectMetric.ts, Organization.ts
  services/      — FarmerRepository.ts, MetricsService.ts, ContentService.ts
  content/       — farmers.json, nurseries.json, metrics.json,
                   organizations.json (placeholder data lives here)
  utils/         — formatting, seo helpers

public/
  videos/farmer-story.mp4     — provided by the user
  images/

## Conventions
- Components: PascalCase, one component per file
- Model/service instances: camelCase
- Routes: kebab-case
- Import order: external packages → lib/models → lib/services →
  components → relative
