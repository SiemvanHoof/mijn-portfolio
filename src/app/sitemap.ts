import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const work = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...pages, ...work];
}