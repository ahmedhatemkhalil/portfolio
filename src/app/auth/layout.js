export default function AuthLayout({ children }) {
  return (
    <div className="relative -mx-4 flex min-h-[calc(100vh-8.5rem)] flex-col items-center justify-center px-4 py-10 sm:mx-0 sm:min-h-[calc(100vh-9rem)] sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(99,102,241,0.14),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[120%] max-w-4xl -translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/10" />
      </div>
      <div className="relative z-0 w-full max-w-lg px-1">{children}</div>
    </div>
  );
}
