import { NextResponse } from "next/server";

function backendBase() {
  return (
    process.env.BACKEND_URL ||
    process.env.INTERNAL_API_URL ||
    "http://127.0.0.1:5000"
  ).replace(/\/$/, "");
}

function isSafeSegment(s) {
  return typeof s === "string" && /^[a-zA-Z0-9_-]+$/.test(s);
}

async function proxy(request, context) {
  const params = await context.params;
  const raw = params.segments;
  const segments = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
  if (!segments.length || !segments.every(isSafeSegment)) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid or missing API path" } },
      { status: 400 },
    );
  }

  const base = backendBase();
  const targetPath = `/api/${segments.join("/")}`;
  const incoming = new URL(request.url);
  const targetUrl = `${base}${targetPath}${incoming.search}`;

  const headers = new Headers();
  for (const [key, value] of request.headers.entries()) {
    const k = key.toLowerCase();
    if (
      ["host", "connection", "content-length", "transfer-encoding", "keep-alive"].includes(
        k,
      )
    ) {
      continue;
    }
    headers.set(key, value);
  }

  /** @type {RequestInit} */
  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    const buf = await request.arrayBuffer();
    if (buf.byteLength) init.body = buf;
  }

  let upstream;
  try {
    upstream = await fetch(targetUrl, init);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: `Backend not reachable at ${base}. In another terminal run: npm run backend:dev`,
        },
      },
      { status: 502 },
    );
  }

  const out = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === "transfer-encoding") return;
    out.headers.set(key, value);
  });
  return out;
}

export async function GET(request, context) {
  return proxy(request, context);
}

export async function POST(request, context) {
  return proxy(request, context);
}

export async function PUT(request, context) {
  return proxy(request, context);
}

export async function PATCH(request, context) {
  return proxy(request, context);
}

export async function DELETE(request, context) {
  return proxy(request, context);
}

export async function HEAD(request, context) {
  return proxy(request, context);
}
