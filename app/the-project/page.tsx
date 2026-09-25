import type { Metadata } from "next";
import { getContentService } from "@/lib/services/ContentService";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { toFarmerDTO } from "@/lib/services/dto";
import { buildMapPinsFromCoords } from "@/lib/utils/mapPins";
import { buildMetadata } from "@/lib/utils/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import OrganizationSection from "@/components/shared/OrganizationSection";
import ProjectMap from "@/components/shared/ProjectMap";
import Button from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "The Project",
  description:
    "Learn about the AIVDP/SOWEDA oil-palm farmer development initiative — its origins, objectives, approach, and the organizations behind it.",
  path: "/the-project",
});

const projectPhases = [
  {
    phase: "01",
    title: "Farmer Identification & Selection",
    body: "[DESCRIBE HOW FARMERS WERE IDENTIFIED AND SELECTED FOR THE PROGRAMME — criteria, outreach process, and geographic focus.]",
  },
  {
    phase: "02",
    title: "Nursery Development Support",
    body: "[DESCRIBE THE NURSERY DEVELOPMENT SUPPORT PROVIDED — inputs, technical assistance, infrastructure, training.]",
  },
  {
    phase: "03",
    title: "Improved Planting Material",
    body: "[DESCRIBE THE IMPROVED PLANTING MATERIAL SUPPLIED — varieties, quantities, sourcing, and why these varieties were chosen.]",
  },
  {
    phase: "04",
    title: "Ongoing Farmer Support",
    body: "[DESCRIBE THE ONGOING SUPPORT STRUCTURE — field visits, training sessions, farmer groups, monitoring.]",
  },
];

export default function TheProjectPage() {
  const contentService = getContentService();
  const farmerRepo = getFarmerRepository();
  const organizations = contentService.findAllOrganizations();

  const coordsData = farmerRepo.coordinatesForMap();
  const mapPins = buildMapPinsFromCoords(
    farmerRepo.findAll().map((farmer) => ({
      farmer: toFarmerDTO(farmer),
      coordinates: coordsData.find((c) => c.farmerId === farmer.id)?.coordinates ?? null,
    })),
  );

  return (
    <div className="flex flex-col">
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-surface-dark pt-[calc(var(--nav-height)+2rem)] pb-10 sm:pb-16 lg:pb-24 sm:pt-[calc(var(--nav-height)+3rem)] lg:pt-[calc(var(--nav-height)+4rem)]"
        aria-labelledby="project-hero-heading"
      >
        <div className="container-content relative z-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            AIVDP / SOWEDA
          </p>
          <h1
            id="project-hero-heading"
            className="font-display text-display-xl font-bold text-white"
          >
            The Project
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            [PROJECT DESCRIPTION — a factual overview of the AIVDP/SOWEDA
            oil-palm farmer development initiative: what it is, where it
            operates, who it supports, and what it aims to achieve.]
          </p>
        </div>
      </section>

      {/* ── What this is ─────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-labelledby="about-heading"
      >
        <div className="container-content grid items-start gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="About the Initiative"
              heading="Supporting farmers from the ground up"
              subheading="[EXPANDED PROJECT DESCRIPTION — why this initiative was launched, who it serves, and the core problem it addresses.]"
            />
            <Button href="/impact" variant="primary" size="md" className="self-start">
              View Impact Figures →
            </Button>
          </div>

          {/* Key facts sidebar */}
          <aside className="flex flex-col gap-4" aria-label="Key project facts">
            {[
              { label: "Project Region", value: "South West Region, Cameroon" },
              { label: "Project Start", value: "[PROJECT START DATE]" },
              { label: "Lead Organization", value: "[AIVDP FULL NAME]" },
              { label: "Partner Organization", value: "SOWEDA — South West Development Authority" },
              { label: "Focus Crop", value: "Oil Palm (Elaeis guineensis)" },
              { label: "Focus Area", value: "Nursery development & improved planting material" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-light">
                  {label}
                </span>
                <span className="text-right text-sm font-medium text-ink">
                  {value}
                </span>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* ── How it works — 4 phases ───────────────────────────────────────── */}
      <section
        className="section-padding bg-off-white"
        aria-labelledby="approach-heading"
      >
        <div className="container-content flex flex-col gap-12">
          <SectionHeading
            eyebrow="Our Approach"
            heading="How the programme works"
            subheading="[BRIEF DESCRIPTION OF THE OVERALL PROGRAMME APPROACH — the four-phase sequence from farmer identification through to ongoing support.]"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {projectPhases.map(({ phase, title, body }) => (
              <div
                key={phase}
                className="relative flex flex-col gap-4 rounded-card-lg border border-border bg-white p-7 shadow-sm"
              >
                <span className="font-display text-5xl font-bold text-accent/15 tabular-nums">
                  {phase}
                </span>
                <h3 className="font-display text-base font-bold leading-snug text-ink">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-mid">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Organizations ──────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-surface-dark"
        aria-labelledby="orgs-heading"
      >
        <div className="container-content">
          <OrganizationSection organizations={organizations} light />
        </div>
      </section>

      {/* ── Project map ───────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-off-white"
        aria-labelledby="project-map-heading"
      >
        <div className="container-content flex flex-col gap-10">
          <SectionHeading
            eyebrow="Where we work"
            heading="Project locations"
            subheading="Locations are shown at community or area level only. Click a pin to open the farmer profile for that area."
            id="project-map-heading"
          />
          <div className="overflow-hidden rounded-card-lg border border-border bg-white shadow-sm">
            <ProjectMap pins={mapPins} className="max-h-[520px]" />
          </div>
          <p className="text-xs text-ink-light">
            * Pins indicate community or area level only — no precise personal
            addresses are shown on this platform.
          </p>
        </div>
      </section>

      {/* ── Partners placeholder ───────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-labelledby="partners-heading"
      >
        <div className="container-content flex flex-col gap-8">
          <SectionHeading
            eyebrow="Partners & Funders"
            heading="Who makes this possible"
          />
          <div className="rounded-card-lg border border-dashed border-border bg-off-white p-10 text-center">
            <p className="text-sm italic text-ink-light">
              [PARTNER LOGOS AND FUNDER ACKNOWLEDGEMENTS WILL BE DISPLAYED
              HERE ONCE SUPPLIED. DO NOT ADD FABRICATED PARTNER NAMES OR
              LOGOS.]
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface-dark" aria-label="Call to action">
        <div className="container-content flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-display-md font-bold text-white">
            Ready to meet the farmers?
          </h2>
          <p className="max-w-md text-base text-white/70">
            Each supported farmer has a profile, a nursery, and a story.
            Browse the directory to find nurseries and available seedlings near you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/farmers" variant="secondary" size="lg">
              Meet the Farmers
            </Button>
            <Button href="/nurseries" variant="ghost" size="lg">
              Explore Nurseries
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
