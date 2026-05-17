import { connectDB } from "@/lib/server/db/connect";
import { Project } from "@/lib/server/db/models/Project";
import { requireRole, requireUser } from "@/lib/server/authUser";
import { handleRouteError, jsonError, jsonOk } from "@/lib/server/http";
import { AppError } from "@/lib/server/AppError";

export const dynamic = "force-dynamic";

function isSafeProjectId(id) {
  return typeof id === "string" && id.length >= 1 && id.length <= 128 && /^[a-zA-Z0-9_-]+$/.test(id);
}

export async function GET(_request, context) {
  try {
    const { projectId } = await context.params;
    if (!isSafeProjectId(projectId)) {
      return jsonError(400, "Invalid project id");
    }

    await connectDB();
    const user = await requireUser(request);
    requireRole("user", user);

    const project = await Project.findOne({ projectId }).lean();
    if (!project) {
      throw new AppError(404, "Project not found");
    }

    return jsonOk({
      project: {
        id: project.projectId,
        title: project.title,
        category: project.category,
        description: project.description,
        details: project.details,
      },
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
