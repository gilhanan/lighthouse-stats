import { LHRParams, BuildParams } from "../models";

interface Props {
  lhrParams: LHRParams;
  loading: boolean;
  onChange: (lhrParams: LHRParams) => void;
  onCalculate: () => void;
}

export default function LHRForm({
  lhrParams: { audits },
  loading,
  onChange,
  onCalculate,
}: Props) {
  const extraAudits = audits.concat("");
  return (
    <div className="inline-flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Lighthouse report form</h2>
      <h3 className="font-semibold">Audits:</h3>
      <div className="flex flex-col gap-2">
        {extraAudits.map((audit, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              aria-label={`audit ${index}`}
              value={audit}
              className="w-full"
              onChange={({ target: { value } }) =>
                onChange({
                  audits: extraAudits
                    .map((audit, i) => (i === index ? value : audit))
                    .filter(Boolean),
                })
              }
            />
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                onChange({
                  audits: audits.filter((_, i) => i !== index),
                })
              }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onCalculate}
        disabled={loading}
      >
        Calculate
      </button>
    </div>
  );
}
