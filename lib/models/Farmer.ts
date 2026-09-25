export interface FarmerData {
  id: string;
  slug: string;
  name: string;
  role: string;
  locationArea: string;
  locationRegion: string;
  portraitSrc: string | null;
  portraitAlt: string | null;
  bio: string | null;
  story: string | null;
  nurseryId: string | null;
  verified: boolean;
  joinedYear: number | null;
  galleryImages: FarmerGalleryImage[];
  whatsappNumber: string | null; // E.164 format, e.g. "+237600000000"
  coordinates: { lat: number; lng: number } | null; // area-level, never precise address
}

export interface FarmerGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export class Farmer {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly locationArea: string;
  readonly locationRegion: string;
  readonly portraitSrc: string | null;
  readonly portraitAlt: string | null;
  readonly bio: string | null;
  readonly story: string | null;
  readonly nurseryId: string | null;
  readonly verified: boolean;
  readonly joinedYear: number | null;
  readonly galleryImages: FarmerGalleryImage[];
  readonly whatsappNumber: string | null;
  readonly coordinates: { lat: number; lng: number } | null;

  constructor(data: FarmerData) {
    this.id = data.id;
    this.slug = data.slug;
    this.name = data.name;
    this.role = data.role;
    this.locationArea = data.locationArea;
    this.locationRegion = data.locationRegion;
    this.portraitSrc = data.portraitSrc;
    this.portraitAlt = data.portraitAlt ?? `Portrait of ${data.name}`;
    this.bio = data.bio;
    this.story = data.story;
    this.nurseryId = data.nurseryId;
    this.verified = data.verified;
    this.joinedYear = data.joinedYear;
    this.galleryImages = data.galleryImages;
    this.whatsappNumber = data.whatsappNumber;
    this.coordinates = data.coordinates;
  }

  hasAvailableSeedlings(): boolean {
    // Resolved by FarmerRepository joining the nursery — this flag is set externally
    return false;
  }

  get whatsappUrl(): string | null {
    if (!this.whatsappNumber) return null;
    const digits = this.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${digits}`;
  }

  get displayLocation(): string {
    return `${this.locationArea}, ${this.locationRegion}`;
  }
}
