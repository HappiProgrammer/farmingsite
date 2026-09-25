import type { Metadata } from "next";
import { getMetricsService } from "@/lib/services/MetricsService";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { toProjectMetricDTO } from "@/lib/services/dto";
import { buildMetadata, impactPageJsonLd } from "@/lib/utils/seo";
import ImpactCounter from "@/components/shared/ImpactCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import type { MetricIconName } from "@/lib/models/ProjectMetric";

export const metadata: Metadata = buildMetadata({
  title: "Impact",
  description:
    "The measurable impact of the AIVDP/SOWEDA oil-palm farmer development project — farmers supported, nurseries established, seedlings produced, and communities reached.",
  path: "/impact",
});

// Icon SVGs inlined for the metric deep-dives (server-rendered, zero JS)
function MetricDetailIcon({ name }: { name: MetricIconName }) {
  switch (name) {
    case "farmers":
      return (
        <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
          <circle cx="20" cy="13" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M5 36c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "communities":
      return (
        <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
          <path d="M20 5L4 14v22h9V25h14v11h9V14L20 5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "nurseries":
      return (
        <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
          <path d="M20 36V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 18C20 18 10 13 10 7c0 0 5-2 10 3 5-5 10-3 10-3 0 6-10 11-10 11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "seedlings":
      return (
        <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
          <path d="M20 36V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 20C20 20 9 14 9 7c5 0 11 4.5 11 4.5S25 7 31 7c0 7-11 13-11 13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "locations":
      return (
        <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
          <path d="M20 5a11 11 0 0111 11c0 8-11 19-11 19S9 24 9 16A11 11 0 0120 5z" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "years":
      return (
        <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" />
          <path d="M20 10v10l6 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function ImpactPage() {
  const metricsService = getMetricsService();
  const farmerRepo = getFarmerRepository();

  const metrics = metricsService.findAll().map(toProjectMetricDTO);
  const farmerCount = farmerRepo.findAll().length;
  const jsonLd = impactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="flex flex-col">
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-surface-dark pt-[calc(var(--nav-height)+2rem)] pb-10 sm:pb-16 lg:pb-24 sm:pt-[calc(var(--nav-height)+3rem)] lg:pt-[calc(var(--nav-height)+4rem)]"
        aria-labelledby="impact-hero-heading"
      >
        <div className="container-content max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Measured Impact
          </p>
          <h1
            id="impact-hero-heading"
            className="font-display text-display-xl font-bold text-white"
          >
            The numbers behind the story
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            Impact figures are drawn directly from project records. Where data
            has not yet been supplied, we show an honest placeholder rather
            than an invented number.
          </p>
        </div>
      </section>

      {/* ── Counter grid ─────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-surface-dark border-t border-white/5"
        aria-labelledby="metrics-heading"
      >
        <div className="container-content flex flex-col gap-10">
          <h2 id="metrics-heading" className="sr-only">
            Project impact metrics
          </h2>
          <ImpactCounter metrics={metrics} />
        </div>
      </section>

      {/* ── Metric deep-dives ─────────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-labelledby="metric-detail-heading"
      >
        <div className="container-content flex flex-col gap-14">
          <SectionHeading
            eyebrow="What each number means"
            heading="Behind the figures"
            id="metric-detail-heading"
          />

          <div className="flex flex-col divide-y divide-border">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="grid items-start gap-8 py-10 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr_auto]"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-card bg-accent/10 text-accent">
                  <MetricDetailIcon name={metric.iconName} />
                </div>

                {/* Label + description */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {metric.label}
                  </h3>
                  {metric.description && (
                    <p className="max-w-prose-wide text-sm leading-relaxed text-ink-mid">
                      {metric.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink-light">
                    Status:{" "}
                    <span
                      className={
                        metric.status === "confirmed"
                          ? "text-accent"
                          : "text-ink-mid"
                      }
                    >
                      {metric.status === "confirmed"
                        ? "Confirmed"
                        : metric.status === "pending"
                          ? "Pending verification"
                          : "Data coming soon"}
                    </span>
                  </p>
                </div>

                {/* Value */}
                <div className="flex flex-col items-end gap-1 text-right">
                  {metric.value !== null ? (
                    <span className="font-display text-display-md font-bold text-ink tabular-nums">
                      {metric.displayValue}
                    </span>
                  ) : (
                    <span
                      className="font-display text-display-md font-bold text-ink-light/30"
                      aria-label={metric.pendingLabel}
                    >
                      —
                    </span>
                  )}
                  <span className="text-xs text-ink-light">{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology note ──────────────────────────────────────────────── */}
      <section
        className="section-padding bg-off-white"
        aria-labelledby="methodology-heading"
      >
        <div className="container-content grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Data methodology"
              heading="How we count"
              id="methodology-heading"
            />
            <p className="text-sm leading-relaxed text-ink-mid">
              [DESCRIBE THE DATA COLLECTION AND VERIFICATION METHODOLOGY —
              how farmer records are collected, how metrics are verified, how
              often the data is updated, and who is responsible for data
              accuracy.]
            </p>
            <p className="text-sm leading-relaxed text-ink-mid">
              Figures marked &ldquo;data coming soon&rdquo; will be updated as confirmed
              project records are supplied to this platform. No metric is
              estimated or projected — only confirmed figures are shown.
            </p>
          </div>

          {/* Platform farmers count — this is real, derived from the data layer */}
          <div className="flex flex-col gap-4 rounded-card-lg bg-white p-8 shadow-sm border border-border">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Live on this platform
            </p>
            <p className="font-display text-display-lg font-bold text-ink tabular-nums">
              {farmerCount}
            </p>
            <p className="text-sm text-ink-mid">
              Farmer profiles currently published on this platform, each with
              a full story, nursery details, and contact information.
            </p>
            <Button href="/farmers" variant="primary" size="md" className="self-start mt-2">
              View all farmers →
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface-dark" aria-label="Call to action">
        <div className="container-content flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-display-md font-bold text-white">
            Explore the people behind these numbers
          </h2>
          <p className="max-w-md text-base text-white/65">
            Each metric represents real farmers with real nurseries. Browse
            the directory to see who they are.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/farmers" variant="secondary" size="lg">
              Meet the Farmers
            </Button>
            <Button href="/the-project" variant="outline-light" size="lg">
              About the Project
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
