import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-6 text-center">
      <div className="page-card space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Error 404
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Page not found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The URL may be mistyped, or the page was moved.
        </p>
        <Link className="btn inline-flex" href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
