import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default async function ProjectDetailsPage({ params }) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            ← All projects
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
              {project.category}
            </span>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
              id: {project.id}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="page-card max-w-3xl space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Details
        </h2>
        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {project.details}
        </p>
      </div>
    </article>
  );
}
