import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { toFarmerDTO, toNurseryDTO } from "@/lib/services/dto";
import { BASE_URL, buildMetadata, farmerProfileJsonLd } from "@/lib/utils/seo";
import FarmerProfile from "@/components/farmers/FarmerProfile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Static params — one page pre-rendered per farmer ──────────────────────────
export function generateStaticParams(): { slug: string }[] {
  const repo = getFarmerRepository();
  return repo.allSlugs().map((slug) => ({ slug }));
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getFarmerRepository();
  const result = repo.findBySlug(slug);

  if (!result) {
    return buildMetadata({
      title: "Farmer not found",
      description: "This farmer profile could not be found.",
      path: `/farmers/${slug}`,
    });
  }

  const { farmer } = result;

  return buildMetadata({
    title: farmer.name,
    description:
      farmer.bio ??
      `${farmer.role} based in ${farmer.displayLocation}. ${farmer.verified ? "Verified AIVDP/SOWEDA participant." : ""}`,
    path: `/farmers/${farmer.slug}`,
    image: farmer.portraitSrc ?? undefined,
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function FarmerSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const repo = getFarmerRepository();
  const result = repo.findBySlug(slug);

  if (!result) notFound();

  const { farmer, nursery, hasAvailableSeedlings } = result;

  const farmerDTO = toFarmerDTO(farmer);
  const nurseryDTO = nursery ? toNurseryDTO(nursery) : null;

  const jsonLd = farmerProfileJsonLd({
    name: farmer.name,
    description:
      farmer.bio ??
      `${farmer.role} based in ${farmer.displayLocation}.`,
    image: farmer.portraitSrc,
    url: `${BASE_URL}/farmers/${farmer.slug}`,
    locationArea: farmer.locationArea,
    locationRegion: farmer.locationRegion,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FarmerProfile
        farmer={farmerDTO}
        nursery={nurseryDTO}
        hasAvailableSeedlings={hasAvailableSeedlings}
      />
    </>
  );
}
