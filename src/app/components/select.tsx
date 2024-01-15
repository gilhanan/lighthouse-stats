"use client";

import { useId } from "react";

interface Props<T> {
  className?: string;
  label: string;
  idField: keyof T;
  nameField: keyof T;
  selected?: T;
  options: T[];
  onChange: (value: T) => void;
}

export default function Select<T>({
  className,
  label,
  idField,
  nameField,
  selected,
  onChange,
  options,
}: Props<T>) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="block">
        {label}:
      </label>
      <select
        id={id}
        className="w-full rounded-md"
        value={selected?.[idField]?.toString()}
        onChange={({ target: { value } }) =>
          onChange(options.find((project) => project[idField] === value)!)
        }
      >
        {options.map((option) => {
          const id = option[idField]?.toString();
          return (
            <option key={id} value={id}>
              {option[nameField]?.toString()}
            </option>
          );
        })}
      </select>
    </div>
  );
}
