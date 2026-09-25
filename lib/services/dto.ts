/**
 * Plain-object DTOs for passing data across the React Server Component /
 * Client Component boundary. Class instances (Farmer, Nursery, etc.) are
 * not serialisable by Next.js, so we convert them here before passing
 * as props to any "use client" component.
 */

import type { Farmer, FarmerGalleryImage } from "@/lib/models/Farmer";
import type { Nursery, NurseryStatus, SeedlingVariety, NurseryImage } from "@/lib/models/Nursery";
import type { FarmerWithNursery } from "@/lib/services/FarmerRepository";

// ── Farmer DTO ────────────────────────────────────────────────────────────────
export interface FarmerDTO {
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
  whatsappUrl: string | null;
  displayLocation: string;
}

export interface NurseryDTO {
  id: string;
  farmerId: string;
  name: string;
  establishedYear: number | null;
  locationArea: string;
  locationRegion: string;
  status: NurseryStatus;
  statusLabel: string;
  totalCapacity: number | null;
  currentSeedlings: number | null;
  availableSeedlings: number | null;
  seedlingVarieties: SeedlingVariety[];
  images: NurseryImage[];
  description: string | null;
  isReady: boolean;
  hasAvailableSeedlings: boolean;
}

export interface FarmerWithNurseryDTO {
  farmer: FarmerDTO;
  nursery: NurseryDTO | null;
  hasAvailableSeedlings: boolean;
}

export function toFarmerDTO(farmer: Farmer): FarmerDTO {
  return {
    id: farmer.id,
    slug: farmer.slug,
    name: farmer.name,
    role: farmer.role,
    locationArea: farmer.locationArea,
    locationRegion: farmer.locationRegion,
    portraitSrc: farmer.portraitSrc,
    portraitAlt: farmer.portraitAlt,
    bio: farmer.bio,
    story: farmer.story,
    nurseryId: farmer.nurseryId,
    verified: farmer.verified,
    joinedYear: farmer.joinedYear,
    galleryImages: farmer.galleryImages,
    whatsappUrl: farmer.whatsappUrl,
    displayLocation: farmer.displayLocation,
  };
}

export function toNurseryDTO(nursery: Nursery): NurseryDTO {
  return {
    id: nursery.id,
    farmerId: nursery.farmerId,
    name: nursery.name,
    establishedYear: nursery.establishedYear,
    locationArea: nursery.locationArea,
    locationRegion: nursery.locationRegion,
    status: nursery.status,
    statusLabel: nursery.statusLabel,
    totalCapacity: nursery.totalCapacity,
    currentSeedlings: nursery.currentSeedlings,
    availableSeedlings: nursery.availableSeedlings,
    seedlingVarieties: nursery.seedlingVarieties,
    images: nursery.images,
    description: nursery.description,
    isReady: nursery.isReady(),
    hasAvailableSeedlings: nursery.hasAvailableSeedlings(),
  };
}

export function toFarmerWithNurseryDTO(fwn: FarmerWithNursery): FarmerWithNurseryDTO {
  return {
    farmer: toFarmerDTO(fwn.farmer),
    nursery: fwn.nursery ? toNurseryDTO(fwn.nursery) : null,
    hasAvailableSeedlings: fwn.hasAvailableSeedlings,
  };
}

// ── Story DTO ─────────────────────────────────────────────────────────────────
import type { Story } from "@/lib/models/Story";

export interface StoryDTO {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string | null;
  thumbnailAlt: string;
  videoSrc: string | null;
  durationLabel: string | null;
  farmerName: string | null;
  farmerSlug: string | null;
  featured: boolean;
  publishedDate: string | null;
  href: string;
  hasVideo: boolean;
}

export function toStoryDTO(story: Story): StoryDTO {
  return {
    id: story.id,
    title: story.title,
    description: story.description,
    thumbnailSrc: story.thumbnailSrc,
    thumbnailAlt: story.thumbnailAlt,
    videoSrc: story.videoSrc,
    durationLabel: story.durationLabel,
    farmerName: story.farmerName,
    farmerSlug: story.farmerSlug,
    featured: story.featured,
    publishedDate: story.publishedDate,
    href: story.href,
    hasVideo: story.hasVideo(),
  };
}

// ── NurseryWithFarmer DTO ─────────────────────────────────────────────────────
export interface NurseryWithFarmerDTO {
  nursery: NurseryDTO;
  farmer: FarmerDTO | null;
}

// ── Organization DTO ──────────────────────────────────────────────────────────
import type { Organization } from "@/lib/models/Organization";

export interface OrganizationDTO {
  id: string;
  acronym: string;
  fullName: string;
  role: string;
  description: string;
  logoSrc: string | null;
  logoAlt: string | null;
  websiteUrl: string | null;
  displayName: string;
}

export function toOrganizationDTO(org: Organization): OrganizationDTO {
  return {
    id: org.id,
    acronym: org.acronym,
    fullName: org.fullName,
    role: org.role,
    description: org.description,
    logoSrc: org.logoSrc,
    logoAlt: org.logoAlt,
    websiteUrl: org.websiteUrl,
    displayName: org.displayName,
  };
}

// ── ProjectMetric DTO ─────────────────────────────────────────────────────────
import type { ProjectMetric, MetricStatus, MetricIconName } from "@/lib/models/ProjectMetric";

export interface ProjectMetricDTO {
  id: string;
  label: string;
  value: number | null;
  unit: string;
  description: string | null;
  status: MetricStatus;
  iconName: MetricIconName;
  displayValue: string;
  pendingLabel: string;
  isConfirmed: boolean;
}

export function toProjectMetricDTO(metric: ProjectMetric): ProjectMetricDTO {
  return {
    id: metric.id,
    label: metric.label,
    value: metric.value,
    unit: metric.unit,
    description: metric.description,
    status: metric.status,
    iconName: metric.iconName,
    displayValue: metric.displayValue,
    pendingLabel: metric.pendingLabel,
    isConfirmed: metric.isConfirmed(),
  };
}
