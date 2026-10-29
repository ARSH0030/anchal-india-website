import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/es"] }],
    sitemap: "https://www.anchalpiston.com/sitemap.xml",
    host: "https://www.anchalpiston.com",
  };
}
