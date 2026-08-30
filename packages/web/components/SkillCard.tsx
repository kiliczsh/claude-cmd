import Link from "next/link";
import type { Skill } from "@/lib/skills";
import { getInstallCommand, getSkillSlug } from "@/lib/skills";
import { CopyButton } from "./CopyButton";

export function SkillCard({ skill }: { skill: Skill }) {
  const installCmd = getInstallCommand(skill);
  const slug = getSkillSlug(skill);
  const primaryTag = skill.tags[0];

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-violet-500">
      <div className="mb-3 flex items-start justify-between gap-2">
        <Link
          href={`/skills/${slug}`}
          className="text-base font-semibold text-gray-900 hover:text-violet-600 dark:text-white dark:hover:text-violet-400"
        >
          {skill.name}
        </Link>
        {primaryTag && (
          <span className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            {primaryTag}
          </span>
        )}
      </div>

      <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {skill.description}
      </p>

      <div className="mt-auto">
        {skill.author && (
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-500">
            by{" "}
            <a
              href={`https://github.com/${skill.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 dark:hover:text-violet-400"
            >
              @{skill.author}
            </a>
          </p>
        )}
        <div className="flex items-center gap-2">
          <code className="flex-1 truncate rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {installCmd}
          </code>
          <CopyButton text={installCmd} label="Copy" />
        </div>
      </div>
    </div>
  );
}
