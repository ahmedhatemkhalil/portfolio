import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccessToken(payload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
    issuer: "my-app-backend",
    audience: "my-app-clients",
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtSecret, {
    issuer: "my-app-backend",
    audience: "my-app-clients",
  });
}
