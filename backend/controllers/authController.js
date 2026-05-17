import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { signAccessToken } from "../utils/jwt.js";

const SALT_ROUNDS = 12;

function toPublicUser(userDoc) {
  return {
    id: userDoc._id.toString(),
    email: userDoc.email,
    role: userDoc.role,
  };
}

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new AppError(409, "Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role: "user",
    });

    const token = signAccessToken({ sub: user._id.toString(), role: user.role });

    res.status(201).json({
      success: true,
      data: { user: toPublicUser(user), token },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+passwordHash",
    );
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new AppError(401, "Invalid email or password");
    }

    const token = signAccessToken({ sub: user._id.toString(), role: user.role });

    res.json({
      success: true,
      data: { user: toPublicUser(user), token },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Stateless JWT: client discards the token after this call.
 * (Add a token blocklist here if you need server-side invalidation.)
 */
export async function logout(req, res) {
  res.json({
    success: true,
    data: { message: "Logged out. Discard the token on the client." },
  });
}

export async function me(req, res) {
  res.json({ success: true, data: { user: req.user } });
}
