"use client";

import { useState, useMemo } from "react";
import NurseryCard from "@/components/shared/NurseryCard";
import type { NurseryWithFarmerDTO } from "@/lib/services/dto";
import type { NurseryStatus } from "@/lib/models/Nursery";

const ALL_STATUSES: { value: NurseryStatus | "all"; label: string }[] = [
  { value: "all", label: "All nurseries" },
  { value: "active", label: "Active" },
  { value: "establishing", label: "Establishing" },
  { value: "seasonal", label: "Seasonal" },
  { value: "inactive", label: "Inactive" },
];

interface NurseryDirectoryClientProps {
  nurseriesWithFarmers: NurseryWithFarmerDTO[];
  regions: string[];
}

export default function NurseryDirectoryClient({
  nurseriesWithFarmers,
  regions,
}: NurseryDirectoryClientProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<NurseryStatus | "all">("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [seedlingsOnly, setSeedlingsOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...nurseriesWithFarmers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        ({ nursery, farmer }) =>
          nursery.name.toLowerCase().includes(q) ||
          nursery.locationArea.toLowerCase().includes(q) ||
          farmer?.name.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(({ nursery }) => nursery.status === statusFilter);
    }

    if (regionFilter !== "all") {
      result = result.filter(({ nursery }) => nursery.locationRegion === regionFilter);
    }

    if (seedlingsOnly) {
      result = result.filter(({ nursery }) => nursery.hasAvailableSeedlings);
    }

    return result;
  }, [nurseriesWithFarmers, search, statusFilter, regionFilter, seedlingsOnly]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filter bar */}
      <div
        className="flex flex-wrap items-end gap-4 rounded-card-lg border border-border bg-off-white p-5"
        role="search"
        aria-label="Filter nurseries"
      >
        {/* Search */}
        <div className="flex flex-1 flex-col gap-1.5 min-w-48">
          <label htmlFor="nursery-search" className="text-xs font-semibold uppercase tracking-widest text-ink-light">
            Search
          </label>
          <div className="relative">
            <svg viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light/50" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              id="nursery-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nursery name, area, or farmer…"
              className="w-full rounded-card border border-border bg-white py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-light/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status-filter" className="text-xs font-semibold uppercase tracking-widest text-ink-light">
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as NurseryStatus | "all")}
            className="rounded-card border border-border bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {ALL_STATUSES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        {regions.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nursery-region-filter" className="text-xs font-semibold uppercase tracking-widest text-ink-light">
              Region
            </label>
            <select
              id="nursery-region-filter"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="rounded-card border border-border bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {/* Seedlings toggle */}
        <label className="flex cursor-pointer items-center gap-2 pb-2.5">
          <input
            type="checkbox"
            checked={seedlingsOnly}
            onChange={(e) => setSeedlingsOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-sm font-medium text-ink-mid">Seedlings available</span>
        </label>
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-light" aria-live="polite" aria-atomic="true">
        {filtered.length === nurseriesWithFarmers.length
          ? `Showing all ${filtered.length} nurseries`
          : `${filtered.length} of ${nurseriesWithFarmers.length} nurseries`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" aria-label="Nursery directory">
          {filtered.map(({ nursery, farmer }) => (
            <NurseryCard key={nursery.id} nursery={nursery} farmer={farmer} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-card-lg border border-dashed border-border py-16 text-center">
          <p className="text-base font-medium text-ink-mid">No nurseries match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setRegionFilter("all");
              setSeedlingsOnly(false);
            }}
            className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
