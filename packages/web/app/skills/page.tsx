import type { Metadata } from "next";
import { getSkills } from "@/lib/skills";
import { SkillsGrid } from "@/components/SkillsGrid";

export const metadata: Metadata = {
  title: "Skills Catalog",
  description:
    "Browse 180+ Claude Code skills. Search and filter by category, then install with one command.",
};

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Skills Catalog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {skills.length} community skills — install any with{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
            claude-cmd install &lt;name&gt;
          </code>
        </p>
      </div>
      <SkillsGrid skills={skills} />
    </div>
  );
}
