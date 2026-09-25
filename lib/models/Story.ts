export interface StoryData {
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
  publishedDate: string | null; // ISO date string or null
}

export class Story {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly thumbnailSrc: string | null;
  readonly thumbnailAlt: string;
  readonly videoSrc: string | null;
  readonly durationLabel: string | null;
  readonly farmerName: string | null;
  readonly farmerSlug: string | null;
  readonly featured: boolean;
  readonly publishedDate: string | null;

  constructor(data: StoryData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnailSrc = data.thumbnailSrc;
    this.thumbnailAlt = data.thumbnailAlt;
    this.videoSrc = data.videoSrc;
    this.durationLabel = data.durationLabel;
    this.farmerName = data.farmerName;
    this.farmerSlug = data.farmerSlug;
    this.featured = data.featured;
    this.publishedDate = data.publishedDate;
  }

  hasVideo(): boolean {
    return this.videoSrc !== null;
  }

  /** href used for linking — if farmer slug exists, link to profile; else anchor. */
  get href(): string {
    return this.farmerSlug ? `/farmers/${this.farmerSlug}` : `/stories#${this.id}`;
  }
}
