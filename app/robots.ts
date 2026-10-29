import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/es"] }],
    sitemap: "https://anchalindia.com/sitemap.xml",
    host: "https://anchalindia.com",
  };
}
