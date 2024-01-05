"use client";
import { useEffect, useState } from "react";
import BuildForm from "./components/build-form";
import {
  Build,
  BuildParams,
  LHRParams,
  Project,
  Run,
  Statistic,
} from "./models";
import LHRForm from "./components/lhr-form";
import Statistics from "./components/statistics";
import { getBuilds, getProjects, getRuns } from "./client";

export default function Page() {
  const [buildParams, setBuildParams] = useState<BuildParams>({
    host: "portal.lh.appsource.azure.com",
  });
  const [lhrParams, setLHRParams] = useState<LHRParams>({
    audits: [
      "page-load-time-response-start",
      "page-load-time-response-end",
      "page-load-time-assets-loaded",
      "page-load-time-app-rendered",
    ],
    categories: ["pageLoadTime"],
  });
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);

  const { host, project, build } = buildParams;

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
    const statistics = runs.map(
      ({
        id,
        lhr: {
          environment: { benchmarkIndex },
          audits,
        },
      }) => {
        return {
          id,
          benchmarkIndex,
          audits: lhrParams.audits.map((audit) => audits[audit]),
        };
      }
    );

    setStatistics(statistics);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Lighthouse statistics</h1>
      <div className="flex gap-12">
        <div className="flex flex-col gap-12">
          <BuildForm
            form={buildParams}
            projects={projects}
            builds={builds}
            loading={loading}
            onChange={setBuildParams}
            onSubmit={loadRuns}
          />
          {runs.length ? (
            <LHRForm
              lhrParams={lhrParams}
              audits={Object.keys(runs[0]?.lhr?.audits || {})}
              categories={Object.keys(runs[0]?.lhr?.categories || {})}
              onChange={setLHRParams}
              onCalculate={calculateRuns}
            />
          ) : null}
        </div>
        {statistics.length ? <Statistics statistics={statistics} /> : null}
      </div>
    </div>
  );
}
