import type { MetadataRoute } from "next";

const BASE_URL = "https://pos-2fa-intermediary.com";

const ROUTES = [
  "",
  "/technologie",
  "/stappenplannen/situatie-1",
  "/stappenplannen/situatie-2",
  "/stappenplannen/situatie-3",
  "/stappenplannen/situatie-4",
  "/markt",
  "/patent",
  "/octrooi",
  "/pct-publicatie",
  "/anti-liquid-rfid-tag",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) => {
    const nlUrl = `${BASE_URL}${route}`;
    const enUrl = `${BASE_URL}/en${route}`;
    const alternates = { languages: { nl: nlUrl, en: enUrl } };
    const basis = {
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates,
    };
    return [
      { url: nlUrl, ...basis },
      { url: enUrl, ...basis, priority: route === "" ? 0.9 : 0.7 },
    ];
  });
}
