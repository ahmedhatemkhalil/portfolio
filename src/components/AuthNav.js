"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authFetch, clearSession, getStoredEmail, getStoredToken } from "@/lib/authApi";

export function AuthNav() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = getStoredToken();
    const stored = getStoredEmail();
    if (token && stored) setEmail(stored);
    setReady(true);
  }, []);

  async function logout() {
    try {
      await authFetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* still clear client session */
    }
    clearSession();
    setEmail(null);
    router.refresh();
    router.push("/");
  }

  if (!ready) {
    return (
      <span className="inline-block h-8 w-24 animate-pulse rounded-lg bg-zinc-200/90 dark:bg-zinc-800" />
    );
  }

  if (email) {
    return (
      <div className="flex flex-wrap items-center gap-2 sm:gap-2">
        <Link
          href="/auth/account"
          className="max-w-[160px] truncate rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          title={email}
        >
          {email}
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/auth/login"
        className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
      >
        Log in
      </Link>
      <Link
        href="/auth/register"
        className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      >
        Register
      </Link>
    </div>
  );
}
