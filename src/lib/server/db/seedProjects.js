import { projects } from "@/data/projects";
import { Project } from "./models/Project.js";

/**
 * If the projects collection is empty, inserts rows from @/data/projects.
 */
export async function seedProjectsIfEmpty() {
  const count = await Project.countDocuments();
  if (count > 0) return { seeded: false, inserted: 0 };

  const docs = projects.map((p) => ({
    projectId: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    details: p.details,
  }));

  if (docs.length === 0) return { seeded: false, inserted: 0 };

  await Project.insertMany(docs, { ordered: true });
  return { seeded: true, inserted: docs.length };
}
