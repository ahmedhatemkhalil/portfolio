import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

/**
 * Runs express-validator checks and forwards the first error as 400.
 */
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const first = errors.array({ onlyFirstError: true })[0];
    return next(new AppError(400, first.msg || "Validation failed"));
  }
  next();
}
