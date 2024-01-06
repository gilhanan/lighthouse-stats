import { Category, RunsFormState } from "../models";
import Select from "@/app/components/select";

interface Props {
  form: RunsFormState;
  categories: Category[];
  onChange: (form: RunsFormState) => void;
  onCalculate: () => void;
}

export default function RunsForm({
  form,
  categories,
  onChange,
  onCalculate,
}: Props) {
  return (
    <div className="inline-flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Report form</h2>
      <Select
        label="Categories"
        selected={form.category}
        options={categories}
        onChange={(category) => onChange({ ...form, category })}
        idField="id"
        nameField="title"
      />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onCalculate}
      >
        Calculate
      </button>
    </div>
  );
}
