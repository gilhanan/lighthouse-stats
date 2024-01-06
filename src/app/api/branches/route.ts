import { getBranches } from "../lhci-server-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const project = searchParams.get("project");

  if (!host || !project) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getBranches({ host, project });

  return Response.json(runs);
}
