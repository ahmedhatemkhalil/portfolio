import jwt from "jsonwebtoken";

function secret() {
  const s = process.env.JWT_SECRET?.trim();
  if (!s) throw new Error("Missing JWT_SECRET");
  return s;
}

export function signAccessToken(payload) {
  return jwt.sign(payload, secret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    issuer: "my-app-backend",
    audience: "my-app-clients",
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, secret(), {
    issuer: "my-app-backend",
    audience: "my-app-clients",
  });
}
