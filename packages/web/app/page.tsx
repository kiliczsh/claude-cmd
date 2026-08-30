import Link from "next/link";
import { getSkills } from "@/lib/skills";
import { SkillCard } from "@/components/SkillCard";

export default async function HomePage() {
  const skills = await getSkills();
  const totalSkills = skills.length;
  const categories = Array.from(new Set(skills.flatMap((s) => s.tags))).length;
  const featuredSkills = skills.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Claude CMD
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            The package manager for the Claude Code ecosystem.
            <br />
            Discover, install, and manage skills in seconds.
          </p>

          <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <code className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-mono text-green-400 dark:bg-gray-800">
              npm install -g claude-cmd
            </code>
            <Link
              href="/skills"
              className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Browse {totalSkills}+ Skills →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x divide-gray-200 rounded-xl border border-gray-200 bg-gray-50 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-bold text-violet-600">{totalSkills}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Skills</div>
            </div>
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-bold text-violet-600">{categories}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Categories</div>
            </div>
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-bold text-violet-600">1-click</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Install</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Skills</h2>
          <Link
            href="/skills"
            className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Get Started in Seconds
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Install", cmd: "npm install -g claude-cmd" },
              { step: "2", title: "Browse", cmd: "claude-cmd" },
              { step: "3", title: "Install a skill", cmd: "claude-cmd install git-commit" },
            ].map(({ step, title, cmd }) => (
              <div key={step} className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                <div className="mb-2 text-sm font-semibold text-violet-600">Step {step}</div>
                <div className="mb-3 font-semibold text-gray-900 dark:text-white">{title}</div>
                <code className="block rounded bg-gray-100 px-3 py-2 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {cmd}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
