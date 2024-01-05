export async function getProjects({ host }: { host: string }) {
  const params = new URLSearchParams({ host });
  const url = `/api/projects?${params}`;

  const response = await fetch(url);

  return response.json();
}

export async function getBuilds({
  host,
  project,
}: {
  host: string;
  project: string;
}) {
  const params = new URLSearchParams({ host, project });
  const url = `/api/builds?${params}`;

  const response = await fetch(url);

  return response.json();
}

export async function getRuns({
  host,
  project,
  build,
}: {
  host: string;
  project: string;
  build: string;
}) {
  const params = new URLSearchParams({
    host,
    project,
    build,
  });

  const url = `/api/runs?${params}`;

  const response = await fetch(url);

  return response.json();
}
