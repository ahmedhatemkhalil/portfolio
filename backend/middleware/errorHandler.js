import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

/**
 * Global error handler. Keeps stack traces server-side only.
 */
export function errorHandler(err, req, res, _next) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid identifier format" },
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({
      success: false,
      error: { message: `Duplicate value for ${field}` },
    });
  }

  const statusCode = err.statusCode && err.isOperational ? err.statusCode : 500;
  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Something went wrong";

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: { message },
  });
}

/**
 * Handles unknown routes with 404 JSON instead of HTML.
 */
export function notFoundHandler(req, res, next) {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}
