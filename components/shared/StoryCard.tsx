import Image from "next/image";
import Link from "next/link";
import type { StoryDTO } from "@/lib/services/dto";

// Keep the old inline interface as an alias for backwards-compat if needed
export type { StoryDTO as StoryCardData };

export default function StoryCard({
  story,
  featured = false,
}: {
  story: StoryDTO;
  featured?: boolean;
}) {
  return (
    <article
      id={story.id}
      className={[
        "group relative overflow-hidden rounded-card-lg bg-surface-dark",
        featured ? "aspect-video md:col-span-2" : "aspect-video",
      ].join(" ")}
    >
      {/* Thumbnail */}
      {story.thumbnailSrc ? (
        <Image
          src={story.thumbnailSrc}
          alt={story.thumbnailAlt}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover opacity-70 transition-all duration-600 group-hover:scale-105 group-hover:opacity-80"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/60 to-surface-dark" />
      )}

      {/* Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/20 to-transparent"
        aria-hidden="true"
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Link
          href={story.href}
          aria-label={`${story.hasVideo ? "Play" : "View"} story: ${story.title}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="ml-1 h-6 w-6 text-white"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        </Link>
      </div>

      {/* Meta */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {story.farmerName && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
            {story.farmerName}
          </p>
        )}
        <Link
          href={story.href}
          className="block font-display text-lg font-bold leading-snug text-white transition-colors hover:text-white/80"
        >
          {story.title}
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-white/60">
          {story.description}
        </p>
        {story.durationLabel && (
          <p className="mt-2 text-xs text-white/40">{story.durationLabel}</p>
        )}
      </div>
    </article>
  );
}
