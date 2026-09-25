import type { FarmerData } from "@/lib/models/Farmer";
import { Farmer } from "@/lib/models/Farmer";
import type { NurseryData } from "@/lib/models/Nursery";
import { Nursery } from "@/lib/models/Nursery";
import farmersRaw from "@/lib/content/farmers.json";
import nurseriesRaw from "@/lib/content/nurseries.json";

// Typed once; the JSON shape is trusted to match the interface.
const farmersData = farmersRaw as FarmerData[];
const nurseriesData = nurseriesRaw as NurseryData[];

export interface FarmerWithNursery {
  farmer: Farmer;
  nursery: Nursery | null;
  hasAvailableSeedlings: boolean;
}

export class FarmerRepository {
  private readonly farmers: Farmer[];
  private readonly nurseries: Nursery[];

  constructor() {
    this.farmers = farmersData.map((d) => new Farmer(d));
    this.nurseries = nurseriesData.map((d) => new Nursery(d));
  }

  /** All farmers, in the order defined in the JSON. */
  findAll(): Farmer[] {
    return this.farmers;
  }

  /** All farmers enriched with their nursery and seedling availability. */
  findAllWithNurseries(): FarmerWithNursery[] {
    return this.farmers.map((farmer) => {
      const nursery = farmer.nurseryId
        ? (this.nurseries.find((n) => n.id === farmer.nurseryId) ?? null)
        : null;
      return {
        farmer,
        nursery,
        hasAvailableSeedlings: nursery?.hasAvailableSeedlings() ?? false,
      };
    });
  }

  /** Find a single farmer by slug; returns null if not found. */
  findBySlug(slug: string): FarmerWithNursery | null {
    const farmer = this.farmers.find((f) => f.slug === slug);
    if (!farmer) return null;

    const nursery = farmer.nurseryId
      ? (this.nurseries.find((n) => n.id === farmer.nurseryId) ?? null)
      : null;

    return {
      farmer,
      nursery,
      hasAvailableSeedlings: nursery?.hasAvailableSeedlings() ?? false,
    };
  }

  /** All slugs — used for generateStaticParams. */
  allSlugs(): string[] {
    return this.farmers.map((f) => f.slug);
  }

  /** Coordinates for map pins — area-level only. */
  coordinatesForMap(): Array<{ farmerId: string; coordinates: { lat: number; lng: number } | null }> {
    return farmersData.map((d) => ({
      farmerId: d.id,
      coordinates: d.coordinates ?? null,
    }));
  }
}

// Singleton exported for server-side use across pages.
// Safe because this module is never bundled into the client.
let _repository: FarmerRepository | null = null;

export function getFarmerRepository(): FarmerRepository {
  if (!_repository) _repository = new FarmerRepository();
  return _repository;
}
