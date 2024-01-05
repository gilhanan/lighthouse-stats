import { useEffect, useId, useRef, useState } from "react";

interface Props {
  label: string;
  selected: string[];
  options: string[];
  onChange: (values: string[]) => void;
}

export default function MultiSelect({
  label,
  selected,
  onChange,
  options,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  function getOptions() {
    return options
      .filter((option) => !search || option.includes(search))
      .sort((a, b) => {
        if (selected.includes(a) && !selected.includes(b)) return -1;
        if (!selected.includes(a) && selected.includes(b)) return 1;

        return a.localeCompare(b);
      });
  }

  useEffect(() => {
    function callback(e: MouseEvent) {
      if (ref.current?.contains(e.target as Node)) return;
      setOpen(false);
    }

    addEventListener("click", callback);
    return () => removeEventListener("click", callback);
  }, [id]);

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      <label htmlFor={id}>{label}</label>
      <button
        type="button"
        className="flex justify-between w-full p-2 border border-gray-300 rounded-md"
        onClick={() => setOpen(!open)}
      >
        <span>{`${selected.length} selected`}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      <div className="relative">
        {open && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md">
            <input
              id={id}
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <div className="max-h-60 overflow-y-auto">
              {getOptions().map((option) => (
                <div
                  key={option}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100"
                  onClick={() => {
                    if (selected.includes(option)) {
                      onChange(selected.filter((value) => value !== option));
                    } else {
                      onChange(selected.concat(option));
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    readOnly
                  />
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
