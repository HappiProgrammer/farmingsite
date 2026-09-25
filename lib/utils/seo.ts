import type { Metadata } from "next";

export const BASE_URL = "https://aivdp-soweda.org";
export const SITE_NAME = "AIVDP/SOWEDA Oil-Palm Farmer Platform";

// ─── Per-page metadata builder ────────────────────────────────────────────────

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image ?? `${BASE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

/**
 * Organization JSON-LD — placed once in the root layout.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "A platform showcasing the AIVDP/SOWEDA oil-palm farmer development project — real farmers, real nurseries, real impact.",
    sameAs: [],
  };
}

/**
 * WebSite JSON-LD — placed once in the root layout.
 * Enables potential sitelinks search box in Google results.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    description:
      "Documentary-style platform for the AIVDP/SOWEDA oil-palm farmer development project.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/farmers?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * JSON-LD for an individual farmer profile page (Person schema).
 */
export function farmerProfileJsonLd({
  name,
  description,
  image,
  url,
  locationArea,
  locationRegion,
}: {
  name: string;
  description: string;
  image: string | null;
  url: string;
  locationArea?: string;
  locationRegion?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    ...(image ? { image: `${BASE_URL}${image}` } : {}),
    url,
    worksFor: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
    },
    ...(locationArea
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: locationArea,
            addressRegion: locationRegion ?? "South West Region",
            addressCountry: "CM",
          },
        }
      : {}),
  };
}

/**
 * JSON-LD for the /impact page (DataFeed / Report schema).
 */
export function impactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    name: "AIVDP/SOWEDA Oil-Palm Farmer Development — Impact Report",
    url: `${BASE_URL}/impact`,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    about: {
      "@type": "Thing",
      name: "Oil-palm farmer development, South West Region, Cameroon",
    },
  };
}

/**
 * JSON-LD for the /farmers directory (ItemList).
 */
export function farmerDirectoryJsonLd(
  farmers: Array<{ name: string; slug: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIVDP/SOWEDA Oil-Palm Farmer Directory",
    url: `${BASE_URL}/farmers`,
    itemListElement: farmers.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/farmers/${f.slug}`,
      name: f.name,
    })),
  };
}

/**
 * JSON-LD for the /nurseries directory (ItemList).
 */
export function nurseryDirectoryJsonLd(
  nurseries: Array<{ name: string; locationArea: string; farmerId: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIVDP/SOWEDA Nursery Directory",
    url: `${BASE_URL}/nurseries`,
    itemListElement: nurseries.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: n.name,
    })),
  };
}
