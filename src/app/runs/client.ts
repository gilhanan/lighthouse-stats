import {
  Branch,
  BranchParams,
  Build,
  BuildParams,
  HostParams,
  Project,
  ProjectParams,
  Run,
  RunsParams,
  URL,
} from "./models";

export async function getProjects({ host }: HostParams): Promise<Project[]> {
  const params = new URLSearchParams({ host });
  const endpoint = `/api/projects?${params}`;
  const response = await fetch(endpoint);

  return response.json();
}

export async function getURLs({
  host,
  project,
  build,
}: BuildParams): Promise<URL[]> {
  const params = new URLSearchParams({ host, project, build });
  const endpoint = `/api/urls?${params}`;
  const response = await fetch(endpoint);

  return response.json();
}

export async function getBranches({
  host,
  project,
}: ProjectParams): Promise<Branch[]> {
  const params = new URLSearchParams({ host, project });
  const endpoint = `/api/branches?${params}`;
  const response = await fetch(endpoint);

  return response.json();
}

export async function getBuilds({
  host,
  project,
  branch,
}: BranchParams): Promise<Build[]> {
  const params = new URLSearchParams({ host, project, branch });
  const endpoint = `/api/builds?${params}`;
  const response = await fetch(endpoint);

  return response.json();
}

export async function getRuns({
  host,
  project,
  build,
  url,
}: RunsParams): Promise<Run[]> {
  const params = new URLSearchParams({
    host,
    project,
    build,
    url,
  });

  const endpoint = `/api/runs?${params}`;
  const response = await fetch(endpoint);

  return response.json();
}
