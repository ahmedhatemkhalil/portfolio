import { Project } from "../models/Project.js";
import { AppError } from "../utils/AppError.js";

export async function listProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ title: 1 }).lean();
    res.json({
      success: true,
      data: {
        projects: projects.map((p) => ({
          id: p.projectId,
          title: p.title,
          category: p.category,
          description: p.description,
          details: p.details,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getProjectById(req, res, next) {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ projectId }).lean();
    if (!project) {
      throw new AppError(404, "Project not found");
    }
    res.json({
      success: true,
      data: {
        project: {
          id: project.projectId,
          title: project.title,
          category: project.category,
          description: project.description,
          details: project.details,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}
