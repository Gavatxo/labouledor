import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/club";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/concours", changeFrequency: "weekly", priority: 0.9 },
    { path: "/vie", changeFrequency: "weekly", priority: 0.8 },
    { path: "/club", changeFrequency: "monthly", priority: 0.7 },
    { path: "/rejoindre", changeFrequency: "monthly", priority: 0.7 },
    { path: "/nous-trouver", changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
