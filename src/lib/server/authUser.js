import { AppError } from "./AppError.js";
import { verifyAccessToken } from "./jwt.js";
import { User } from "./db/models/User.js";

/**
 * @param {Request} request
 * @returns {Promise<{ id: string; email: string; role: string }>}
 */
export async function requireUser(request) {
  const header = request.headers.get("authorization") || "";
  const [scheme, token] = header.split(/\s+/);
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    throw new AppError(401, "Authentication required");
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }

  if (typeof decoded.sub !== "string") {
    throw new AppError(401, "Invalid token payload");
  }

  const user = await User.findById(decoded.sub).lean();
  if (!user) {
    throw new AppError(401, "User no longer exists");
  }

  return {
    id: String(user._id),
    email: user.email,
    role: user.role,
  };
}

/**
 * @param {string} role
 * @param {{ id: string; email: string; role: string }} user
 */
export function requireRole(role, user) {
  if (user.role !== role) {
    throw new AppError(403, "Insufficient permissions");
  }
}
