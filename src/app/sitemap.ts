import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mentorbridge.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
