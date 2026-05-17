/** Same-origin `/api/*` Route Handlers (no separate Express server in production). */
function serverOrigin() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (site) return site;
  return "http://localhost:3000";
}

function resolveRequestUrl(apiPath) {
  const path = apiPath.startsWith("/") ? apiPath : `/${apiPath}`;
  if (typeof window !== "undefined") {
    return { url: `${window.location.origin}${path}` };
  }
  return { url: `${serverOrigin()}${path}` };
}

const TOKEN_KEY = "auth_token";
const EMAIL_KEY = "auth_email";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setSession(token, email) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getStoredEmail() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(EMAIL_KEY);
}

/** Same-origin path only; blocks protocol-relative and auth-form loops. */
export function safeNextPath(next) {
  if (!next || typeof next !== "string") return null;
  const t = next.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return null;
  if (t.includes("://")) return null;
  if (t.startsWith("/auth/login") || t.startsWith("/auth/register")) return null;
  return t;
}

/**
 * @param {string} path e.g. "/api/auth/login"
 * @param {RequestInit} [init]
 */
export async function authFetch(path, init = {}) {
  const { url } = resolveRequestUrl(path);
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getStoredToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res;
  try {
    res = await fetch(url, { ...init, headers });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Request failed (${reason}). Ensure the Next.js app is running and try again.`,
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data?.error?.message || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}
