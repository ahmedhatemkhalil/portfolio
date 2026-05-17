import Link from "next/link";

export function FakeStrategySection({ badge, children }) {
  return (
    <section className="page-card space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
          {badge}
        </span>
        <Link
          href="/fake-api"
          className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          ← All strategies
        </Link>
      </div>
      {children}
    </section>
  );
}
