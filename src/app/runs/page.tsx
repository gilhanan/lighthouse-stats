"use client";
import { useEffect, useState } from "react";
import { Build, BuildParams, RunsParams, Project, Run, Row } from "./models";
import { getBuilds, getProjects, getRuns } from "./client";
import BuildForm from "./components/build-form";
import RunsForm from "./components/runs-form";
import Table from "../components/table";

export default function Page() {
  const [buildForm, setBuildForm] = useState<BuildParams>({
    host: "portal.lh.appsource.azure.com",
  });
  const [runsParams, setRunsParams] = useState<RunsParams>({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [runsRows, setRunsRows] = useState<Row[]>([]);

  const { host, project, build } = buildForm;
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
    async function loadBuilds() {
      if (!host || !project) return;

      setLoading(true);

      const builds = await getBuilds({ host, project: project.id });

      setBuilds(builds);

      setLoading(false);
    }

    loadBuilds();
  }, [host, project]);

  async function loadRuns() {
    if (!host || !project || !build) return;

    setLoading(true);

    const runs = await getRuns({ host, project: project.id, build: build.id });

    setRuns(runs);

    setLoading(false);
  }

  function calculateRuns() {
    const rows = runs.map(
      ({
        id,
        representative,
        lhr: {
          environment: { benchmarkIndex },
          audits,
          categories,
        },
      }) => {
        const currentCategory = category && categories[category.id];
        return {
          id,
          cells: [
            { label: "Representative", value: representative },
            { label: "Benchmark", value: benchmarkIndex },
            ...(currentCategory
              ? [
                  {
                    label: currentCategory.title,
                    value: currentCategory.score,
                  },
                  ...currentCategory.auditRefs
                    .filter(({ weight }) => weight)
                    .map(({ id }) => {
                      const audit = audits[id];
                      return {
                        label: audit.title.replace(" time is too slow", ""), // TODO: remove this hack
                        value: audit.score,
                      };
                    }),
                ]
              : []),
          ],
        } satisfies Row;
      }
    );

    setRunsRows(rows);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Lighthouse statistics</h1>
      <div className="flex gap-12">
        <div className="flex flex-col gap-12">
          <BuildForm
            form={buildForm}
            projects={projects}
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
              onCalculate={calculateRuns}
            />
          ) : null}
        </div>
        {runsRows.length ? <Table rows={runsRows} title={"Runs"} /> : null}
      </div>
    </div>
  );
}
