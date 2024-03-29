import { getBuilds } from "../lhci-server-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const project = searchParams.get("project");
  const branch = searchParams.get("branch");

  if (!host || !project || !branch) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getBuilds({ host, project, branch });

  return Response.json(runs);
}
