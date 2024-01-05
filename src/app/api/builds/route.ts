import { Build, RawBuild } from "../../runs/models";

function parseBuild(rawBuild: RawBuild): Build {
  return {
    ...rawBuild,
    name: `${rawBuild.branch} - ${rawBuild.commitMessage}`,
  };
}

async function getBuilds({
  host,
  project,
}: {
  host: string;
  project: string;
}): Promise<Build[]> {
  const url = `https://${host}/v1/projects/${project}/builds`;
  const response = await fetch(url);
  const rawBuilds = (await response.json()) as RawBuild[];
  const builds = rawBuilds.map(parseBuild);

  return builds;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const project = searchParams.get("project");

  if (!host || !project) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getBuilds({ host, project });

  return Response.json(runs);
}
