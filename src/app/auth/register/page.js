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

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthFormSkeleton />}>
      <RegisterPageContent />
    </Suspense>
  );
}

function RegisterPageContent() {
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
      const json = await authFetch("/api/auth/register", {
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
      eyebrow="Get started"
      title="Create your account"
      description="Use at least 8 characters for your password. You will be signed in automatically after registration."
      footer={
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href={
              searchParams.toString()
                ? `/auth/login?${searchParams.toString()}`
                : "/auth/login"
            }
            className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={(e) => void onSubmit(e)} className="space-y-6">
        {error ? <AuthErrorBanner>{error}</AuthErrorBanner> : null}

        <AuthField
          id="register-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />

        <AuthField
          id="register-password"
          label="Password"
          hint="Min. 8 chars"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a strong password"
        />

        <AuthSubmitButton loading={loading}>
          {loading ? "Creating your workspace…" : "Create account"}
        </AuthSubmitButton>
      </form>
    </AuthScreen>
  );
}
