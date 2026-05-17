import http from "http";
import { createApp } from "./app.js";
import { validateEnv, env } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { seedProjectsIfEmpty } from "./utils/seedProjects.js";

/**
 * Wires persistence, seeds data, binds HTTP, and registers graceful shutdown.
 */
export async function start() {
  validateEnv();
  await connectDB();

  const seedResult = await seedProjectsIfEmpty();
  if (seedResult.seeded) {
    console.log(`Seeded ${seedResult.inserted} project(s) from projects.js`);
  }

  const app = createApp();
  const server = http.createServer(app);

  await new Promise((resolve, reject) => {
    const onError = (err) => {
      server.off("listening", onListening);
      reject(err);
    };
    const onListening = () => {
      server.off("error", onError);
      console.log(`API listening on http://localhost:${env.port}`);
      resolve();
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(env.port);
  });

  let shuttingDown = false;
  const shutdown = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`${signal} received, closing HTTP server…`);

    await new Promise((resolve) => {
      server.close(() => resolve());
    });

    await disconnectDB();
    console.log("Shutdown complete.");
    process.exit(0);
  };

  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  process.once("SIGINT", () => void shutdown("SIGINT"));

  return { server, app };
}
