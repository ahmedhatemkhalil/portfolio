import Link from "next/link";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  const uniqueCategories = [...new Set(projects.map((project) => project.category))];
  return uniqueCategories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const filtered = projects.filter((project) => project.category === category);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Category
          </p>
          <h1 className="text-3xl font-bold capitalize tracking-tight text-zinc-900 dark:text-white">
            {category}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {filtered.length} project{filtered.length === 1 ? "" : "s"} in this group.
          </p>
        </div>
        <Link
          href="/portfolio/categories"
          className="text-sm font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
        >
          ← All categories
        </Link>
      </header>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
          No projects in this category.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((project) => (
            <li key={project.id}>
              <Link
                href={`/portfolio/${project.id}`}
                className="flex items-center justify-between rounded-2xl border border-zinc-200/90 bg-white px-5 py-4 shadow-sm transition hover:border-indigo-200 dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-indigo-900/50"
              >
                <span className="font-medium text-zinc-900 dark:text-white">
                  {project.title}
                </span>
                <span className="text-sm text-indigo-600 dark:text-indigo-400">Open →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
