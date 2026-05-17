import { fetchPosts } from "@/lib/fakeApi";

export default async function ServerPosts({ limit = 8 }) {
  const posts = await fetchPosts(limit);

  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200/90 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/50">
      {posts.map((p) => (
        <li key={p.id} className="p-4 transition hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80">
          <p className="text-base font-semibold text-zinc-900 dark:text-white">{p.title}</p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {p.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
