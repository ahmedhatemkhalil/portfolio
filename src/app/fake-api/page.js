import Link from "next/link";

const links = [
  {
    href: "/fake-api/ssr",
    label: "SSR",
    hint: "Server fetch, no-store — fresh on every request.",
    tone: "from-sky-500 to-blue-600",
  },
  {
    href: "/fake-api/ssg",
    label: "SSG",
    hint: "Cached at build — stable until rebuild.",
    tone: "from-emerald-500 to-teal-600",
  },
  {
    href: "/fake-api/isr",
    label: "ISR",
    hint: "Revalidate window — static between refreshes.",
    tone: "from-amber-500 to-orange-600",
  },
  {
    href: "/fake-api/client",
    label: "Client",
    hint: "SWR in the browser — focus, retry, and cache.",
    tone: "from-violet-500 to-purple-600",
  },
];

export default function FakeApiHubPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Data fetching
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Rendering strategies
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Compare how the same JSON placeholder feed is loaded with different
          Next.js caching models.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {links.map(({ href, label, hint, tone }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
            >
              <div
                className={`h-1.5 w-full bg-linear-to-r ${tone} opacity-90 transition group-hover:opacity-100`}
                aria-hidden
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  {label}
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {hint}
                </p>
                <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Open example →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
