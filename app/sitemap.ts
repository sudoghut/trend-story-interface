import { MetadataRoute } from "next";

export const revalidate = 86400; // 24 小时缓存

const FALLBACK: MetadataRoute.Sitemap = [
  { url: "https://trending.oopus.info/", lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch("https://trend-story-api.oopus.info/sitemap.xml", {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return FALLBACK;

    const xml = await res.text();

    // 解析 API 返回的 XML，提取 <url> 块中的 loc 和 lastmod
    const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
    const locRegex = /<loc>([^<]+)<\/loc>/;
    const lastmodRegex = /<lastmod>([^<]+)<\/lastmod>/;
    const changefreqRegex = /<changefreq>([^<]+)<\/changefreq>/;
    const priorityRegex = /<priority>([^<]+)<\/priority>/;

    const entries: MetadataRoute.Sitemap = [];
    let block: RegExpExecArray | null;

    while ((block = urlBlockRegex.exec(xml)) !== null) {
      const content = block[1];
      const loc = locRegex.exec(content)?.[1];
      if (!loc) continue;

      const lastmod = lastmodRegex.exec(content)?.[1];
      const changefreq = changefreqRegex.exec(content)?.[1] as
        | MetadataRoute.Sitemap[0]["changeFrequency"]
        | undefined;
      const priority = priorityRegex.exec(content)?.[1];

      entries.push({
        url: loc,
        lastModified: lastmod ? new Date(lastmod) : new Date(),
        changeFrequency: changefreq,
        priority: priority ? parseFloat(priority) : undefined,
      });
    }

    return entries.length > 0 ? entries : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
