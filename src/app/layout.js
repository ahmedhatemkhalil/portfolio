import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AuthNav } from "@/components/AuthNav";
import { RequireAuth } from "@/components/RequireAuth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Simple Portfolio",
  description: "Next.js routing practice project",
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Projects" },
  { href: "/portfolio/categories", label: "Categories" },
  { href: "/fake-api", label: "Fake API" },
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85">
          <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
            <Link
              href="/"
              className="text-base font-bold tracking-tight text-zinc-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
            >
              My Portfolio
            </Link>
            <div className="flex flex-wrap items-center gap-1 sm:gap-1">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
                >
                  {label}
                </Link>
              ))}
              <span className="mx-1 hidden h-6 w-px bg-zinc-200 sm:inline dark:bg-zinc-700" aria-hidden />
              <AuthNav />
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <RequireAuth>{children}</RequireAuth>
        </main>
      </body>
    </html>
  );
}
