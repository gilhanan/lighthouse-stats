import { getProjects } from "../lhci-server-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");

  if (!host) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getProjects({ host });

  return Response.json(runs);
}
