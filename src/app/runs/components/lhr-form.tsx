import MultiSelect from "@/app/components/multi-select";
import { LHRParams } from "../models";

interface Props {
  lhrParams: LHRParams;
  audits: string[];
  loading: boolean;
  onChange: (lhrParams: LHRParams) => void;
  onCalculate: () => void;
}

export default function LHRForm({
  lhrParams,
  audits,
  loading,
  onChange,
  onCalculate,
}: Props) {
  return (
    <div className="inline-flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Report form</h2>
      <MultiSelect
        label="Audits"
        selected={lhrParams.audits}
        options={audits}
        onChange={(audits) => onChange({ audits })}
      />
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
