"use client";

import { useState } from "react";
import Link from "next/link";
import type { MapPin } from "@/lib/utils/mapPins";

interface ProjectMapProps {
  pins: MapPin[];
  className?: string;
}

// ─── Pop-up card shown when a pin is active ───────────────────────────────────
function PinCard({
  pin,
  onClose,
}: {
  pin: MapPin;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute z-20 w-56 rounded-card-lg border border-border bg-white p-4 shadow-lg"
      style={{
        // Place the card above the pin; clamp so it never overflows the SVG edges
        left: `clamp(8px, calc(${(pin.cx / 1000) * 100}% - 7rem), calc(100% - 15rem))`,
        top: `clamp(8px, calc(${(pin.cy / 700) * 100}% - 9rem), calc(100% - 7rem))`,
      }}
      role="dialog"
      aria-modal="false"
      aria-label={`Location: ${pin.label}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close location card"
        className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-ink-light transition-colors hover:bg-border hover:text-ink"
      >
        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden="true">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <p className="mb-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-accent">
        {pin.label}
      </p>

      {pin.farmer ? (
        <>
          <p className="font-display text-sm font-bold leading-tight text-ink">
            {pin.farmer.name}
          </p>
          <p className="mt-0.5 text-xs text-ink-light">
            {pin.farmer.role}
          </p>
          <Link
            href={`/farmers/${pin.farmer.slug}`}
            className="mt-3 inline-block text-xs font-semibold text-accent transition-colors hover:text-ink"
          >
            View Profile →
          </Link>
        </>
      ) : (
        <p className="mt-1 text-xs italic text-ink-light">[Farmer details coming soon]</p>
      )}
    </div>
  );
}

export default function ProjectMap({ pins, className = "" }: ProjectMapProps) {
  const [activePin, setActivePin] = useState<string | null>(null);

  const handlePin = (id: string) => {
    setActivePin((prev) => (prev === id ? null : id));
  };

  const activePinData = pins.find((p) => p.id === activePin) ?? null;

  return (
    <div
      className={["relative w-full select-none", className].join(" ")}
      aria-label="AIVDP/SOWEDA project locations map — South West Region"
    >
      {/* ── SVG Map ─────────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 1000 700"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        role="img"
        aria-label="Illustrated map of the South West Region, Cameroon, showing project locations"
      >
        <title>Project locations — South West Region, Cameroon</title>

        {/* ── Background wash ─────────────────────────────────────────── */}
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#2d5016" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a2e1a" stopOpacity="0.02" />
          </radialGradient>
          <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1a2e1a" floodOpacity="0.25" />
          </filter>
        </defs>

        <rect width="1000" height="700" fill="url(#bgGrad)" rx="16" />

        {/* ── Illustrated coastline / region outline ───────────────────
             Stylized silhouette of the South West Region (Cameroon).
             Not a precise geographic boundary — aesthetic area-level only. */}
        <path
          d="
            M 160 80
            C 200 60, 320 55, 440 70
            C 560 85, 680 75, 780 100
            C 860 120, 900 160, 920 220
            C 940 280, 930 340, 910 400
            C 890 460, 850 510, 800 550
            C 750 590, 680 620, 600 640
            C 520 660, 440 660, 360 645
            C 280 630, 200 595, 150 550
            C 100 505, 80 450, 75 390
            C 70 330, 80 270, 100 210
            C 120 155, 140 100, 160 80
            Z
          "
          fill="#3a6b1e"
          fillOpacity="0.12"
          stroke="#2d6a2d"
          strokeWidth="2"
          strokeOpacity="0.35"
        />

        {/* ── Internal sub-region lines (suggest districts) ───────────── */}
        {[
          "M 350 120 C 380 200, 370 300, 340 400",
          "M 600 110 C 620 200, 610 310, 590 420",
          "M 200 300 C 340 310, 490 305, 640 300",
          "M 180 460 C 320 450, 480 455, 650 460",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#2d6a2d"
            strokeWidth="1"
            strokeOpacity="0.18"
            fill="none"
            strokeDasharray="6 5"
          />
        ))}

        {/* ── Atlantic coast suggestion (bottom-left) ──────────────────── */}
        <path
          d="M 75 390 C 90 470, 110 530, 150 550"
          stroke="#2d5016"
          strokeWidth="3"
          strokeOpacity="0.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Mount Cameroon suggestion (large elevation near Buea) ─────── */}
        <ellipse
          cx="290"
          cy="430"
          rx="55"
          ry="30"
          fill="#4a7c2f"
          fillOpacity="0.18"
        />
        <path
          d="M 255 430 L 290 370 L 325 430"
          fill="#4a7c2f"
          fillOpacity="0.28"
          stroke="#3a6b1e"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* ── Label: South West Region ─────────────────────────────────── */}
        <text
          x="500"
          y="55"
          textAnchor="middle"
          fontFamily="var(--font-sans, system-ui)"
          fontSize="13"
          fontWeight="600"
          letterSpacing="3"
          fill="#111111"
          fillOpacity="0.5"
        >
          SOUTH WEST REGION · CAMEROON
        </text>

        {/* ── Forest texture dots ──────────────────────────────────────── */}
        {[
          [400, 200], [450, 260], [420, 320], [500, 200], [550, 270],
          [480, 340], [600, 220], [650, 290], [580, 350], [700, 250],
          [380, 400], [440, 470], [500, 430], [560, 470], [620, 430],
          [320, 280], [260, 360], [700, 400], [740, 360], [760, 430],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.5"
            fill="#3a6b1e"
            fillOpacity="0.12"
          />
        ))}

        {/* ── Location pins ────────────────────────────────────────────── */}
        {pins.map((pin) => {
          const isActive = activePin === pin.id;
          return (
            <g
              key={pin.id}
              transform={`translate(${pin.cx}, ${pin.cy})`}
              className="cursor-pointer"
              onClick={() => handlePin(pin.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePin(pin.id); }}
              role="button"
              tabIndex={0}
              aria-label={`View ${pin.label}${pin.farmer ? ` — ${pin.farmer.name}` : ""}`}
              aria-pressed={isActive}
              filter="url(#pinShadow)"
            >
              {/* Pulse ring — visible only when active */}
              {isActive && (
                <circle
                  r="22"
                  fill="#ffffff"
                  fillOpacity="0.2"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                >
                  <animate
                    attributeName="r"
                    from="14"
                    to="28"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Pin body — teardrop shape */}
              <path
                d={`M 0 -22 C -10 -22, -16 -14, -16 -8 C -16 2, 0 16, 0 16 C 0 16, 16 2, 16 -8 C 16 -14, 10 -22, 0 -22 Z`}
                fill={isActive ? "#ffffff" : "#2d6a2d"}
                stroke={isActive ? "#111111" : "#1a2e1a"}
                strokeWidth="1.5"
                className="transition-all duration-200"
              />
              {/* Pin dot */}
              <circle
                cx="0"
                cy="-8"
                r="4"
                fill={isActive ? "#1a2e1a" : "#ffffff"}
                className="transition-all duration-200"
              />

              {/* Area label below the pin */}
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fontFamily="var(--font-sans, system-ui)"
                fontSize="10"
                fontWeight="600"
                letterSpacing="0.5"
                fill="#111111"
                fillOpacity="0.7"
              >
                {pin.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Pop-up card rendered in HTML (not SVG) for full styling ─── */}
      {activePinData && (
        <PinCard
          pin={activePinData}
          onClose={() => setActivePin(null)}
        />
      )}

      {/* Screen-reader fallback list */}
      <ul className="sr-only">
        {pins.map((pin) => (
          <li key={pin.id}>
            <strong>{pin.label}</strong>
            {pin.farmer && (
              <>
                {" "}: {pin.farmer.name} —{" "}
                <Link href={`/farmers/${pin.farmer.slug}`}>View profile</Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
