import type { Metadata } from "next";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { getMetricsService } from "@/lib/services/MetricsService";
import { getContentService } from "@/lib/services/ContentService";
import {
  toFarmerDTO,
  toFarmerWithNurseryDTO,
  toNurseryDTO,
  toOrganizationDTO,
  toProjectMetricDTO,
} from "@/lib/services/dto";
import { buildMapPinsFromCoords } from "@/lib/utils/mapPins";
import HeroVideo from "@/components/home/HeroVideo";
import SceneFarmer from "@/components/home/SceneFarmer";
import SceneChallenge from "@/components/home/SceneChallenge";
import SceneIntervention from "@/components/home/SceneIntervention";
import SceneNursery from "@/components/home/SceneNursery";
import SceneNumbers from "@/components/home/SceneNumbers";
import SceneFarmers from "@/components/home/SceneFarmers";
import SceneMap from "@/components/home/SceneMap";
import SceneNurseries from "@/components/home/SceneNurseries";
import SceneFuture from "@/components/home/SceneFuture";
import { buildMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "From Support to Growth",
  description:
    "Discover the real farmers, nurseries, and measurable impact of the AIVDP/SOWEDA oil-palm farmer development project in the South West Region.",
  path: "/",
});

export default function HomePage() {
  // All data fetched server-side — no waterfall, no client requests
  const farmerRepo = getFarmerRepository();
  const metricsService = getMetricsService();
  const contentService = getContentService();

  const farmersWithNurseries = farmerRepo.findAllWithNurseries().map(toFarmerWithNurseryDTO);
  const metrics = metricsService.findAll().map(toProjectMetricDTO);
  const organizations = contentService.findAllOrganizations().map(toOrganizationDTO);
  const farmers = farmerRepo.findAll();
  const nurseriesWithFarmers = contentService.findAllNurseries().map((nursery) => {
    const farmer = farmers.find((f) => f.id === nursery.farmerId) ?? null;
    return {
      nursery: toNurseryDTO(nursery),
      farmer: farmer ? toFarmerDTO(farmer) : null,
    };
  });

  // Build map pins — join farmer DTOs with their coordinates from the data layer
  const coordsData = farmerRepo.coordinatesForMap();
  const farmerDTOs = farmersWithNurseries.map((f) => f.farmer);
  const mapPins = buildMapPinsFromCoords(
    farmerDTOs.map((farmer) => ({
      farmer,
      coordinates: coordsData.find((c) => c.farmerId === farmer.id)?.coordinates ?? null,
    })),
  );

  return (
    <>
      {/* ── Scene 0: Hero ──────────────────────────────────────────────────── */}
      <HeroVideo />

      {/* ── Scene 1: The Farmer ──────────────────────────────────────────── */}
      <SceneFarmer />

      {/* ── Scene 2: The Challenge ───────────────────────────────────────── */}
      <SceneChallenge />

      {/* ── Scene 3: The Intervention ────────────────────────────────────── */}
      <SceneIntervention organizations={organizations} />

      {/* ── Scene 4: The Nursery ─────────────────────────────────────────── */}
      <SceneNursery />

      {/* ── Scene 5: The Numbers ─────────────────────────────────────────── */}
      <SceneNumbers metrics={metrics} />

      {/* ── Scene 6: The Farmers ─────────────────────────────────────────── */}
      <SceneFarmers farmersWithNurseries={farmersWithNurseries} />

      {/* ── Scene 6b: Project Map ─────────────────────────────────────────── */}
      <SceneMap pins={mapPins} />

      {/* ── Scene 7: The Nurseries ───────────────────────────────────────── */}
      <SceneNurseries nurseriesWithFarmers={nurseriesWithFarmers} />

      {/* ── Scene 8: The Future ──────────────────────────────────────────── */}
      <SceneFuture />
    </>
  );
}
