import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSkills, getSkillBySlug, getInstallCommand } from "@/lib/skills";
import { CopyButton } from "@/components/CopyButton";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const skills = await getSkills();
  return skills.map((skill) => ({
    name: encodeURIComponent(skill.id.replace(/\//g, "__")),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const skills = await getSkills();
  const skill = getSkillBySlug(skills, name);
  if (!skill) return {};
  const installCmd = getInstallCommand(skill);
  return {
    title: `Install ${skill.name} for Claude Code`,
    description: `${skill.description}. Install with: ${installCmd}`,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { name } = await params;
  const skills = await getSkills();
  const skill = getSkillBySlug(skills, name);
  if (!skill) notFound();

  const installCmd = getInstallCommand(skill);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/skills" className="hover:text-violet-600 dark:hover:text-violet-400">
          Skills
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white">{skill.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start gap-3">
        <h1 className="flex-1 text-3xl font-bold text-gray-900 dark:text-white">{skill.name}</h1>
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">{skill.description}</p>

      {/* Install section */}
      <div className="mb-8 rounded-xl border-2 border-violet-200 bg-violet-50 p-6 dark:border-violet-800 dark:bg-violet-900/10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-400">
          Install
        </h2>
        <div className="flex items-center gap-3">
          <code className="flex-1 rounded-lg bg-gray-900 px-4 py-3 font-mono text-green-400">
            {installCmd}
          </code>
          <CopyButton text={installCmd} label="Copy" />
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Author */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Author</h3>
          {skill.author ? (
            <a
              href={`https://github.com/${skill.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-violet-600 hover:underline dark:text-violet-400"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              @{skill.author}
            </a>
          ) : (
            <span className="text-gray-500">Unknown</span>
          )}
        </div>

        {/* Metadata */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Details</h3>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">ID</dt>
              <dd className="font-mono text-gray-700 dark:text-gray-300">{skill.id.split("/").pop()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Updated</dt>
              <dd className="text-gray-700 dark:text-gray-300">
                {new Date(skill.updated_at).toLocaleDateString()}
              </dd>
            </div>
            {skill.frontmatter.model && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Model</dt>
                <dd className="text-gray-700 dark:text-gray-300">{skill.frontmatter.model}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Allowed tools */}
      {skill.frontmatter["allowed-tools"] && (
        <div className="mt-6 rounded-xl border border-gray-200 p-5 dark:border-gray-700">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Allowed Tools</h3>
          <div className="flex flex-wrap gap-1.5">
            {skill.frontmatter["allowed-tools"].split(",").map((tool) => (
              <span
                key={tool.trim()}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tool.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Source link */}
      <div className="mt-8 text-center">
        <a
          href={`https://github.com/kiliczsh/claude-cmd/blob/main/commands/${skill.filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View source on GitHub
        </a>
      </div>
    </div>
  );
}
