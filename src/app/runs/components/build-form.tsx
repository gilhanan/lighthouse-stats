import { Branch, Build, BuildFormState, Project, URL } from "../models";
import Select from "@/app/components/select";
import TextField from "@/app/components/text-field";

interface Props {
  form: BuildFormState;
  builds: Build[];
  projects: Project[];
  branches: Branch[];
  urls: URL[];
  loading: boolean;
  onChange: (buildParams: BuildFormState) => void;
  onSubmit: () => void;
}

export default function BuildForm({
  form,
  builds,
  projects,
  branches,
  urls,
  loading,
  onChange,
  onSubmit,
}: Props) {
  const { host, project, url, branch, build } = form;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Build form</h2>
      <div className="flex flex-col gap-2">
        <TextField
          label="Host"
          value={host}
          onChange={(host) => onChange({ ...form, host })}
        />
        <Select
          label="Project"
          selected={project}
          options={projects}
          idField="id"
          nameField="name"
          onChange={(project) => onChange({ ...form, project })}
        />
        <Select
          label="Branch"
          selected={branch}
          options={branches}
          idField="branch"
          nameField="branch"
          onChange={(branch) => onChange({ ...form, branch })}
        />
        <Select
          label="Build"
          selected={build}
          options={builds}
          idField="id"
          nameField="name"
          onChange={(build) => onChange({ ...form, build })}
        />
        <Select
          label="URL"
          selected={url}
          options={urls}
          idField="url"
          nameField="url"
          onChange={(url) => onChange({ ...form, url })}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading || !host || !project || !build}
        onClick={onSubmit}
      >
        {loading ? "Downloading" : "Submit"}
      </button>
    </div>
  );
}
