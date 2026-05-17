import { connectDB } from "@/lib/server/db/connect";
import { requireUser } from "@/lib/server/authUser";
import { handleRouteError, jsonOk } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDB();
    await requireUser(request);
    return jsonOk({
      message: "Logged out. Discard the token on the client.",
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
