import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/gallery", "/about", "/contact"];

  return pages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));
}
