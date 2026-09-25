import type { ProjectMetricData } from "@/lib/models/ProjectMetric";
import { ProjectMetric } from "@/lib/models/ProjectMetric";
import metricsRaw from "@/lib/content/metrics.json";

const metricsData = metricsRaw as ProjectMetricData[];

export class MetricsService {
  private readonly metrics: ProjectMetric[];

  constructor() {
    this.metrics = metricsData.map((d) => new ProjectMetric(d));
  }

  findAll(): ProjectMetric[] {
    return this.metrics;
  }

  findById(id: string): ProjectMetric | null {
    return this.metrics.find((m) => m.id === id) ?? null;
  }

  /** Only metrics with confirmed values — useful for a "highlights" row. */
  confirmedOnly(): ProjectMetric[] {
    return this.metrics.filter((m) => m.isConfirmed());
  }
}

let _service: MetricsService | null = null;

export function getMetricsService(): MetricsService {
  if (!_service) _service = new MetricsService();
  return _service;
}
