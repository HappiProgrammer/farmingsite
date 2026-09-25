import Image from "next/image";
import Link from "next/link";
import type { FarmerDTO, NurseryDTO } from "@/lib/services/dto";
import VerificationBadge from "@/components/ui/VerificationBadge";
import Button from "@/components/ui/Button";
import NurseryGallery from "@/components/farmers/NurseryGallery";

interface FarmerProfileProps {
  farmer: FarmerDTO;
  nursery: NurseryDTO | null;
  hasAvailableSeedlings: boolean;
}

export default function FarmerProfile({
  farmer,
  nursery,
  hasAvailableSeedlings,
}: FarmerProfileProps) {
  return (
    <article aria-label={`Profile of ${farmer.name}`}>
      {/* ── Profile hero ─────────────────────────────────────────────────── */}
      <div className="relative bg-surface-dark pt-[calc(var(--nav-height)+1rem)] pb-8 sm:pt-[calc(var(--nav-height)+2rem)] sm:pb-12 lg:pb-20">

        <div className="container-content relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-white/40">
              <li>
                <Link href="/" className="transition-colors hover:text-white/70">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/farmers" className="transition-colors hover:text-white/70">
                  Farmers
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/60" aria-current="page">
                {farmer.name}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-4 grid-cols-[auto_1fr]">
            {/* Portrait */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-card-lg border-2 border-border sm:h-32 sm:w-32 md:h-40 md:w-40">
              {farmer.portraitSrc ? (
                <Image
                  src={farmer.portraitSrc}
                  alt={farmer.portraitAlt ?? `Portrait of ${farmer.name}`}
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-accent/20">
                  <svg viewBox="0 0 64 64" className="h-20 w-20 text-white/30" fill="none" aria-hidden="true">
                    <circle cx="32" cy="22" r="14" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 60c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>

            {/* Identity */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {farmer.role}
                </p>
                {farmer.verified && <VerificationBadge />}
              </div>

              <h1 className="font-display text-2xl font-bold text-white sm:text-display-lg">
                {farmer.name}
              </h1>

              <p className="flex items-center gap-1.5 text-sm text-white/60">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
                  <path d="M8 1.5A4.5 4.5 0 018 10.5S3.5 13 3.5 9.5A4.5 4.5 0 018 1.5z" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {farmer.displayLocation}
              </p>

              {farmer.joinedYear && (
                <p className="text-xs text-white/40">
                  Programme participant since {farmer.joinedYear}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Story + nursery ───────────────────────────────────────────────── */}
      <div className="section-padding bg-white">
        <div className="container-content grid gap-8 sm:gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          {/* Main column: story + gallery */}
          <div className="flex flex-col gap-8">
            {/* Bio */}
            {farmer.bio && (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  About
                </p>
                <p className="text-base leading-relaxed text-ink-mid">{farmer.bio}</p>
              </div>
            )}

            {/* Full story */}
            {farmer.story && (
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Story
                </p>
                <div className="prose-custom max-w-none">
                  {farmer.story.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-ink-mid [&+p]:mt-4"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {farmer.galleryImages.length > 0 && (
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Gallery
                </p>
                <NurseryGallery
                  images={farmer.galleryImages}
                  nurseryName={nursery?.name ?? farmer.name}
                />
              </div>
            )}
          </div>

          {/* Sidebar: nursery block + CTA */}
          <aside className="flex flex-col gap-4 order-first lg:order-last" aria-label="Nursery information">
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {nursery ? (
                <div className="rounded-card-lg border border-border bg-off-white p-6 shadow-sm">
                  {/* Nursery header */}
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                        Nursery
                      </p>
                      <h2 className="font-display text-lg font-bold leading-snug text-ink">
                        {nursery.name}
                      </h2>
                    </div>
                    <span
                      className={[
                        "mt-1 inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
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
                      {nursery.statusLabel}
                    </span>
                  </div>

                  {/* Nursery stats */}
                  <dl className="flex flex-col gap-3 border-t border-border pt-5">
                    {[
                      {
                        term: "Established",
                        value: nursery.establishedYear
                          ? String(nursery.establishedYear)
                          : null,
                        placeholder: "[YEAR]",
                      },
                      {
                        term: "Location",
                        value: `${nursery.locationArea}, ${nursery.locationRegion}`,
                        placeholder: null,
                      },
                      {
                        term: "Current seedlings",
                        value: nursery.currentSeedlings
                          ? new Intl.NumberFormat("en-US").format(nursery.currentSeedlings)
                          : null,
                        placeholder: "[NUMBER]",
                      },
                      {
                        term: "Available seedlings",
                        value: nursery.availableSeedlings
                          ? new Intl.NumberFormat("en-US").format(nursery.availableSeedlings)
                          : null,
                        placeholder: hasAvailableSeedlings ? null : "[NUMBER]",
                      },
                    ].map(({ term, value, placeholder }) => (
                      <div key={term} className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-light">
                          {term}
                        </dt>
                        <dd className="text-right text-sm font-medium text-ink">
                          {value ?? (
                            <span className="italic text-ink-light">
                              {placeholder ?? "—"}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Seedling varieties */}
                  {nursery.seedlingVarieties.length > 0 && (
                    <div className="mt-5 border-t border-border pt-5">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-light">
                        Varieties
                      </p>
                      <ul className="flex flex-col gap-2" role="list">
                        {nursery.seedlingVarieties.map((v, i) => (
                          <li
                            key={i}
                            className="flex items-start justify-between gap-2 text-sm"
                          >
                            <span className="text-ink">{v.variety}</span>
                            {v.count !== null && (
                              <span className="flex-shrink-0 font-semibold text-accent">
                                {new Intl.NumberFormat("en-US").format(v.count)}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Nursery gallery thumbnail */}
                  {nursery.images[0] && (
                    <div className="mt-5 overflow-hidden rounded-card border border-border">
                      <NurseryGallery
                        images={[nursery.images[0]]}
                        nurseryName={nursery.name}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-card-lg border border-dashed border-border bg-off-white p-6 text-center">
                  <p className="text-sm italic text-ink-light">
                    [NURSERY DETAILS TO BE ADDED]
                  </p>
                </div>
              )}

              {/* Contact CTA */}
              <div className="flex flex-col gap-3">
                {farmer.whatsappUrl ? (
                  <Button
                    href={farmer.whatsappUrl}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    // Opens in new tab — external link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Contact ${farmer.name} on WhatsApp`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.14 1.533 5.878L0 24l6.29-1.51A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.035-1.382l-.36-.214-3.733.896.933-3.625-.235-.372A9.818 9.818 0 0112 2.182c5.427 0 9.818 4.39 9.818 9.818 0 5.427-4.391 9.818-9.818 9.818z" />
                    </svg>
                    Contact on WhatsApp
                  </Button>
                ) : (
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    aria-label={`Contact ${farmer.name} via the project`}
                  >
                    Contact Farmer
                  </Button>
                )}
                <Button
                  href="/farmers"
                  variant="ghost"
                  size="md"
                  className="w-full justify-center !text-accent hover:!bg-accent-light"
                >
                  ← Back to all farmers
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
