import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://upshiftbr.com.br/sitemap.xml",
    host: "https://upshiftbr.com.br",
  };
}
