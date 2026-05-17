const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {unknown} body
 */
export function parseRegisterBody(body) {
  if (!body || typeof body !== "object") {
    return { error: "Invalid JSON body" };
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!EMAIL_RE.test(email)) {
    return { error: "Valid email is required" };
  }
  if (password.length < 8 || password.length > 128) {
    return { error: "Password must be 8–128 characters" };
  }
  return { email, password };
}

/**
 * @param {unknown} body
 */
export function parseLoginBody(body) {
  if (!body || typeof body !== "object") {
    return { error: "Invalid JSON body" };
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!EMAIL_RE.test(email)) {
    return { error: "Valid email is required" };
  }
  if (!password) {
    return { error: "Password is required" };
  }
  return { email, password };
}
