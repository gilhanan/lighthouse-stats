"use client";
import { useState } from "react";
import BuildForm from "./components/build-form";
import { BuildParams, LHRParams, Run, Statistic } from "./models";
import LHRForm from "./components/lhr-form";
import Statistics from "./components/statistics";

export default function Page() {
  const [build, setBuild] = useState<BuildParams>({
    host: "portal.lh.appsource.azure.com",
    project: "2cbe9c48-7f26-4e44-8752-bc945bd6fcf8",
    buildId: "c410d154-41f8-43ee-b8d4-33536997f79a",
  });
  const [lhrParams, setLHRParams] = useState<LHRParams>({
    audits: [
      "page-load-time-response-start",
      "page-load-time-response-end",
      "page-load-time-assets-loaded",
      "page-load-time-app-rendered",
    ],
  });
  const [loading, setLoading] = useState(false);
  const [runs, setRuns] = useState<Run[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);

  async function getRuns() {
    setLoading(true);

    const { host, project, buildId } = build;
    const params = new URLSearchParams({ host, project, build: buildId });
    const url = `/runs/api?${params}`;

    const response = await fetch(url);

    const runs = await response.json();

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
        <div className="inline-flex flex-col gap-12">
          <BuildForm
            build={build}
            loading={loading}
            onChange={setBuild}
            onSubmit={getRuns}
          />
          {runs.length ? (
            <LHRForm
              lhrParams={lhrParams}
              loading={loading}
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