import type { Metadata } from "next";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { toFarmerWithNurseryDTO } from "@/lib/services/dto";
import { buildMetadata, farmerDirectoryJsonLd } from "@/lib/utils/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import FarmerDirectoryClient from "@/components/farmers/FarmerDirectoryClient";

export const metadata: Metadata = buildMetadata({
  title: "Farmers",
  description:
    "Browse all oil-palm farmers supported by the AIVDP/SOWEDA programme. Each farmer has a profile, a nursery, and seedlings available — contact them directly.",
  path: "/farmers",
});

export default function FarmersPage() {
  const repo = getFarmerRepository();
  const farmersWithNurseries = repo.findAllWithNurseries().map(toFarmerWithNurseryDTO);

  // Derive unique regions for the filter dropdown
  const regions = [
    ...new Set(farmersWithNurseries.map(({ farmer }) => farmer.locationRegion)),
  ].sort();

  const jsonLd = farmerDirectoryJsonLd(
    farmersWithNurseries.map(({ farmer }) => ({
      name: farmer.name,
      slug: farmer.slug,
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
        aria-labelledby="farmers-hero-heading"
      >
        <div className="container-content max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-agri-yellow">
            Farmer Directory
          </p>
          <h1
            id="farmers-hero-heading"
            className="font-display text-display-xl font-bold text-white"
          >
            Meet the farmers
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-cream/65">
            Every farmer listed here is a verified participant in the
            AIVDP/SOWEDA oil-palm development programme. Each has a story, a
            nursery, and — where available — seedlings for sale. Contact them
            directly.
          </p>
        </div>
      </section>

      {/* ── Directory ─────────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-cream"
        aria-labelledby="directory-heading"
      >
        <div className="container-content flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <SectionHeading
              eyebrow={`${farmersWithNurseries.length} farmers`}
              heading="The directory"
              id="directory-heading"
            />
          </div>

          <FarmerDirectoryClient
            farmersWithNurseries={farmersWithNurseries}
            regions={regions}
          />
        </div>
      </section>
    </div>
    </>
  );
}
