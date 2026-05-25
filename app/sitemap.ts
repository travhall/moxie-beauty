import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://moxiebeautystudiowi.com";

  return [
    {
      url: baseUrl,
      lastModified: "2025-05-01",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/visit`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
