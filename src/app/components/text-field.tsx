import { useId } from "react";

interface Props {
  className?: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function TextField({
  className,
  label,
  value,
  onChange,
}: Props) {
  const id = useId();
  return (
    <div className={className}>
      <div className="flex flex-col">
        <label htmlFor={id}>{label}:</label>
        <input
          type="text"
          id={id}
          className="w-full rounded-md"
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
        />
      </div>
    </div>
  );
}
