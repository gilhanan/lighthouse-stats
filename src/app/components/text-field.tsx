import { useId } from "react";

interface Props {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function TextField({ label, value, onChange }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}:</label>
      <input
        type="text"
        id={id}
        className="w-full"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </div>
  );
}
