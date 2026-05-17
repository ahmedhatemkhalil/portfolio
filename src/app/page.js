import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm dark:border-zinc-800/90 dark:bg-zinc-900/60 sm:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
          aria-hidden
        />
        <div className="relative max-w-2xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Next.js routing
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Welcome to my portfolio
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A compact demo of static and dynamic routes, nested segments, data
            fetching patterns, and auth — structured like a real product surface.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link className="btn" href="/portfolio">
              Explore projects
            </Link>
            <Link className="btn btn-secondary" href="/fake-api">
              Fake API lab
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Projects",
            desc: "Static params & detail routes.",
            href: "/portfolio",
          },
          {
            title: "Categories",
            desc: "Nested dynamic segments.",
            href: "/portfolio/categories",
          },
          {
            title: "Rendering",
            desc: "SSR, SSG, ISR & client data.",
            href: "/fake-api",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-indigo-900/60"
          >
            <h2 className="font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
              {item.desc}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Open
              <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
