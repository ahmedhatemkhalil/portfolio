import { connectDB } from "@/lib/server/db/connect";
import { requireUser } from "@/lib/server/authUser";
import { handleRouteError, jsonOk } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();
    const user = await requireUser(request);
    return jsonOk({ user });
  } catch (err) {
    return handleRouteError(err);
  }
}
