import Image from "next/image";
import Link from "next/link";
import type { FarmerDTO, NurseryDTO } from "@/lib/services/dto";
import VerificationBadge from "@/components/ui/VerificationBadge";
import Button from "@/components/ui/Button";

interface FarmerCardProps {
  farmer: FarmerDTO;
  nursery: NurseryDTO | null;
  hasAvailableSeedlings: boolean;
}

export default function FarmerCard({
  farmer,
  nursery,
  hasAvailableSeedlings,
}: FarmerCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Portrait */}
      <Link
        href={`/farmers/${farmer.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-warm"
        tabIndex={-1}
        aria-hidden="true"
      >
        {farmer.portraitSrc ? (
          <Image
            src={farmer.portraitSrc}
            alt={farmer.portraitAlt ?? `Portrait of ${farmer.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-600 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-off-white">
            <svg
              viewBox="0 0 48 48"
              className="h-16 w-16 text-border"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="24" cy="16" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {/* Verified badge overlay */}
        {farmer.verified && (
          <div className="absolute left-3 top-3">
            <VerificationBadge />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name + location */}
        <div>
          <Link
            href={`/farmers/${farmer.slug}`}
            className="block font-display text-lg font-bold leading-snug text-ink transition-colors hover:text-accent"
          >
            {farmer.name}
          </Link>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-light">
            {farmer.displayLocation}
          </p>
        </div>

        {/* Bio snippet */}
        {farmer.bio && (
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-mid">
            {farmer.bio}
          </p>
        )}

        {/* Nursery status row */}
        {nursery && (
          <div className="flex flex-wrap items-center gap-2 border-t border-parchment pt-3">
            <span
              className={[
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                nursery.isReady
                  ? "bg-accent/10 text-accent"
                  : "bg-border text-ink-light",
              ].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  nursery.isReady ? "bg-accent" : "bg-border",
                ].join(" ")}
                aria-hidden="true"
              />
              {nursery.statusLabel} Nursery
            </span>

            {hasAvailableSeedlings && (
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-ink">
                Seedlings Available
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Button
            href={`/farmers/${farmer.slug}`}
            variant="ghost"
            size="sm"
            className="w-full justify-center !text-accent hover:!bg-accent-light"
            aria-label={`View the story of ${farmer.name}`}
          >
            View Farmer Story →
          </Button>
        </div>
      </div>
    </article>
  );
}
