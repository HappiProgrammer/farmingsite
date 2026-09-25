export type MetricStatus = "confirmed" | "pending" | "coming-soon";

export interface ProjectMetricData {
  id: string;
  label: string;
  value: number | null;
  unit: string;
  description: string | null;
  status: MetricStatus;
  iconName: MetricIconName;
}

export type MetricIconName =
  | "farmers"
  | "communities"
  | "nurseries"
  | "seedlings"
  | "locations"
  | "years";

export class ProjectMetric {
  readonly id: string;
  readonly label: string;
  readonly value: number | null;
  readonly unit: string;
  readonly description: string | null;
  readonly status: MetricStatus;
  readonly iconName: MetricIconName;

  constructor(data: ProjectMetricData) {
    this.id = data.id;
    this.label = data.label;
    this.value = data.value;
    this.unit = data.unit;
    this.description = data.description;
    this.status = data.status;
    this.iconName = data.iconName;
  }

  isConfirmed(): boolean {
    return this.status === "confirmed";
  }

  /** Formatted display value — never invents a number. */
  get displayValue(): string {
    if (this.value === null) return "—";
    // Format with thousands separator
    return new Intl.NumberFormat("en-US").format(this.value);
  }

  /** Short label shown under the counter when data is not yet available. */
  get pendingLabel(): string {
    return "Data coming soon";
  }
}
