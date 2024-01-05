import { Project } from "@/app/runs/models";

async function getProjects({ host }: { host: string }): Promise<Project[]> {
  const url = `https://${host}/v1/projects`;
  const response = await fetch(url);
  const projects = (await response.json()) as Project[];
  return projects;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");

  if (!host) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const runs = await getProjects({ host });

  return Response.json(runs);
}
