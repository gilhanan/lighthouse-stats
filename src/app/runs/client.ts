import { BuildParams } from "./models";

export async function getRuns({ host, project, buildId }: BuildParams) {
  const params = new URLSearchParams({ host, project, build: buildId });
  const url = `/runs/api?${params}`;

  const response = await fetch(url);

  const runs = await response.json();

  return runs;
}
