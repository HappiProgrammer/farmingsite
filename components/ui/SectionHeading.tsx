interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  light?: boolean; // true = white text (for dark backgrounds)
  className?: string;
  id?: string; // forwarded to the <h2> for aria-labelledby
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "left",
  light = false,
  className = "",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <span
          className={[
            "text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-accent" : "text-accent",
          ].join(" ")}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={[
          "font-display text-display-lg font-bold",
          light ? "text-white" : "text-ink",
        ].join(" ")}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={[
            "max-w-prose-wide text-base leading-relaxed",
            light ? "text-white/70" : "text-ink-mid",
          ].join(" ")}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
