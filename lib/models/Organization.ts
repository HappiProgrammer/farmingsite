export interface OrganizationData {
  id: string;
  acronym: string;
  fullName: string;
  role: string;
  description: string;
  logoSrc: string | null;
  logoAlt: string | null;
  websiteUrl: string | null;
}

export class Organization {
  readonly id: string;
  readonly acronym: string;
  readonly fullName: string;
  readonly role: string;
  readonly description: string;
  readonly logoSrc: string | null;
  readonly logoAlt: string | null;
  readonly websiteUrl: string | null;

  constructor(data: OrganizationData) {
    this.id = data.id;
    this.acronym = data.acronym;
    this.fullName = data.fullName;
    this.role = data.role;
    this.description = data.description;
    this.logoSrc = data.logoSrc;
    this.logoAlt = data.logoAlt ?? `${data.acronym} logo`;
    this.websiteUrl = data.websiteUrl;
  }

  get displayName(): string {
    return `${this.acronym} — ${this.fullName}`;
  }
}
