"use client";
import { useEffect, useState } from "react";
import {
  Build,
  BuildFormState,
  RunsFormState,
  Project,
  Run,
  Branch,
  URL,
  Category,
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
import { calculateRuns } from "./utils";
import { Row, Table } from "../components/table";

export default function Page() {
  const [buildForm, setBuildForm] = useState<BuildFormState>({});
  const [runsForm, setRunsForm] = useState<RunsFormState>({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [urls, setURLs] = useState<URL[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [runsRows, setRunsRows] = useState<Row[]>([]);

  const { host, project, url, branch, build } = buildForm;
  const { category } = runsForm;

  useEffect(() => {
    setRuns([]);
    setRunsRows([]);
  }, [host, project, url, branch, build]);

  useEffect(() => {
    async function loadProjects() {
      if (!host) return;

      setLoading(true);

      const projects = await getProjects({ host });

      setProjects(projects);
      setBuildForm((form) => ({ ...form, project: projects[0] }));

      setLoading(false);
    }

    loadProjects();
  }, [host]);

  useEffect(() => {
    async function loadBranches() {
      if (!host || !project) return;

      setLoading(true);

      const branches = await getBranches({ host, project: project.id });

      setBranches(branches);
      setBuildForm((form) => {
        const isBranchExists = branches.some(
          ({ branch }) => branch === form.branch?.branch
        );
        const baseBranch = branches.find(
          ({ branch }) => branch === project.baseBranch
        );
        const branch = isBranchExists ? form.branch : baseBranch || branches[0];
        return { ...form, branch };
      });

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
      setBuildForm((form) => ({ ...form, build: builds[0] }));

      setLoading(false);
    }

    loadBuilds();
  }, [host, project, branch]);

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
      setBuildForm((form) => {
        const isURLExists = urls.some(({ url }) => url === form.url?.url);
        const url = isURLExists ? form.url : urls[0];
        return { ...form, url };
      });

      setLoading(false);
    }

    loadURLs();
  }, [host, project, build]);

  useEffect(() => {
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

      const categories = Object.values(runs[0]?.lhr?.categories || {});

      setCategories(categories);
      setRunsForm((form) => {
        const isCategoryExists = categories.some(
          ({ id }) => id === form.category?.id
        );
        const category = isCategoryExists ? form.category : categories[0];
        return { ...form, category };
      });

      setLoading(false);
    }
    loadRuns();
  }, [host, project, build, url]);

  useEffect(() => {
    if (!category) return;
    setRunsRows(calculateRuns({ runs, category }));
  }, [runs, category]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Lighthouse statistics</h1>
      <div className="flex flex-wrap gap-12">
        <div className="flex flex-col gap-12 flex-auto">
          <BuildForm
            form={buildForm}
            projects={projects}
            urls={urls}
            branches={branches}
            builds={builds}
            onChange={setBuildForm}
          />
          {runs.length ? (
            <RunsForm
              form={runsForm}
              categories={categories}
              onChange={setRunsForm}
            />
          ) : null}
        </div>
        <div className="flex-auto">
          {runsRows.length ? <Table rows={runsRows} title={"Runs"} /> : null}
        </div>
      </div>
    </div>
  );
}
