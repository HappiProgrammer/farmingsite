import ProjectMap from "@/components/shared/ProjectMap";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import type { MapPin } from "@/lib/utils/mapPins";

interface SceneMapProps {
  pins: MapPin[];
}

export default function SceneMap({ pins }: SceneMapProps) {
  return (
    <section
      id="scene-map"
      className="section-padding bg-white"
      aria-labelledby="scene-map-heading"
    >
      <div className="container-content flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Where we work"
            heading="Project locations"
            subheading="Locations are shown at community or area level. Click any pin to see the farmer profile for that area."
            id="scene-map-heading"
          />
          <Button href="/farmers" variant="primary" size="md" className="shrink-0">
            View All Farmers →
          </Button>
        </div>

        <div className="overflow-hidden rounded-card-lg border border-border bg-off-white shadow-sm">
          <ProjectMap pins={pins} className="max-h-[520px]" />
        </div>

        <p className="text-xs text-ink-light">
          * Pins indicate community or area level only — no precise personal
          addresses are shown on this platform.
        </p>
      </div>
    </section>
  );
}
