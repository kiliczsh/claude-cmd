import skillsData from "@/data/commands.json";

export interface Skill {
  id: string;
  name: string;
  description: string;
  skillPath: string;
  filePath: string;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  frontmatter: {
    description: string | null;
    "argument-hint": string | null;
    "allowed-tools": string | null;
    model: string | null;
    context: string | null;
    "disable-model-invocation": boolean | null;
    "user-invocable": boolean | null;
  };
}

export interface SkillsData {
  version: number;
  skills: Skill[];
}

export async function getSkills(): Promise<Skill[]> {
  return (skillsData as SkillsData).skills as Skill[];
}

export function getCategories(skills: Skill[]): string[] {
  const all = skills.flatMap((s) => s.tags);
  const unique = Array.from(new Set(all)).sort();
  return unique;
}

export function getTopCategories(skills: Skill[]): string[] {
  const counts: Record<string, number> = {};
  for (const skill of skills) {
    for (const tag of skill.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([tag]) => tag);
}

export function getInstallCommand(skill: Skill): string {
  const slug = skill.id.split("/").pop() ?? skill.id;
  return `claude-cmd install ${slug}`;
}

export function getSkillSlug(skill: Skill): string {
  return encodeURIComponent(skill.id.replace(/\//g, "__"));
}

export function getSkillBySlug(skills: Skill[], slug: string): Skill | undefined {
  const id = decodeURIComponent(slug).replace(/__/g, "/");
  return skills.find((s) => s.id === id);
}
