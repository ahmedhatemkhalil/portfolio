import mongoose from "mongoose";
import { seedProjectsIfEmpty } from "./seedProjects.js";

const globalForMongoose = globalThis;

/** @type {{ conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null; seeded: boolean }} */
const cache = globalForMongoose.__mongoose ?? {
  conn: null,
  promise: null,
  seeded: false,
};
globalForMongoose.__mongoose = cache;

function mongoUri() {
  return (
    process.env.MONGODB_URI?.trim() ||
    process.env.MONGO_URI?.trim() ||
    ""
  );
}

/**
 * Reuses the connection across hot reloads and serverless invocations.
 */
export async function connectDB() {
  const uri = mongoUri();
  if (!uri) {
    throw new Error("Missing MONGODB_URI or MONGO_URI");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri)
      .then((m) => m);
  }

  cache.conn = await cache.promise;

  if (!cache.seeded) {
    await seedProjectsIfEmpty();
    cache.seeded = true;
  }

  return cache.conn;
}
