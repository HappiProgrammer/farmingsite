import Image from "next/image";
import type { Organization } from "@/lib/models/Organization";
import SectionHeading from "@/components/ui/SectionHeading";

interface OrganizationSectionProps {
  organizations: Organization[];
  light?: boolean;
}

export default function OrganizationSection({
  organizations,
  light = false,
}: OrganizationSectionProps) {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow="The Organizations"
        heading="Who is behind this project"
        light={light}
      />

      <div className="grid gap-8 md:grid-cols-2">
        {organizations.map((org) => (
          <div
            key={org.id}
            className={[
              "flex flex-col gap-5 rounded-card-lg p-8",
              light
                ? "bg-white/5 backdrop-blur-sm"
                : "bg-off-white border border-border",
            ].join(" ")}
          >
            {/* Logo or acronym fallback */}
            <div className="flex items-center gap-4">
              {org.logoSrc ? (
                <div className="relative h-14 w-28 flex-shrink-0">
                  <Image
                    src={org.logoSrc}
                    alt={org.logoAlt ?? `${org.acronym} logo`}
                    fill
                    className="object-contain object-left"
                    sizes="112px"
                  />
                </div>
              ) : (
                <div
                  className={[
                    "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-card text-lg font-bold",
                    light
                      ? "bg-accent/20 text-accent"
                      : "bg-accent/10 text-accent",
                  ].join(" ")}
                  aria-label={`${org.acronym} — logo not yet provided`}
                >
                  {org.acronym.slice(0, 2)}
                </div>
              )}
              <div>
                <p
                  className={[
                    "text-xs font-semibold uppercase tracking-widest",
                    light ? "text-accent" : "text-accent",
                  ].join(" ")}
                >
                  {org.role}
                </p>
                <p
                  className={[
                    "font-display text-lg font-bold leading-tight",
                    light ? "text-white" : "text-ink",
                  ].join(" ")}
                >
                  {org.acronym}
                </p>
              </div>
            </div>

            <p
              className={[
                "text-sm leading-relaxed",
                light ? "text-white/70" : "text-ink-mid",
              ].join(" ")}
            >
              {org.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
