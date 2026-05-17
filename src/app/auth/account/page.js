"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authFetch, clearSession, getStoredToken } from "@/lib/authApi";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const json = await authFetch("/api/auth/me");
        if (!cancelled) setUser(json?.data?.user ?? null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load profile");
          clearSession();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-600 dark:border-zinc-700 dark:border-t-indigo-400"
            aria-hidden
          />
          <p className="mt-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Loading your session…
          </p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">{error || "Not signed in."}</p>
          <Link className="btn mt-6 inline-flex" href="/auth/login">
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Authenticated
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Your account
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Session from{" "}
          <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            GET /api/auth/me
          </code>
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
        <dl className="space-y-5">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Email
            </dt>
            <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Role
            </dt>
            <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              User id
            </dt>
            <dd className="mt-1 break-all font-mono text-xs text-zinc-700 dark:text-zinc-300">{user.id}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/portfolio"
            className="btn btn-secondary flex flex-1 items-center justify-center py-3 text-center"
          >
            View projects
          </Link>
          <Link
            href="/auth/login"
            className="flex flex-1 items-center justify-center rounded-xl bg-zinc-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Switch account
          </Link>
        </div>
      </div>
    </div>
  );
}
