const DEFAULT_API = "http://localhost:5000";
const API_PREFIX = "/api/";

export function getApiBaseUrl() {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
    DEFAULT_API
  ).replace(/\/$/, "");
}

/**
 * In the browser, call the Next.js BFF proxy (same origin) so requests are not
 * blocked by CORS or odd localhost/IPv6 mismatches. The proxy forwards to the Express API.
 */
function resolveRequestUrl(apiPath) {
  if (typeof window !== "undefined") {
    if (apiPath.startsWith(API_PREFIX)) {
      const rest = apiPath.slice(API_PREFIX.length);
      return { url: `${window.location.origin}/api/proxy/${rest}` };
    }
    return { url: apiPath };
  }
  return { url: `${getApiBaseUrl()}${apiPath}` };
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
      `Request failed (${reason}). If the API runs separately, ensure the Next dev server is up and try again.`,
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
