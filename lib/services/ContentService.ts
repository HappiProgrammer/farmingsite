import type { OrganizationData } from "@/lib/models/Organization";
import { Organization } from "@/lib/models/Organization";
import type { NurseryData } from "@/lib/models/Nursery";
import { Nursery } from "@/lib/models/Nursery";
import organizationsRaw from "@/lib/content/organizations.json";
import nurseriesRaw from "@/lib/content/nurseries.json";

const organizationsData = organizationsRaw as OrganizationData[];
const nurseriesData = nurseriesRaw as NurseryData[];

export class ContentService {
  private readonly organizations: Organization[];
  private readonly nurseries: Nursery[];

  constructor() {
    this.organizations = organizationsData.map((d) => new Organization(d));
    this.nurseries = nurseriesData.map((d) => new Nursery(d));
  }

  findAllOrganizations(): Organization[] {
    return this.organizations;
  }

  findOrganizationById(id: string): Organization | null {
    return this.organizations.find((o) => o.id === id) ?? null;
  }

  findAllNurseries(): Nursery[] {
    return this.nurseries;
  }

  findNurseryById(id: string): Nursery | null {
    return this.nurseries.find((n) => n.id === id) ?? null;
  }

  findNurseriesByStatus(status: Nursery["status"]): Nursery[] {
    return this.nurseries.filter((n) => n.status === status);
  }
}

let _service: ContentService | null = null;

export function getContentService(): ContentService {
  if (!_service) _service = new ContentService();
  return _service;
}
