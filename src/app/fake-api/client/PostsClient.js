"use client";

import useSWR from "swr";
import { fetchPosts } from "@/lib/fakeApi";

export default function PostsClient() {
  const { data: posts, error, isLoading } = useSWR("posts", () => fetchPosts(8));
 console.log(posts);
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200/90 bg-zinc-50/80 px-4 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
        <span
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-600 dark:border-zinc-600 dark:border-t-indigo-400"
          aria-hidden
        />
        Loading posts…
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
        role="alert"
      >
        {error.message}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <p className="rounded-xl border border-zinc-200/90 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
        No posts to show.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200/90 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/50">
      {posts.map((post) => (
        <li key={post.id} className="p-4 transition hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80">
          <h3 className="font-semibold text-zinc-900 dark:text-white">{post.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
