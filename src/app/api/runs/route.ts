import { getRuns } from "../lhci-server-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const project = searchParams.get("project");
  const build = searchParams.get("build");
  const url = searchParams.get("url");

  if (!host || !project || !build || !url) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getRuns({ host, project, build, url });

  return Response.json(runs);
}
