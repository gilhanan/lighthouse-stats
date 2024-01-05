import { useEffect, useState } from "react";
import { Build, BuildParams, Project } from "../models";
import { getBuilds, getProjects } from "../client";
import Select from "@/app/components/select";
import TextField from "@/app/components/text-field";

interface Props {
  buildParams: BuildParams;
  onChange: (buildParams: BuildParams) => void;
  onSubmit: () => void;
}

export default function BuildForm({ buildParams, onChange, onSubmit }: Props) {
  const { host, project, build } = buildParams;
  const [projects, setProjects] = useState<Project[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Build form</h2>
      <div className="flex flex-col gap-2">
        <TextField
          label="Host"
          value={host}
          onChange={(host) => onChange({ ...buildParams, host })}
        />
        <Select
          label="Project"
          selected={project}
          options={projects}
          idField="id"
          nameField="name"
          onChange={(project) => onChange({ ...buildParams, project })}
        />
        <Select
          label="Build"
          selected={build}
          options={builds}
          idField="id"
          nameField="name"
          onChange={(build) => onChange({ ...buildParams, build })}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}
