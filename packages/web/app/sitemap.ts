export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getSkills, getSkillSlug } from "@/lib/skills";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const skills = await getSkills();
  const base = "https://claudecmd.com";

  const skillUrls = skills.map((skill) => ({
    url: `${base}/skills/${getSkillSlug(skill)}`,
    lastModified: new Date(skill.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/skills`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/stats`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    ...skillUrls,
  ];
}
