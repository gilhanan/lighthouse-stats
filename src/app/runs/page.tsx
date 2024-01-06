"use client";
import { useEffect, useState } from "react";
import {
  Build,
  BuildFormState,
  RunsFormState,
  Project,
  Run,
  Row,
  Branch,
  URL,
} from "./models";
import {
  getBranches,
  getBuilds,
  getProjects,
  getRuns,
  getURLs,
} from "./client";
import BuildForm from "./components/build-form";
import RunsForm from "./components/runs-form";
import Table from "../components/table";
import { calculateRuns } from "./utils";

export default function Page() {
  const [buildForm, setBuildForm] = useState<BuildFormState>({
    host: "portal.lh.appsource.azure.com",
  });
  const [runsParams, setRunsParams] = useState<RunsFormState>({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [urls, setURLs] = useState<URL[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [runsRows, setRunsRows] = useState<Row[]>([]);

  const { host, project, url, branch, build } = buildForm;
  const { category } = runsParams;

  useEffect(() => {
    async function loadProjects() {
      if (!host) return;

      setLoading(true);

      const projects = await getProjects({ host });

      setProjects(projects);

      setLoading(false);
    }

    loadProjects();
  }, [host]);

  useEffect(() => {
    async function loadURLs() {
      if (!host || !project || !build) return;

      setLoading(true);

      const urls = await getURLs({
        host,
        project: project.id,
        build: build.id,
      });

      setURLs(urls);

      setLoading(false);
    }

    loadURLs();
  }, [host, project, build]);

  useEffect(() => {
    async function loadBranches() {
      if (!host || !project) return;

      setLoading(true);

      const branches = await getBranches({ host, project: project.id });

      setBranches(branches);

      setLoading(false);
    }

    loadBranches();
  }, [host, project]);

  useEffect(() => {
    async function loadBuilds() {
      if (!host || !project || !branch) return;

      setLoading(true);

      const builds = await getBuilds({
        host,
        project: project.id,
        branch: branch.branch,
      });

      setBuilds(builds);

      setLoading(false);
    }

    loadBuilds();
  }, [host, project, branch]);

  async function loadRuns() {
    if (!host || !project || !build || !url) return;

    setLoading(true);

    const runs = await getRuns({
      host,
      project: project.id,
      build: build.id,
      url: url.url,
    });

    setRuns(runs);

    setLoading(false);
  }

  function onRunsSubmit() {
    if (!category) return;
    setRunsRows(calculateRuns({ runs, category }));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Lighthouse statistics</h1>
      <div className="flex gap-12">
        <div className="flex flex-col gap-12">
          <BuildForm
            form={buildForm}
            projects={projects}
            urls={urls}
            branches={branches}
            builds={builds}
            loading={loading}
            onChange={setBuildForm}
            onSubmit={loadRuns}
          />
          {runs.length ? (
            <RunsForm
              form={runsParams}
              categories={Object.values(runs[0].lhr?.categories || {})}
              onChange={setRunsParams}
              onCalculate={onRunsSubmit}
            />
          ) : null}
        </div>
        {runsRows.length ? <Table rows={runsRows} title={"Runs"} /> : null}
      </div>
    </div>
  );
}
