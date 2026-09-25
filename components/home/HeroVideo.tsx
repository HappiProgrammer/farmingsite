"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

// ── Volume control button (mute/unmute + slider) ──────────────────────────────
function VolumeControl({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [showSlider, setShowSlider] = useState(false);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (muted) {
      // Unmuting — restore volume and play with sound
      video.muted = false;
      video.volume = volume;
      setMuted(false);
      setShowSlider(true);
    } else {
      video.muted = true;
      setMuted(true);
      setShowSlider(false);
    }
  }, [muted, volume, videoRef]);

  const handleVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setVolume(v);
      const video = videoRef.current;
      if (!video) return;
      video.volume = v;
      if (v === 0) {
        video.muted = true;
        setMuted(true);
        setShowSlider(false);
      } else {
        video.muted = false;
        setMuted(false);
      }
    },
    [videoRef],
  );

  return (
    <div className="flex items-center gap-2">
      {/* Volume slider — shown when unmuted */}
      {showSlider && (
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolume}
            aria-label="Volume"
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30 accent-white sm:w-24"
          />
        </div>
      )}

      {/* Mute / unmute button */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 active:scale-95 sm:h-10 sm:w-10"
      >
        {muted ? (
          /* Muted icon */
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : volume < 0.4 ? (
          /* Low volume icon */
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          /* Full volume icon */
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Play/pause on visibility — always start muted for autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale       = useTransform(scrollYProgress, [0, 0.6], [1, 0.55]);
  const videoX           = useTransform(scrollYProgress, [0, 0.6], ["0%", "38%"]);
  const videoRadius      = useTransform(scrollYProgress, [0, 0.4], [0, 16]);
  const videoY           = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);
  const textOpacity      = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textYMotion      = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
  const scene1Opacity    = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const scene1Y          = useTransform(scrollYProgress, [0.3, 0.6], [20, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const simple = isMobile || !!reduced;

  // ── MOBILE layout ─────────────────────────────────────────────────────────
  if (simple) {
    return (
      <section
        className="relative flex h-[100svh] min-h-[560px] items-end overflow-hidden bg-surface-dark"
        aria-label="Hero — From Support to Growth"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Palm%20Oil%20farmer.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5"
          aria-hidden="true"
        />

        {/* Volume control — top right */}
        <div className="absolute right-4 top-[calc(var(--nav-height)+0.75rem)] z-20">
          <VolumeControl videoRef={videoRef} />
        </div>

        <div className="container-content relative z-10 pb-10 pt-28">
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
            AIVDP / SOWEDA
          </p>
          <h1 className="max-w-xs font-display text-3xl font-bold leading-tight text-white sm:max-w-md sm:text-4xl">
            Growing Better Palms.{" "}
            <em className="not-italic text-white/75">Growing Better Livelihoods.</em>
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65 sm:text-base">
            [PROJECT DESCRIPTION — improved planting material, nursery
            development, and agricultural opportunity in the South West Region.]
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/the-project" variant="primary" size="md">
              Explore the Project
            </Button>
            <Button href="/farmers" variant="outline-light" size="md">
              Meet the Farmers
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP layout ────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative bg-surface-dark"
      style={{ height: "200vh" }}
      aria-label="Hero — From Support to Growth"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
            originX: 0.5,
            originY: 0.5,
          }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/videos/Palm%20Oil%20farmer.mp4"
            poster="/images/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-surface-dark/15" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/60 via-transparent to-transparent" aria-hidden="true" />
        </motion.div>

        {/* Volume control — top right corner, always visible */}
        <div className="absolute right-6 top-[calc(var(--nav-height)+1rem)] z-30">
          <VolumeControl videoRef={videoRef} />
        </div>

        <motion.div
          className="absolute inset-0 z-10 flex items-end"
          style={{ opacity: textOpacity, y: textYMotion }}
        >
          <div className="container-content pb-28 pt-40 lg:pb-32">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                AIVDP / SOWEDA
              </p>
              <h1 className="font-display text-display-xl font-bold text-white">
                Growing Better Palms.{" "}
                <em className="not-italic text-white/80">Growing Better Livelihoods.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                [PROJECT DESCRIPTION — access to improved planting material,
                nursery development, and agricultural opportunity for oil-palm
                farmers in the South West Region.]
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/the-project" variant="primary" size="lg">Explore the Project</Button>
                <Button href="/farmers" variant="outline-light" size="lg">Meet the Farmers</Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20 flex items-center"
          style={{ opacity: scene1Opacity, y: scene1Y, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <div className="container-content">
            <div className="max-w-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">The Farmer</p>
              <p className="font-display text-display-lg font-bold leading-tight text-white">
                Real farmers.<br />
                <span className="text-white/70">Real stories.</span><br />
                Real impact.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          style={{ opacity: scrollCueOpacity }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">Scroll</span>
            <div className="h-8 w-px animate-bounce bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
