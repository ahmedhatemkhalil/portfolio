import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/server/db/connect";
import { User } from "@/lib/server/db/models/User";
import { signAccessToken } from "@/lib/server/jwt";
import { handleRouteError, jsonError, jsonOk } from "@/lib/server/http";
import { AppError } from "@/lib/server/AppError";
import { parseLoginBody } from "@/lib/server/validateBody";

export const dynamic = "force-dynamic";

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

    const parsed = parseLoginBody(body);
    if ("error" in parsed) {
      return jsonError(400, parsed.error);
    }

    const { email, password } = parsed;

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new AppError(401, "Invalid email or password");
    }

    const token = signAccessToken({ sub: user._id.toString(), role: user.role });

    return jsonOk({ user: toPublicUser(user), token });
  } catch (err) {
    return handleRouteError(err);
  }
}
