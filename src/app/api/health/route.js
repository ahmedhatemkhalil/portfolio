import { jsonOk } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonOk({ status: "ok" });
}
