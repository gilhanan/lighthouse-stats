import { Row } from "./models";
import { TableBody } from "./table-body";
import { TableHead } from "./table-head";

interface Props {
  title: string;
  rows: Row[];
}

export function Table({ title, rows }: Props) {
  return (
    <div className="inline-flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <table className="table-auto">
        <TableHead cells={rows[0].cells} />
        <TableBody rows={rows} />
      </table>
    </div>
  );
}
