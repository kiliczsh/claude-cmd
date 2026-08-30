import type { Metadata } from "next";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Stats",
  description: "Claude Code Skills ecosystem stats — top categories, recent additions, and ecosystem health.",
};

export default async function StatsPage() {
  const skills = await getSkills();

  // Category counts
  const categoryCounts: Record<string, number> = {};
  for (const skill of skills) {
    for (const tag of skill.tags) {
      categoryCounts[tag] = (categoryCounts[tag] ?? 0) + 1;
    }
  }
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  // Author counts
  const authorCounts: Record<string, number> = {};
  for (const skill of skills) {
    if (skill.author) {
      authorCounts[skill.author] = (authorCounts[skill.author] ?? 0) + 1;
    }
  }
  const topAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Recently added (sorted by created_at desc)
  const recentSkills = [...skills]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  const totalAuthors = Object.keys(authorCounts).length;
  const totalCategories = Object.keys(categoryCounts).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          State of Claude Code Skills
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ecosystem stats for the claude-cmd community registry.
        </p>
      </div>

      {/* Summary stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Skills", value: skills.length },
          { label: "Categories", value: totalCategories },
          { label: "Authors", value: totalAuthors },
          { label: "Open Source", value: "100%" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="text-3xl font-bold text-violet-600">{value}</div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top Categories */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Top Categories
          </h2>
          <div className="space-y-3">
            {topCategories.map(([tag, count], i) => (
              <div key={tag} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs text-gray-400">{i + 1}</span>
                <div className="flex flex-1 items-center gap-2">
                  <div
                    className="h-2 rounded-full bg-violet-500"
                    style={{
                      width: `${Math.round((count / topCategories[0][1]) * 100)}%`,
                      minWidth: "4px",
                    }}
                  />
                </div>
                <span className="w-20 text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                <span className="w-8 text-right text-sm font-medium text-gray-900 dark:text-white">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Authors */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Top Contributors
          </h2>
          <div className="space-y-2">
            {topAuthors.map(([author, count], i) => (
              <div key={author} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs text-gray-400">{i + 1}</span>
                <a
                  href={`https://github.com/${author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
                >
                  @{author}
                </a>
                <span className="text-sm text-gray-500">
                  {count} skill{count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Recently Added
          </h2>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentSkills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  {skill.tags[0] && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      {skill.tags[0]}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(skill.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
