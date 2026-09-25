"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMetricDTO } from "@/lib/services/dto";
import type { MetricIconName } from "@/lib/models/ProjectMetric";

// ─── Icon map ──────────────────────────────────────────────────────────────────
function MetricIcon({ name, className }: { name: MetricIconName; className?: string }) {
  const base = `w-7 h-7 ${className ?? ""}`;
  switch (name) {
    case "farmers":
      return (
        <svg className={base} viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "communities":
      return (
        <svg className={base} viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 4L4 10v14h6v-8h8v8h6V10L14 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "nurseries":
      return (
        <svg className={base} viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 24V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 12C14 12 8 9 8 5c0 0 3-1 6 2 3-3 6-2 6-2 0 4-6 7-6 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "seedlings":
      return (
        <svg className={base} viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 24V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 14C14 14 7 10 7 5c3.5 0 7 3 7 3s3.5-3 7-3c0 5-7 9-7 9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "locations":
      return (
        <svg className={base} viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 4a7 7 0 017 7c0 5-7 13-7 13S7 16 7 11a7 7 0 017-7z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="14" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "years":
      return (
        <svg className={base} viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

// ─── Single counter card ───────────────────────────────────────────────────────
function CounterCard({ metric }: { metric: ProjectMetricDTO }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metric.value || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [metric.value, started]);

  useEffect(() => {
    if (!started || !metric.value) return;

    const target = metric.value;
    const duration = 1800; // ms
    const steps = 60;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease-out: slower near the end
      const progress = frame / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      setCount(Math.min(current, target));
      if (frame >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, metric.value]);

  const hasData = metric.value !== null && metric.status === "confirmed";

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 rounded-card-lg bg-white/5 px-6 py-8 text-center backdrop-blur-sm"
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
        <MetricIcon name={metric.iconName} />
      </div>

      {/* Value */}
      {hasData ? (
        <p className="font-display text-display-md font-bold text-white tabular-nums">
          {new Intl.NumberFormat("en-US").format(count)}
          {metric.unit === "seedlings" ? "+" : ""}
        </p>
      ) : (
        <p
          className="font-display text-display-md font-bold text-white/30"
          aria-label={metric.pendingLabel}
        >
          —
        </p>
      )}

      {/* Label */}
      <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
        {metric.label}
      </p>

      {/* Pending notice */}
      {!hasData && (
        <p className="text-xs text-white/35">{metric.pendingLabel}</p>
      )}
    </div>
  );
}

// ─── Exported grid ─────────────────────────────────────────────────────────────
export default function ImpactCounter({
  metrics,
}: {
  metrics: ProjectMetricDTO[];
}) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      aria-label="Project impact metrics"
    >
      {metrics.map((metric) => (
        <CounterCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
