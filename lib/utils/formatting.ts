/**
 * Format a number with comma-separated thousands.
 * Returns a placeholder string if the value is null.
 */
export function formatNumber(
  value: number | null,
  placeholder = "—",
): string {
  if (value === null) return placeholder;
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Truncate a string to maxLength characters, appending "…" if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

/**
 * Convert a string to a URL-safe slug.
 * e.g. "Farmer Name — Location" → "farmer-name-location"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
