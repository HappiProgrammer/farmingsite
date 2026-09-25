import type { Metadata } from "next";
import { getContentService } from "@/lib/services/ContentService";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { toNurseryDTO, toFarmerDTO } from "@/lib/services/dto";
import type { NurseryWithFarmerDTO } from "@/lib/services/dto";
import { buildMetadata, nurseryDirectoryJsonLd } from "@/lib/utils/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import NurseryDirectoryClient from "@/components/shared/NurseryDirectoryClient";
import Button from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Nurseries",
  description:
    "Explore oil-palm nurseries established by AIVDP/SOWEDA-supported farmers. Find available seedlings, nursery locations, and contact producers directly.",
  path: "/nurseries",
});

export default function NurseriesPage() {
  const contentService = getContentService();
  const farmerRepo = getFarmerRepository();

  const nurseries = contentService.findAllNurseries();
  const farmers = farmerRepo.findAll();

  // Join nurseries with their farmer for the card
  const nurseriesWithFarmers: NurseryWithFarmerDTO[] = nurseries.map((nursery) => {
    const farmer = farmers.find((f) => f.id === nursery.farmerId) ?? null;
    return {
      nursery: toNurseryDTO(nursery),
      farmer: farmer ? toFarmerDTO(farmer) : null,
    };
  });

  const activeCount = nurseries.filter((n) => n.isReady()).length;
  const regions = [...new Set(nurseries.map((n) => n.locationRegion))].sort();

  const jsonLd = nurseryDirectoryJsonLd(
    nurseries.map((n) => ({
      name: n.name,
      locationArea: n.locationArea,
      farmerId: n.farmerId,
    })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="flex flex-col">
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-forest-deep pt-[calc(var(--nav-height)+4rem)] pb-16 lg:pb-20"
        aria-labelledby="nurseries-hero-heading"
      >
        <div className="container-content max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-agri-yellow">
            Nursery Showcase
          </p>
          <h1
            id="nurseries-hero-heading"
            className="font-display text-display-xl font-bold text-white"
          >
            The nurseries
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-cream/65">
            Each nursery here is farmer-owned and supported through the
            AIVDP/SOWEDA programme. Browse by status or location, then
            contact the farmer directly about available seedlings.
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: "Total nurseries", value: nurseries.length },
              { label: "Active", value: activeCount },
              { label: "Region", value: regions[0] ?? "[REGION]" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-display text-display-md font-bold tabular-nums text-white">
                  {value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-cream/40">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Directory ─────────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-cream"
        aria-labelledby="nursery-directory-heading"
      >
        <div className="container-content flex flex-col gap-10">
          <SectionHeading
            eyebrow="All nurseries"
            heading="Browse and contact"
            subheading="Filter by status, region, or seedling availability. Click any card to view the farmer's full profile and contact details."
            id="nursery-directory-heading"
          />

          <NurseryDirectoryClient
            nurseriesWithFarmers={nurseriesWithFarmers}
            regions={regions}
          />
        </div>
      </section>

      {/* ── How to buy seedlings ──────────────────────────────────────────── */}
      <section
        className="section-padding bg-cream-warm"
        aria-labelledby="how-to-buy-heading"
      >
        <div className="container-content grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="How to get seedlings"
              heading="Contact the farmer directly"
              id="how-to-buy-heading"
            />
            <p className="text-sm leading-relaxed text-ink-mid">
              There is no purchasing flow on this platform. To enquire about
              seedlings, click through to a farmer&apos;s profile and use the
              WhatsApp link or the contact form. Pricing, availability, and
              logistics are agreed directly between you and the farmer.
            </p>
            <p className="text-sm leading-relaxed text-ink-mid">
              If you cannot find a nursery in your area or need help connecting
              with the right farmer, use the general contact form and we will
              assist you.
            </p>
            <Button href="/contact" variant="primary" size="md" className="self-start">
              Contact the project team →
            </Button>
          </div>

          {/* Buyer guide */}
          <div className="flex flex-col gap-4 rounded-card-lg border border-parchment bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-mid">
              Buyer guide
            </p>
            {[
              'Find a nursery with "Active" status and "Seedlings Available"',
              "Click the card to view the farmer's full profile",
              "Use WhatsApp or the contact form to reach the farmer",
              "Discuss variety, quantity, and collection or delivery directly",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest-mid/10 text-xs font-bold text-forest-mid">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink-mid">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-forest-deep" aria-label="Call to action">
        <div className="container-content flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-display-md font-bold text-cream">
            Looking for the people, not just the plants?
          </h2>
          <p className="max-w-md text-base text-cream/65">
            Every nursery has a farmer behind it. Browse their full profiles,
            stories, and histories in the farmer directory.
          </p>
          <Button href="/farmers" variant="secondary" size="lg">
            Meet the Farmers
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}
