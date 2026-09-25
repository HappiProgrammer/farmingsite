import type { FarmerDTO } from "@/lib/services/dto";

export interface MapPin {
  id: string;
  label: string;
  cx: number; // SVG x in 0-1000 space
  cy: number; // SVG y in 0-700 space
  farmer: FarmerDTO | null;
}

/**
 * Geographic → SVG coordinate mapping for the South West Region SVG
 * (viewBox 0 0 1000 700).
 *
 * The region roughly spans:
 *   Latitude  3.8°N – 5.0°N  → SVG y: 580 (south) – 120 (north)
 *   Longitude 8.6°E – 10.0°E → SVG x: 100 (west)  – 900 (east)
 *
 * These are area-level approximations — never precise addresses.
 */
function latLngToSvg(lat: number, lng: number): { cx: number; cy: number } {
  const LAT_MIN = 3.8, LAT_MAX = 5.0;
  const LNG_MIN = 8.6, LNG_MAX = 10.0;
  const SVG_X_MIN = 110, SVG_X_MAX = 890;
  const SVG_Y_MIN = 130, SVG_Y_MAX = 570;

  const cx = SVG_X_MIN + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (SVG_X_MAX - SVG_X_MIN);
  // Latitude is inverted: higher lat → lower y value (north is up)
  const cy = SVG_Y_MAX - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * (SVG_Y_MAX - SVG_Y_MIN);

  return { cx: Math.round(cx), cy: Math.round(cy) };
}

/**
 * Build map pins from an array of FarmerDTOs.
 * Farmers without coordinates get a sensible fallback centre-point.
 */
export function buildMapPins(farmers: FarmerDTO[]): MapPin[] {
  return farmers.map((farmer) => ({
    id: farmer.id,
    label: farmer.locationArea,
    cx: 500,
    cy: 350,
    farmer,
  }));
}

/**
 * Build map pins from raw coordinate data paired with farmers.
 * This is the preferred path — call from Server Components where
 * raw JSON data (including coordinates) is available.
 */
export function buildMapPinsFromCoords(
  entries: Array<{
    farmer: FarmerDTO;
    coordinates: { lat: number; lng: number } | null;
  }>,
): MapPin[] {
  return entries.map(({ farmer, coordinates }) => {
    const { cx, cy } = coordinates
      ? latLngToSvg(coordinates.lat, coordinates.lng)
      : { cx: 500, cy: 350 };

    return {
      id: farmer.id,
      label: farmer.locationArea,
      cx,
      cy,
      farmer,
    };
  });
}
