"use client";

import { useState, useMemo } from "react";
import FarmerCard from "@/components/farmers/FarmerCard";
import type { FarmerWithNurseryDTO } from "@/lib/services/dto";

type SortKey = "name" | "location" | "verified";

interface FarmerDirectoryClientProps {
  farmersWithNurseries: FarmerWithNurseryDTO[];
  regions: string[];
}

export default function FarmerDirectoryClient({
  farmersWithNurseries,
  regions,
}: FarmerDirectoryClientProps) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [seedlingsOnly, setSeedlingsOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...farmersWithNurseries];

    // Text search — name or location
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        ({ farmer }) =>
          farmer.name.toLowerCase().includes(q) ||
          farmer.locationArea.toLowerCase().includes(q) ||
          farmer.locationRegion.toLowerCase().includes(q),
      );
    }

    // Region filter
    if (regionFilter !== "all") {
      result = result.filter(
        ({ farmer }) => farmer.locationRegion === regionFilter,
      );
    }

    // Seedlings available
    if (seedlingsOnly) {
      result = result.filter(({ hasAvailableSeedlings }) => hasAvailableSeedlings);
    }

    // Sort
    result.sort((a, b) => {
      if (sortKey === "name") return a.farmer.name.localeCompare(b.farmer.name);
      if (sortKey === "location")
        return a.farmer.locationArea.localeCompare(b.farmer.locationArea);
      if (sortKey === "verified")
        return Number(b.farmer.verified) - Number(a.farmer.verified);
      return 0;
    });

    return result;
  }, [farmersWithNurseries, search, regionFilter, sortKey, seedlingsOnly]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filter bar */}
      <div
        className="flex flex-wrap items-end gap-4 rounded-card-lg border border-border bg-off-white p-5"
        role="search"
        aria-label="Filter and sort farmers"
      >
        {/* Search */}
        <div className="flex flex-1 flex-col gap-1.5 min-w-48">
          <label htmlFor="farmer-search" className="text-xs font-semibold uppercase tracking-widest text-ink-light">
            Search
          </label>
          <div className="relative">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light/50"
              aria-hidden="true"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              id="farmer-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or location…"
              className="w-full rounded-card border border-border bg-white py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-light/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Region */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="region-filter" className="text-xs font-semibold uppercase tracking-widest text-ink-light">
            Region
          </label>
          <select
            id="region-filter"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="rounded-card border border-border bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sort-key" className="text-xs font-semibold uppercase tracking-widest text-ink-light">
            Sort by
          </label>
          <select
            id="sort-key"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-card border border-border bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="verified">Verified first</option>
          </select>
        </div>

        {/* Seedlings toggle */}
        <label className="flex cursor-pointer items-center gap-2 pb-2.5">
          <input
            type="checkbox"
            checked={seedlingsOnly}
            onChange={(e) => setSeedlingsOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="text-sm font-medium text-ink-mid">
            Seedlings available
          </span>
        </label>
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-light" aria-live="polite" aria-atomic="true">
        {filtered.length === farmersWithNurseries.length
          ? `Showing all ${filtered.length} farmers`
          : `${filtered.length} of ${farmersWithNurseries.length} farmers`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Farmer directory"
        >
          {filtered.map(({ farmer, nursery, hasAvailableSeedlings }) => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              nursery={nursery}
              hasAvailableSeedlings={hasAvailableSeedlings}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-card-lg border border-dashed border-border py-16 text-center">
          <p className="text-base font-medium text-ink-mid">
            No farmers match your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
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
