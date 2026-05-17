import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

/**
 * Verifies JWT from `Authorization: Bearer <token>` and attaches req.user.
 */
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      throw new AppError(401, "Authentication required");
    }

    const decoded = verifyAccessToken(token);
    if (typeof decoded.sub !== "string") {
      throw new AppError(401, "Invalid token payload");
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      throw new AppError(401, "User no longer exists");
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    return next(new AppError(401, "Invalid or expired token"));
  }
}

/**
 * Role-based access control. Extend the `roles` array when you add new roles.
 * @param {...string} roles
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError(401, "Authentication required"));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "Insufficient permissions"));
    }
    next();
  };
}
