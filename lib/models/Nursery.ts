export type NurseryStatus = "active" | "establishing" | "seasonal" | "inactive";

export interface NurseryData {
  id: string;
  farmerId: string;
  name: string;
  establishedYear: number | null;
  locationArea: string;
  locationRegion: string;
  status: NurseryStatus;
  totalCapacity: number | null;
  currentSeedlings: number | null;
  availableSeedlings: number | null;
  seedlingVarieties: SeedlingVariety[];
  images: NurseryImage[];
  description: string | null;
}

export interface SeedlingVariety {
  variety: string;
  count: number | null;
  pricePerSeedling: null; // v1: no pricing — contact only
  notes: string | null;
}

export interface NurseryImage {
  src: string;
  alt: string;
  caption?: string;
}

export class Nursery {
  readonly id: string;
  readonly farmerId: string;
  readonly name: string;
  readonly establishedYear: number | null;
  readonly locationArea: string;
  readonly locationRegion: string;
  readonly status: NurseryStatus;
  readonly totalCapacity: number | null;
  readonly currentSeedlings: number | null;
  readonly availableSeedlings: number | null;
  readonly seedlingVarieties: SeedlingVariety[];
  readonly images: NurseryImage[];
  readonly description: string | null;

  constructor(data: NurseryData) {
    this.id = data.id;
    this.farmerId = data.farmerId;
    this.name = data.name;
    this.establishedYear = data.establishedYear;
    this.locationArea = data.locationArea;
    this.locationRegion = data.locationRegion;
    this.status = data.status;
    this.totalCapacity = data.totalCapacity;
    this.currentSeedlings = data.currentSeedlings;
    this.availableSeedlings = data.availableSeedlings;
    this.seedlingVarieties = data.seedlingVarieties;
    this.images = data.images;
    this.description = data.description;
  }

  isReady(): boolean {
    return this.status === "active";
  }

  hasAvailableSeedlings(): boolean {
    return (this.availableSeedlings ?? 0) > 0;
  }

  get statusLabel(): string {
    const labels: Record<NurseryStatus, string> = {
      active: "Active",
      establishing: "Establishing",
      seasonal: "Seasonal",
      inactive: "Inactive",
    };
    return labels[this.status];
  }

  get coverImage(): NurseryImage | null {
    return this.images[0] ?? null;
  }
}
