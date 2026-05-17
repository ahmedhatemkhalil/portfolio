"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  AuthErrorBanner,
  AuthField,
  AuthFormSkeleton,
  AuthScreen,
  AuthSubmitButton,
} from "@/components/auth/AuthScreen";
import { authFetch, safeNextPath, setSession } from "@/lib/authApi";

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthFormSkeleton />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const json = await authFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const token = json?.data?.token;
      const userEmail = json?.data?.user?.email;
      if (!token || !userEmail) throw new Error("Unexpected response from server");
      setSession(token, userEmail);
      const next = safeNextPath(
        new URLSearchParams(window.location.search).get("next") || "",
      );
      router.push(next || "/auth/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScreen
      eyebrow="Welcome back"
      title="Sign in to continue"
      description="Enter your portfolio credentials. New here? You can create an account in a few seconds."
      footer={
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No account yet?{" "}
          <Link
            href={
              searchParams.toString()
                ? `/auth/register?${searchParams.toString()}`
                : "/auth/register"
            }
            className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={(e) => void onSubmit(e)} className="space-y-6">
        {error ? <AuthErrorBanner>{error}</AuthErrorBanner> : null}

        <AuthField
          id="login-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <AuthField
          id="login-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <AuthSubmitButton loading={loading}>
          {loading ? "Signing you in…" : "Sign in"}
        </AuthSubmitButton>
      </form>
    </AuthScreen>
  );
}
