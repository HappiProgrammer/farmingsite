import Image from "next/image";
import Link from "next/link";
import type { NurseryDTO, FarmerDTO } from "@/lib/services/dto";
import { formatNumber } from "@/lib/utils/formatting";

interface NurseryCardProps {
  nursery: NurseryDTO;
  farmer: FarmerDTO | null;
}

export default function NurseryCard({ nursery, farmer }: NurseryCardProps) {
  const profileHref = farmer ? `/farmers/${farmer.slug}` : "/farmers";

  return (
    <article className="group flex flex-col overflow-hidden rounded-card-lg border border-parchment bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Cover image */}
      <Link
        href={profileHref}
        className="relative block aspect-video overflow-hidden bg-cream-warm"
        tabIndex={-1}
        aria-hidden="true"
      >
        {nursery.images[0] ? (
          <Image
            src={nursery.images[0].src}
            alt={nursery.images[0].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-600 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest-mid/10 to-cream-warm">
            <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-forest-mid/30" aria-hidden="true">
              <path d="M24 44V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 26C24 26 12 18 12 10c6 0 12 6 12 6s6-6 12-6c0 8-12 16-12 16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="text-xs italic text-ink-light">[NURSERY IMAGE]</span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
              nursery.isReady
                ? "bg-forest-mid text-cream"
                : "bg-cream/90 text-ink-mid backdrop-blur-sm",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                nursery.isReady ? "bg-cream" : "bg-earth-light",
              ].join(" ")}
              aria-hidden="true"
            />
            {nursery.statusLabel}
          </span>
        </div>

        {/* Seedlings available badge */}
        {nursery.hasAvailableSeedlings && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center rounded-full bg-agri-yellow/90 px-2.5 py-1 text-xs font-semibold text-forest-deep backdrop-blur-sm">
              Seedlings Available
            </span>
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Location + nursery name */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-light">
            {nursery.locationArea}, {nursery.locationRegion}
          </p>
          <Link
            href={profileHref}
            className="mt-1 block font-display text-base font-bold leading-snug text-forest-deep transition-colors hover:text-forest-mid"
          >
            {nursery.name}
          </Link>
        </div>

        {/* Stats row */}
        <dl className="grid grid-cols-2 gap-3">
          {[
            {
              term: "Established",
              value: nursery.establishedYear ? String(nursery.establishedYear) : null,
            },
            {
              term: "Available",
              value:
                nursery.availableSeedlings !== null
                  ? `${formatNumber(nursery.availableSeedlings)} seedlings`
                  : null,
            },
          ].map(({ term, value }) => (
            <div key={term} className="flex flex-col gap-0.5">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink-light">
                {term}
              </dt>
              <dd className="text-sm font-medium text-forest-deep">
                {value ?? <span className="italic text-ink-light/60">[{term}]</span>}
              </dd>
            </div>
          ))}
        </dl>

        {/* Varieties */}
        {nursery.seedlingVarieties.length > 0 && (
          <div className="border-t border-parchment pt-3">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-light">
              Varieties
            </p>
            <div className="flex flex-wrap gap-1.5">
              {nursery.seedlingVarieties.map((v, i) => (
                <span
                  key={i}
                  className="rounded-full bg-cream-warm px-2.5 py-0.5 text-xs text-ink-mid"
                >
                  {v.variety}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Farmer attribution + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-parchment pt-3">
          {farmer ? (
            <p className="text-xs text-ink-light">
              Farmer:{" "}
              <Link
                href={`/farmers/${farmer.slug}`}
                className="font-semibold text-forest-mid transition-colors hover:text-forest-deep"
              >
                {farmer.name}
              </Link>
            </p>
          ) : (
            <span className="text-xs italic text-ink-light">[Farmer TBC]</span>
          )}
          <Link
            href={profileHref}
            className="flex-shrink-0 text-xs font-semibold text-forest-mid transition-colors hover:text-forest-deep"
            aria-label={`View nursery and farmer profile for ${nursery.name}`}
          >
            View profile →
          </Link>
        </div>
      </div>
    </article>
  );
}
