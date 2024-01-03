import { BuildParams } from "../models";

interface Props {
  build: BuildParams;
  loading: boolean;
  onChange: (build: BuildParams) => void;
  onSubmit: () => void;
}

export default function BuildForm({
  build: { host, project, buildId: id },
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="inline-flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Build form</h2>
      <div className="inline-grid grid-cols-[1fr_350px] items-center gap-2">
        <label htmlFor="host">Host:</label>
        <input
          id="host"
          value={host}
          onChange={({ target: { value } }) =>
            onChange({ host: value, project, buildId: id })
          }
        />

        <label htmlFor="project">Project:</label>
        <input
          id="project"
          value={project}
          onChange={({ target: { value } }) =>
            onChange({ host, project: value, buildId: id })
          }
        />

        <label htmlFor="build">Build:</label>
        <input
          id="build"
          value={id}
          onChange={({ target: { value } }) =>
            onChange({ host, project, buildId: value })
          }
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSubmit}
        disabled={loading}
      >
        Submit
      </button>
    </div>
  );
}
