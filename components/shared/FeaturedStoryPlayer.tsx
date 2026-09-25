"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StoryDTO } from "@/lib/services/dto";

interface FeaturedStoryPlayerProps {
  story: StoryDTO;
}

export default function FeaturedStoryPlayer({ story }: FeaturedStoryPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // IntersectionObserver — pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !story.videoSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [story.videoSrc]);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      id={story.id}
      className="group relative overflow-hidden rounded-card-lg bg-forest-deep"
      style={{ aspectRatio: "16 / 9" }}
    >
      {story.videoSrc ? (
        <video
          ref={videoRef}
          src={story.videoSrc}
          poster={story.thumbnailSrc ?? undefined}
          preload="metadata"
          playsInline
          muted={false}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={story.title}
          onEnded={() => setPlaying(false)}
        />
      ) : story.thumbnailSrc ? (
        <Image
          src={story.thumbnailSrc}
          alt={story.thumbnailAlt}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover opacity-60"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-mid/40 to-forest-deep" />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent"
        aria-hidden="true"
      />

      {/* Play / pause button */}
      {story.videoSrc && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={playing ? `Pause: ${story.title}` : `Play: ${story.title}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={[
              "flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
              playing
                ? "bg-white/10 opacity-0 group-hover:opacity-100"
                : "bg-white/20 hover:bg-white/30 hover:scale-110",
            ].join(" ")}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-white" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </span>
        </button>
      )}

      {/* Meta overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {story.farmerName && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-agri-yellow">
            {story.farmerName}
          </p>
        )}
        <h2 className="font-display text-display-md font-bold text-white">
          {story.title}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/65">
          {story.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {story.durationLabel && (
            <span className="text-xs text-cream/40">{story.durationLabel}</span>
          )}
          {story.farmerSlug && (
            <Link
              href={`/farmers/${story.farmerSlug}`}
              className="text-sm font-semibold text-agri-yellow transition-colors hover:text-agri-yellow-light"
            >
              View farmer profile →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
