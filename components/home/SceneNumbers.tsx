import type { ProjectMetricDTO } from "@/lib/services/dto";
import ImpactCounter from "@/components/shared/ImpactCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface SceneNumbersProps {
  metrics: ProjectMetricDTO[];
}

export default function SceneNumbers({ metrics }: SceneNumbersProps) {
  return (
    <section
      id="scene-numbers"
      className="section-padding bg-surface-dark"
      aria-labelledby="scene-numbers-heading"
    >
      <div className="container-content flex flex-col gap-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6 md:justify-between">
          <SectionHeading
            eyebrow="Scene 5 — The Numbers"
            heading="The project in figures"
            subheading="Impact data is updated as confirmed project records become available. Placeholders are shown honestly where data has not yet been supplied."
            light
            id="scene-numbers-heading"
          />
          <Button href="/impact" variant="outline-light" size="md" className="shrink-0">
            Full Impact Report →
          </Button>
        </div>

        <ImpactCounter metrics={metrics} />
      </div>
    </section>
  );
}
