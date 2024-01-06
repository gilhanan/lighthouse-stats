import { getURLs } from "../lhci-server-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const project = searchParams.get("project");
  const build = searchParams.get("build");

  if (!host || !project || !build) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getURLs({ host, project, build });

  return Response.json(runs);
}
