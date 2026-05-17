import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "./routes/index.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

function corsOptions() {
  if (env.nodeEnv === "production") {
    const list = env.corsOrigin.length ? env.corsOrigin : false;
    return { origin: list, credentials: true };
  }

  // Development: allow localhost on any port; also allow explicit CORS_ORIGIN entries
  // (e.g. LAN IP) so Next on :3001 works even if CORS_ORIGIN only lists :3000.
  return {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (env.corsOrigin.length > 0 && env.corsOrigin.includes(origin)) {
        return callback(null, origin);
      }
      try {
        const u = new URL(origin);
        const local =
          u.hostname === "localhost" ||
          u.hostname === "127.0.0.1" ||
          u.hostname === "[::1]";
        const http = u.protocol === "http:" || u.protocol === "https:";
        if (local && http) return callback(null, origin);
      } catch {
        /* ignore */
      }
      return callback(null, false);
    },
    credentials: true,
  };
}

/**
 * Builds the Express application (no listen). Use this in tests or `bootstrap.start()`.
 */
export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors(corsOptions()));
  app.use(express.json({ limit: "100kb" }));
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/health", (req, res) => {
    res.json({ success: true, data: { status: "ok" } });
  });

  app.use("/api", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
