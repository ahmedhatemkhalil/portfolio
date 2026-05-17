import mongoose from "mongoose";
import { env } from "./env.js";
import dns from 'dns';

// Force Node.js to use Google and Cloudflare DNS servers for reliable SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  console.warn('[Database DNS] Failed to set explicit DNS servers:', err.message);
}
/**
 * Connects to MongoDB Atlas (or any MongoDB deployment) using MONGODB_URI.
 */
export async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(env.mongodbUri, {
      autoIndex: env.nodeEnv !== "production",
      serverSelectionTimeoutMS: 15_000,
    });
  } catch (err) {
    if (err?.code === "ECONNREFUSED" && err?.syscall === "querySrv") {
      console.error(`
┌─ MongoDB Atlas DNS (SRV) failed ─────────────────────────────────────────┐
│ Your PC could not resolve the mongodb+srv:// hostname.                    │
│                                                                           │
│ Try one of these:                                                        │
│ 1) Atlas → Connect → Drivers → use "Standard connection string"         │
│    (mongodb://host1,host2/...) instead of mongodb+srv://                 │
│ 2) Windows: Settings → Network → DNS → use 8.8.8.8 or 1.1.1.1            │
│ 3) Turn VPN off, or run: ipconfig /flushdns                               │
│ 4) Atlas → Network Access → allow your IP (or 0.0.0.0/0 for dev only)    │
└──────────────────────────────────────────────────────────────────────────┘
`);
    }

    const authFailed =
      err?.code === 8000 ||
      err?.code === 18 ||
      String(err?.message || "").toLowerCase().includes("bad auth") ||
      String(err?.message || "").toLowerCase().includes("authentication failed");

    if (authFailed) {
      console.error(`
┌─ MongoDB authentication failed ───────────────────────────────────────────┐
│ Atlas rejected the username or password in your MONGO_URI / MONGODB_URI.  │
│                                                                           │
│ Fix it in Atlas (not in this codebase):                                  │
│ 1) Atlas → Database Access → open your DB user → Edit → reset password  │
│ 2) Atlas → Connect → Drivers → copy a NEW connection string (replace    │
│    <password> with the new password).                                     │
│ 3) If the password has @ : / ? # % use URL-encoding in the URI.         │
│ 4) The name before the first ":" must be the Database user name,         │
│    not your Atlas login email.                                            │
│ 5) Put the final URI in the repo root .env as MONGO_URI (or MONGODB_URI). │
└──────────────────────────────────────────────────────────────────────────┘
`);
    }
    throw err;
  }

  if (env.nodeEnv !== "test") {
    console.log("MongoDB connected");
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
