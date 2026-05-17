"use client";

export function AuthFormSkeleton() {
  return (
    <div
      className="auth-screen-enter mx-auto w-full max-w-md rounded-2xl border border-zinc-200/90 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70"
      aria-busy
      aria-label="Loading"
    >
      <div className="mx-auto mb-5 h-5 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
      <div className="mx-auto mb-2 h-8 w-48 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
      <div className="mx-auto mb-8 h-4 w-full max-w-[16rem] animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-12 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-4 h-12 animate-pulse rounded-xl bg-indigo-100 dark:bg-indigo-950/50" />
      </div>
    </div>
  );
}

export function AuthScreen({ eyebrow, title, description, children, footer }) {
  return (
    <div className="auth-screen-enter w-full max-w-md">
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-lg shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/40 sm:p-9">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.65rem] dark:text-white">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>

        <div className="mt-8">{children}</div>

        <div className="mt-8 border-t border-zinc-100 pt-6 text-center dark:border-zinc-800">
          {footer}
        </div>
      </div>
    </div>
  );
}

export function AuthField({ id, label, hint, className = "", ...inputProps }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
        >
          {label}
        </label>
        {hint ? (
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {hint}
          </span>
        ) : null}
      </div>
      <input
        id={id}
        {...inputProps}
        className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[15px] text-zinc-900 outline-none ring-indigo-500/0 transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 ${className}`}
      />
    </div>
  );
}

export function AuthSubmitButton({ loading, children, className = "", ...btnProps }) {
  return (
    <button
      type="submit"
      disabled={loading}
      {...btnProps}
      className={`flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-4 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 ${className}`}
    >
      {loading ? (
        <span
          className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}

export function AuthErrorBanner({ children }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-100"
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
        aria-hidden
      >
        !
      </span>
      <span>{children}</span>
    </div>
  );
}
