import type { MetadataRoute } from "next";
import { getFarmerRepository } from "@/lib/services/FarmerRepository";
import { BASE_URL } from "@/lib/utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const farmerPages = getFarmerRepository()
    .allSlugs()
    .map((slug) => ({
      url: `${BASE_URL}/farmers/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/the-project`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/impact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/farmers`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/nurseries`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/stories`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    ...farmerPages,
  ];
}
