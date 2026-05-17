"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { getStoredToken, safeNextPath } from "@/lib/authApi";

function isPublicPath(pathname) {
  if (pathname === "/auth") return true;
  if (pathname.startsWith("/auth/login")) return true;
  if (pathname.startsWith("/auth/register")) return true;
  return false;
}

function isLoginOrRegister(pathname) {
  return (
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")
  );
}

export function RequireAuth({ children }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const publicRoute = isPublicPath(pathname);
  const [allowed, setAllowed] = useState(publicRoute);

  useLayoutEffect(() => {
    const path = pathname || "/";
    const token = getStoredToken();

    if (isPublicPath(path)) {
      if (token && isLoginOrRegister(path)) {
        setAllowed(false);
        let next = null;
        try {
          next = safeNextPath(
            new URLSearchParams(window.location.search).get("next") || "",
          );
        } catch {
          /* ignore */
        }
        router.replace(next || "/");
        return;
      }
      setAllowed(true);
      return;
    }

    if (token) {
      setAllowed(true);
      return;
    }

    const q =
      path && path !== "/auth/login"
        ? `?next=${encodeURIComponent(path)}`
        : "";
    router.replace(`/auth/login${q}`);
  }, [pathname, router]);

  if (!allowed) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <span
          className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-indigo-600 dark:border-zinc-700 dark:border-t-indigo-400"
          aria-hidden
        />
        <span className="font-medium">Checking authentication…</span>
      </div>
    );
  }

  return children;
}
