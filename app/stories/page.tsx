import type { Metadata } from "next";
import { getStoryRepository } from "@/lib/services/StoryRepository";
import { toStoryDTO } from "@/lib/services/dto";
import { buildMetadata } from "@/lib/utils/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedStoryPlayer from "@/components/shared/FeaturedStoryPlayer";
import StoryCard from "@/components/shared/StoryCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Stories",
  description:
    "Watch and read the stories of oil-palm farmers supported by the AIVDP/SOWEDA programme — their challenges, their nurseries, and the impact of improved planting material.",
  path: "/stories",
});

export default function StoriesPage() {
  const repo = getStoryRepository();
  const allStories = repo.findAll().map(toStoryDTO);
  const featured = allStories.find((s) => s.featured) ?? allStories[0] ?? null;
  const rest = allStories.filter((s) => !s.featured);

  return (
    <div className="flex flex-col">
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-forest-deep pt-[calc(var(--nav-height)+4rem)] pb-16 lg:pb-20"
        aria-labelledby="stories-hero-heading"
      >
        <div className="container-content max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-agri-yellow">
            Farmer Stories
          </p>
          <h1
            id="stories-hero-heading"
            className="font-display text-display-xl font-bold text-white"
          >
            Stories from the field
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-cream/65">
            Every number in this project has a face behind it. These are the
            real stories of oil-palm farmers — their challenges, their
            nurseries, and what changed when support arrived.
          </p>
        </div>
      </section>

      {/* ── Featured video ─────────────────────────────────────────────────── */}
      {featured && (
        <section
          className="section-padding bg-forest-deep border-t border-white/5"
          aria-labelledby="featured-story-heading"
        >
          <div className="container-content flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-agri-yellow">
                Featured Story
              </p>
              {featured.durationLabel && (
                <span className="text-xs text-cream/40">{featured.durationLabel}</span>
              )}
            </div>
            <FeaturedStoryPlayer story={featured} />
          </div>
        </section>
      )}

      {/* ── Story grid ───────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section
          className="section-padding bg-cream-warm"
          aria-labelledby="more-stories-heading"
        >
          <div className="container-content flex flex-col gap-10">
            <SectionHeading
              eyebrow="More stories"
              heading="From the farmers"
              id="more-stories-heading"
              subheading="More video stories will be added as they are produced and supplied to this platform."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Placeholder when no additional stories ──────────────────────── */}
      {rest.length === 0 && (
        <section className="section-padding bg-cream" aria-label="More stories coming">
          <div className="container-content">
            <div className="flex flex-col items-center gap-6 rounded-card-lg border border-dashed border-parchment bg-cream-warm py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-mid/10 text-forest-mid">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-forest-deep">
                  More stories coming
                </h2>
                <p className="mt-2 max-w-sm text-sm text-ink-mid">
                  Additional farmer stories will appear here as they are
                  produced. The layout is ready — no design changes needed
                  when new videos are added.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── About the stories ─────────────────────────────────────────────── */}
      <section
        className="section-padding bg-cream"
        aria-labelledby="about-stories-heading"
      >
        <div className="container-content grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="About these stories"
              heading="Documentary, not marketing"
              id="about-stories-heading"
            />
            <p className="text-sm leading-relaxed text-ink-mid">
              [DESCRIBE HOW THE STORIES WERE PRODUCED — who filmed them, what
              the farmers consented to, and how they can use their own profile
              page as a lasting record of their work.]
            </p>
            <p className="text-sm leading-relaxed text-ink-mid">
              Each farmer featured in a story has a full profile page on this
              platform, including their nursery details and direct contact
              information.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-mid">
              Want to find a nursery?
            </p>
            <p className="text-sm leading-relaxed text-ink-mid">
              Browse the full farmer directory to discover nurseries, available
              seedlings, and contact information for every supported farmer.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/farmers" variant="primary" size="md">
                Browse Farmers
              </Button>
              <Button href="/nurseries" variant="ghost" size="md" className="!text-forest-mid">
                Explore Nurseries
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
