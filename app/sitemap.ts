import type { MetadataRoute } from "next";

const BASE_URL = "https://pos-2fa-intermediary.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/technologie",
    "/markt",
    "/patent",
    "/octrooi",
    "/anti-liquid-rfid-tag",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
