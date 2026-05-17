import { Router } from "express";
import { param } from "express-validator";
import * as projectController from "../controllers/projectController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { handleValidationErrors } from "../middleware/validate.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

const projectIdParam = [
  param("projectId")
    .isString()
    .trim()
    .isLength({ min: 1, max: 128 })
    .withMessage("Invalid project id"),
];

/**
 * Protected routes: JWT + role `user`.
 * Remove `requireAuth` / `requireRole` here if you want public read access.
 */
router.get(
  "/",
  requireAuth,
  requireRole("user"),
  asyncHandler(projectController.listProjects),
);

router.get(
  "/:projectId",
  requireAuth,
  requireRole("user"),
  projectIdParam,
  handleValidationErrors,
  asyncHandler(projectController.getProjectById),
);

export default router;
