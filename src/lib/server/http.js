import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AppError } from "./AppError.js";

export function jsonOk(data, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(status, message) {
  return NextResponse.json({ success: false, error: { message } }, { status });
}

/**
 * @param {unknown} err
 * @returns {NextResponse}
 */
export function handleRouteError(err) {
  if (err instanceof mongoose.Error.CastError) {
    return jsonError(400, "Invalid identifier format");
  }

  if (typeof err === "object" && err !== null && "code" in err && /** @type {{ code?: number }} */ (err).code === 11000) {
    const keyPattern =
      typeof err === "object" && err !== null && "keyPattern" in err
        ? /** @type {{ keyPattern?: Record<string, unknown> }} */ (err).keyPattern
        : undefined;
    const field = keyPattern ? Object.keys(keyPattern)[0] || "field" : "field";
    return jsonError(409, `Duplicate value for ${field}`);
  }

  if (err instanceof AppError) {
    return jsonError(err.statusCode, err.message);
  }

  const isProd = process.env.NODE_ENV === "production";
  const message = isProd ? "Internal server error" : String(/** @type {Error} */ (err)?.message || err);
  console.error(err);
  return jsonError(500, message);
}
