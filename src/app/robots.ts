import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/features", "/pricing", "/faq"],
        disallow: [
          "/mentee/",
          "/mentor/",
          "/profile/",
          "/api/",
          "/signin",
          "/signup",
        ],
      },
    ],
    sitemap: "https://mentorbridge.vercel.app/sitemap.xml",
  };
}
