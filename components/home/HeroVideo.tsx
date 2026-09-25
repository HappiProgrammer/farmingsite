"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Play / pause based on visibility
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

  // Scroll progress over the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Video wrapper transforms ──────────────────────────────────────────────
  const videoScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.55]);
  const videoX = useTransform(scrollYProgress, [0, 0.6], ["0%", "38%"]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.4], [0, 16]);
  const videoY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);

  // Hero text: fades out as video parks
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  // Scene 1 label: fades in alongside the parked video
  const scene1Opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const scene1Y = useTransform(scrollYProgress, [0.3, 0.6], [20, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const staticStyle = reduced ? {} : undefined;

  return (
    <section
      ref={containerRef}
      className="relative bg-surface-dark"
      style={{ height: reduced ? "100vh" : "200vh" }}
      aria-label="Hero — From Support to Growth"
    >
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Full-bleed video wrapper (animated) ───────────────────────── */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={
            reduced
              ? staticStyle
              : {
                  scale: videoScale,
                  x: videoX,
                  y: videoY,
                  borderRadius: videoRadius,
                  originX: 0.5,
                  originY: 0.5,
                }
          }
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
          {/* Video overlay gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-surface-dark/15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-surface-dark/60 via-transparent to-transparent"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Hero headline content (fades out on scroll) ────────────────── */}
        <motion.div
          className="absolute inset-0 z-10 flex items-end"
          style={reduced ? staticStyle : { opacity: textOpacity, y: textY }}
        >
          <div className="container-content pb-14 pt-28 sm:pb-20 sm:pt-40 md:pb-28 lg:pb-32">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                AIVDP / SOWEDA
              </p>
              <h1 className="font-display text-display-xl font-bold text-white">
                Growing Better Palms.{" "}
                <em className="not-italic text-white/80">
                  Growing Better Livelihoods.
                </em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                [PROJECT DESCRIPTION — access to improved planting material,
                nursery development, and agricultural opportunity for oil-palm
                farmers in the South West Region.]
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button href="/the-project" variant="primary" size="md" className="sm:!px-7 sm:!py-3.5 sm:!text-base">
                  Explore the Project
                </Button>
                <Button href="/farmers" variant="outline-light" size="md" className="sm:!px-7 sm:!py-3.5 sm:!text-base">
                  Meet the Farmers
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Scene 1 text (fades in as video parks) ────────────────────── */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center"
            style={{ opacity: scene1Opacity, y: scene1Y, pointerEvents: "none" }}
            aria-hidden="true"
          >
            <div className="container-content">
              <div className="max-w-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  The Farmer
                </p>
                <p className="font-display text-display-lg font-bold leading-tight text-white">
                  Real farmers.
                  <br />
                  <span className="text-white/70">Real stories.</span>
                  <br />
                  Real impact.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll cue — fades out early */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          style={reduced ? staticStyle : { opacity: scrollCueOpacity }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <div className="h-8 w-px animate-bounce bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
