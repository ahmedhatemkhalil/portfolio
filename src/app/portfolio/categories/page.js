import Link from "next/link";

const categories = ["web", "ui", "app"];

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Browse
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Project categories
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Each category maps to a dynamic segment under{" "}
          <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            /portfolio/categories/[category]
          </code>
          .
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-3">
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={`/portfolio/categories/${category}`}
              className="flex items-center justify-between rounded-2xl border border-zinc-200/90 bg-white px-5 py-4 text-base font-semibold capitalize shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-indigo-900/50 dark:hover:bg-indigo-950/20"
            >
              {category}
              <span className="text-indigo-500 dark:text-indigo-400" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
