/**
 * Single source of truth: re-exports the same projects used by the Next.js app.
 * Seed logic imports from here so MongoDB stays in sync with src/data/projects.js.
 */
export { projects, getProjectById } from "../../src/data/projects.js";
