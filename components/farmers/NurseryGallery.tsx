import Image from "next/image";
import type { NurseryImage } from "@/lib/models/Nursery";

interface NurseryGalleryProps {
  images: NurseryImage[];
  nurseryName: string;
}

export default function NurseryGallery({ images, nurseryName }: NurseryGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-card-lg border border-dashed border-border bg-off-white">
        <p className="text-sm italic text-ink-light">[NURSERY IMAGES TO BE ADDED]</p>
      </div>
    );
  }

  // 1 image: full-width. 2: side by side. 3+: mosaic with first image dominant
  const [primary, ...rest] = images;

  return (
    <div
      className={[
        "grid gap-3",
        rest.length === 0
          ? "grid-cols-1"
          : rest.length === 1
            ? "grid-cols-2"
            : "grid-cols-2",
      ].join(" ")}
      aria-label={`Photo gallery for ${nurseryName}`}
    >
      {/* Primary image — always full height on its own or spanning rows */}
      <div
        className={[
          "relative overflow-hidden rounded-card-lg bg-off-white",
          rest.length >= 2 ? "row-span-2" : "",
          rest.length === 0 ? "aspect-video col-span-1" : "aspect-square",
        ].join(" ")}
      >
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {primary.caption && (
          <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-surface-dark/80 to-transparent px-3 py-2 text-xs text-white/80">
            {primary.caption}
          </p>
        )}
      </div>

      {/* Secondary images */}
      {rest.slice(0, 2).map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="relative aspect-square overflow-hidden rounded-card-lg bg-off-white"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {img.caption && (
            <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-surface-dark/80 to-transparent px-3 py-2 text-xs text-white/80">
              {img.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
