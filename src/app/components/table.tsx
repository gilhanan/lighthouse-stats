import { Row } from "../runs/models";

interface Props {
  title: string;
  rows: Row[];
}

export default function Table({ title, rows }: Props) {
  return (
    <div className="inline-flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <table className="table-auto">
        <thead>
          <tr>
            {rows[0].cells.map(({ label }) => (
              <th key={label} className="px-4 py-2">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, cells }) => (
            <tr key={id}>
              {cells.map(({ value }) => (
                <td key="score" className="border px-4 py-2">
                  {value?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
