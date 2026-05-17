import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Portfolio projects
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Select a project to open its dynamic route and metadata.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={`/portfolio/${project.id}`}
              className="flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-indigo-900/50"
            >
              <span className="inline-flex w-fit rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {project.category}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                {project.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                View details →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
