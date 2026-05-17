/**
 * Central place for required environment variables.
 * Fails fast at startup if configuration is invalid.
 */
function resolveMongoUri() {
  return (
    process.env.MONGODB_URI?.trim() ||
    process.env.MONGO_URI?.trim() ||
    ""
  );
}

export function validateEnv() {
  const missing = [];
  if (!resolveMongoUri()) {
    missing.push("MONGODB_URI or MONGO_URI");
  }
  if (!process.env.JWT_SECRET?.trim()) {
    missing.push("JWT_SECRET");
  }
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. Copy env.example to backend/.env and fill values.`,
    );
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  get mongodbUri() {
    return resolveMongoUri();
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  corsOrigin:
    process.env.CORS_ORIGIN?.split(",").map((s) => s.trim()).filter(Boolean) ||
    [],
};
