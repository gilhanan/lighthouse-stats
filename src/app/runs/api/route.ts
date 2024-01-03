import { RawRun, Run } from "../models";

function parseRun(rawRun: RawRun): Run {
  return {
    ...rawRun,
    lhr: JSON.parse(rawRun.lhr),
  };
}

async function getRuns({
  host,
  project,
  build,
}: {
  host: string;
  project: string;
  build: string;
}): Promise<Run[]> {
  const url = `https://${host}/v1/projects/${project}/builds/${build}/Runs`;
  const response = await fetch(url);
  const rawRuns = (await response.json()) as RawRun[];
  const runs = rawRuns.map(parseRun);
  return runs;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const project = searchParams.get("project");
  const build = searchParams.get("build");

  if (!host || !project || !build) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getRuns({ host, project, build });

  return Response.json(runs);
}
