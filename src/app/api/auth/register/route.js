import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/server/db/connect";
import { User } from "@/lib/server/db/models/User";
import { signAccessToken } from "@/lib/server/jwt";
import { handleRouteError, jsonError, jsonOk } from "@/lib/server/http";
import { AppError } from "@/lib/server/AppError";
import { parseRegisterBody } from "@/lib/server/validateBody";

export const dynamic = "force-dynamic";

const SALT_ROUNDS = 12;

function toPublicUser(userDoc) {
  return {
    id: userDoc._id.toString(),
    email: userDoc.email,
    role: userDoc.role,
  };
}

export async function POST(request) {
  try {
    await connectDB();
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonError(400, "Invalid JSON body");
    }

    const parsed = parseRegisterBody(body);
    if ("error" in parsed) {
      return jsonError(400, parsed.error);
    }

    const { email, password } = parsed;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new AppError(409, "Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email,
      passwordHash,
      role: "user",
    });

    const token = signAccessToken({ sub: user._id.toString(), role: user.role });

    return jsonOk({ user: toPublicUser(user), token }, 201);
  } catch (err) {
    return handleRouteError(err);
  }
}
