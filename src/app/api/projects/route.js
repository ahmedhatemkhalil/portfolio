import { connectDB } from "@/lib/server/db/connect";
import { Project } from "@/lib/server/db/models/Project";
import { requireRole, requireUser } from "@/lib/server/authUser";
import { handleRouteError, jsonOk } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(_request) {
  try {
    await connectDB();
    const user = await requireUser(request);
    requireRole("user", user);

    const projects = await Project.find().sort({ title: 1 }).lean();
    return jsonOk({
      projects: projects.map((p) => ({
        id: p.projectId,
        title: p.title,
        category: p.category,
        description: p.description,
        details: p.details,
      })),
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
