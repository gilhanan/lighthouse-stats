import {
  HostParams,
  Project,
  ProjectParams,
  Branch,
  RawBuild,
  Build,
  BranchParams,
  RawRun,
  Run,
  BuildParams,
  URL,
  RunsParams,
} from "../runs/models";

function lighthouseServer({ host }: HostParams): string {
  return `${host}/v1`;
}

function lighthouseServerProjects({ host }: HostParams): string {
  return `${lighthouseServer({ host })}/projects`;
}

function lighthouseServerProject({ host, project }: ProjectParams): string {
  return `${lighthouseServerProjects({ host })}/${project}`;
}

function lighthouseServerBranches({ host, project }: ProjectParams): string {
  return `${lighthouseServerProject({ host, project })}/branches`;
}

function lighthouseServerBuilds({
  host,
  project,
  branch,
}: BranchParams): string {
  const params = new URLSearchParams({ branch });
  return `${lighthouseServerProject({
    host,
    project,
  })}/builds?${params}`;
}

function lighthouseServerBuild({ host, project, build }: BuildParams): string {
  return `${lighthouseServerProject({
    host,
    project,
  })}/builds/${build}`;
}

function lighthouseServerRuns({
  host,
  project,
  build,
  url,
}: RunsParams): string {
  const params = new URLSearchParams({ url });
  return `${lighthouseServerBuild({ host, project, build })}/runs?${params}`;
}

function lighthouseServerURLs(params: BuildParams): string {
  return `${lighthouseServerBuild(params)}/urls`;
}

export async function getProjects(params: HostParams): Promise<Project[]> {
  const response = await fetch(lighthouseServerProjects(params));
  const projects = (await response.json()) as Project[];
  return projects;
}

export async function getBranches(params: ProjectParams): Promise<Branch[]> {
  const url = lighthouseServerBranches(params);
  const response = await fetch(url);
  const branches = (await response.json()) as Branch[];

  return branches;
}

export async function getBuilds(params: BranchParams): Promise<Build[]> {
  const url = lighthouseServerBuilds(params);
  const response = await fetch(url);
  const rawBuilds = (await response.json()) as RawBuild[];

  const builds = rawBuilds.map((rawBuild) => ({
    ...rawBuild,
    name: `${rawBuild.branch} - ${rawBuild.commitMessage}`,
  }));

  return builds;
}

export async function getURLs(params: BuildParams): Promise<URL[]> {
  const url = lighthouseServerURLs(params);
  const response = await fetch(url);
  const urls = (await response.json()) as URL[];

  return urls;
}

export async function getRuns(params: RunsParams): Promise<Run[]> {
  const url = lighthouseServerRuns(params);
  const response = await fetch(url);
  const rawRuns = (await response.json()) as RawRun[];

  const runs = rawRuns.map((rawRun) => ({
    ...rawRun,
    lhr: JSON.parse(rawRun.lhr),
  }));

  return runs;
}
